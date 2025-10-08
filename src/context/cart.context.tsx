import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useApolloClient, useMutation, useLazyQuery } from "@apollo/client";
import { getUserId } from "../utils/decodeToken";
import {
  GET_CLIENT_CART,
  ADD_CART_ITEM,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  DELETE_ITEM
} from "../graphql/cart";

export type CartItem = {
  id: number;
  image: string;
  title: string;
  category: string;
  material?: string;
  heightCm?: number;
  widthCm?: number;
  artworkId: number
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "zubart_cart_key";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const userId = getUserId();
  const client = useApolloClient();

  // Queries
  const [fetchCart] = useLazyQuery(GET_CLIENT_CART, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.getClientCart?.items) {
        const serverCart: CartItem[] = data.getClientCart.items.map((item: any) => ({
          id: item.id,
          image: item.artwork.media[0]?.url,
          title: item.artwork.title,
          category: item.artwork.category,
          material: item.artwork.material,
          heightCm: item.artwork.heightCm,
          widthCm: item.artwork.widthCm,
          artworkId: item.artwork.id,
          price: item.price,
          quantity: item.quantity,
        }));
        setCart(serverCart);
      }
    },
  });

  
  // Mutations
  const [addCartItem] = useMutation(ADD_CART_ITEM, {
    onCompleted: () => fetchCart({ variables: { clientId: userId } }),
  });
  const [incrementItem] = useMutation(INCREMENT_ITEM, {
    onCompleted: () => fetchCart({ variables: { clientId: userId } }),
  });
  const [decrementItem] = useMutation(DECREMENT_ITEM, {
    onCompleted: () => fetchCart({ variables: { clientId: userId } }),
  });
  const [deleteItem] = useMutation(DELETE_ITEM, {
    onCompleted: () => fetchCart({ variables: { clientId: userId } }),
  });

  // Load from backend or localStorage
  useEffect(() => {
    if (userId) {
      fetchCart({ variables: { clientId: userId } });
    } else {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
        }
      }
    }
  }, [userId, fetchCart]);

  // Keep localStorage for guests
  useEffect(() => {
    if (!userId) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, userId]);

  // Smart merge on login
  useEffect(() => {
  if (!userId) return;

  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return;

  try {
    const guestCart: CartItem[] = JSON.parse(stored);

    client
      .query({
        query: GET_CLIENT_CART,
        variables: { clientId: userId },
        fetchPolicy: "network-only",
      })
      .then(async ({ data }) => {
        const serverItems = data?.getClientCart?.cartItems || [];

        for (const guestItem of guestCart) {
          // Check if the artwork is already in the server cart
          const alreadyInCart = serverItems.some(
            (srv: any) => srv.artwork.id === guestItem.artworkId
          );

          if (!alreadyInCart) {
            // Only add items that are not already in the cart
            await addCartItem({
              variables: {
                addItemInput: {
                  artworkId: guestItem.artworkId,
                  quantity: guestItem.quantity,
                  price: guestItem.price,
                },
                clientId: userId,
              },
            });
          }
          // If it exists, skip it
        }

        localStorage.removeItem(CART_STORAGE_KEY);
        fetchCart({ variables: { clientId: userId } });
      })
      .catch((err) => console.error("Failed to merge guest cart", err));
  } catch (error) {
    console.error("Failed to parse guest cart", error);
  }
}, [userId, addCartItem, client, fetchCart]);


  // Cart actions
  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    if (userId) {
      addCartItem({
        variables: {
          addItemInput: {
            artworkId: item.artworkId,
            quantity: item.quantity || 1,
            price: item.price,
          },
          clientId: userId,
        },
        refetchQueries: [
            {query: GET_CLIENT_CART, variables: {clientId: userId}}
        ]
      });
    }
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    if (userId) {
      incrementItem({ 
        variables: { itemId: id, clientId: userId },
        refetchQueries: [
            {query: GET_CLIENT_CART, variables: {clientId: userId}}
        ]
     });
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    if (userId) {
      decrementItem({ 
        variables: { itemId: id, clientId: userId },
        refetchQueries: [
            {query: GET_CLIENT_CART, variables: {clientId: userId}}
        ]
    });
    }
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    if (userId) {
      deleteItem({ 
        variables: { itemId: id, clientId: userId,
            refetchQueries: [
                {query: GET_CLIENT_CART, variables: {clientId: userId}}
            ]
         } });
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (!userId) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    // Optional: backend mutation to clear for registered users
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
