import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { getUserId } from "../utils/decodeToken";
import {
  GET_CLIENT_CART,
  ADD_CART_ITEM,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  DELETE_ITEM,
} from "../graphql/cart";

/* ================= TYPES ================= */

export type CartItem = {
  id: number;
  image: string;
  imageHash?: string;
  title: string;
  description: string;
  category: string;
  material?: string;
  heightCm?: number;
  widthCm?: number;
  artworkId: number;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setUserId: (id: number | null) => void;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "zubart_cart_key";

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const client = useApolloClient();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const hasMergedRef = useRef(false);

  /* 🔑 SYNC USER ID FROM TOKEN (ON APP LOAD) */
  useEffect(() => {
    const id = getUserId();
    setUserId(id ? Number(id) : null);
  }, []);

  useEffect(() => {
  if (!userId) {
    hasMergedRef.current = false;
  }
}, [userId]);


  /* ================= FETCH BACKEND CART ================= */

  const { data, refetch } = useQuery(GET_CLIENT_CART, {
    variables: { clientId: userId },
    skip: !userId,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
  if (userId) {
    refetch({ clientId: userId });
  }
}, [userId, refetch]);


  /* ================= APPLY BACKEND CART TO STATE ================= */

  useEffect(() => {
    if (!data?.getClientCart?.items) return;

    const serverCart: CartItem[] = data.getClientCart.items.map((item: any) => ({
      id: item.id,
      image: item.artwork.media[0]?.url,
      imageHash: item.imageHash,
      title: item.artwork.title,
      description: item.artwork.description,
      category: item.artwork.category,
      material: item.artwork.material,
      heightCm: item.artwork.heightCm,
      widthCm: item.artwork.widthCm,
      artworkId: item.artwork.id,
      price: item.price,
      quantity: item.quantity,
    }));

    setCart(serverCart);
  }, [data]);

  /* ================= LOAD GUEST CART ================= */

  useEffect(() => {
    if (userId) return;

    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return;

    try {
      setCart(JSON.parse(stored));
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [userId]);

  /* ================= SAVE GUEST CART ================= */

  useEffect(() => {
    if (!userId) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, userId]);

  /* ================= MUTATIONS ================= */

const [addCartItem] = useMutation(ADD_CART_ITEM, {
  refetchQueries: [GET_CLIENT_CART],
});

const [incrementItem] = useMutation(INCREMENT_ITEM, {
  refetchQueries: [GET_CLIENT_CART],
});

const [decrementItem] = useMutation(DECREMENT_ITEM, {
  refetchQueries: [GET_CLIENT_CART],
});

const [deleteItem] = useMutation(DELETE_ITEM, {
  refetchQueries: [GET_CLIENT_CART],
});

  /* ================= MERGE GUEST CART ON LOGIN ================= */

  useEffect(() => {
    if (!userId || hasMergedRef.current) return;

    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return;

    hasMergedRef.current = true;
    const guestCart: CartItem[] = JSON.parse(stored);

    (async () => {
      const { data } = await client.query({
        query: GET_CLIENT_CART,
        variables: { clientId: userId },
        fetchPolicy: "network-only",
      });

      const serverItems = data?.getClientCart?.items ?? [];

      for (const guestItem of guestCart) {
        const exists = serverItems.some(
          (s: any) => s.artwork.id === guestItem.artworkId
        );

        if (!exists) {
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
      }

      localStorage.removeItem(CART_STORAGE_KEY);
      await client.refetchQueries({ include: [GET_CLIENT_CART] });
    })();
  }, [userId, client, addCartItem]);

  /* ================= ACTIONS ================= */

  const addToCart = async (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    if (userId) {
      await addCartItem({
        variables: {
          addItemInput: {
            artworkId: item.artworkId,
            quantity: item.quantity || 1,
            price: item.price,
          },
          clientId: userId,
        },
      });
      return;
    }

    setCart((prev) => {
      const existing = prev.find((p) => p.artworkId === item.artworkId);
      return existing
        ? prev.map((p) =>
            p.artworkId === item.artworkId
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        : [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const increaseQuantity = async (id: number) => {
    if (userId) return incrementItem({ variables: { itemId: id, clientId: userId } });
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decreaseQuantity = async (id: number) => {
    if (userId) return decrementItem({ variables: { itemId: id, clientId: userId } });
    setCart((prev) =>
      prev.filter((i) => (i.id === id ? i.quantity - 1 : i.quantity) > 0)
    );
  };

  const removeFromCart = async (id: number) => {
    if (userId) return deleteItem({ variables: { itemId: id, clientId: userId } });
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (!userId) localStorage.removeItem(CART_STORAGE_KEY);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setUserId,
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

/* ================= HOOK ================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
