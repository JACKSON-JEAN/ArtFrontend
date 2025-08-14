import { useSearch } from "../context/search.context";
import { GET_ARTWORK } from "../graphql/artwork";
import { useQuery } from "@apollo/client";
import { Artwork } from "../types/artwork";
import img1 from "../images/art1.jpg";
import ProductItem from "./ProductItem";
import { useCart } from "../context/cart.context";

const SimilarArtwork = () => {

  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });

  const { cart } = useCart();
  const artwork = data?.getArtwork || [];
  const availableArtwork = artwork.filter((item: Artwork) => item.isAvailable !== false)
  const unselectedArtwork = availableArtwork.filter((item: Artwork) => !cart.some(cartItem => cartItem.artworkId === item.id));
  const artworkLimit = unselectedArtwork.slice(0, 8)
  console.log(artwork);

  return (
    <div>
      <p className=" text-xl text-red-950 font-semibold mb-1">Artwork you may like</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <div className=" w-full pb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artworkLimit.map((item: Artwork) => (
        <ProductItem
          id={item.id}
          key={item.id}
          media={item.media || img1}
          title={item.title}
          category={item.category}
          widthCm={item.widthCm}
          heightCm={item.heightCm}
          isFeatured={item.isFeatured}
          isAvailable={item.isAvailable}
          artworkId={item.id}
          price={item.price}
          showButton={true}
        />
      ))}
      </div>
      
    </div>
  );
};

export default SimilarArtwork;
