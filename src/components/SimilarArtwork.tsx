import { useSearch } from "../context/search.context";
import { GET_ARTWORK } from "../graphql/artwork";
import { useQuery } from "@apollo/client";
import { Artwork } from "../types/artwork";
import img1 from "../images/art1.jpg";
import ProductItem from "./ProductItem";
import { useCart } from "../context/cart.context";

const SimilarArtwork = () => {
  const { query } = useSearch();
  const { loading, error, data, refetch } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
        limit: 100,
      },
    },
  });

  const isOffline = !navigator.onLine;

  const { cart } = useCart();
  const artwork = data?.getArtwork?.artworks || [];
  const artworkLimit = artwork
  .filter((item: Artwork) => item.isAvailable !== false)
  .filter((item: Artwork) => !cart.some((cartItem) => cartItem.artworkId === item.id))
  .slice(0, 8);


  return (
    <div>
      <h2 className=" text-xl text-red-950 font-semibold mb-1">
        Artwork you may like
      </h2>
      {!isOffline && error && (
        <div className="text-center py-10 text-red-600">
          {error.networkError ? (
            <>
              <p className="font-medium">Network error</p>
              <p className="text-sm mt-1">
                Please check your internet connection.
              </p>

              <button
                onClick={() => !isOffline && refetch()}
                disabled={loading || isOffline}
                className="mt-3 text-blue-500 underline disabled:opacity-50"
              >
                Retry
              </button>
            </>
          ) : (
            <p className="text-sm">{error.message}</p>
          )}
        </div>
      )}
      {isOffline && (
        <p className="text-center text-gray-500">
          You’re offline. Please reconnect to the internet.
        </p>
      )}
      {loading && !error && !isOffline && (
        <p className="text-center text-slate-400">Loading artworks…</p>
      )}
      {!loading && !error && artworkLimit.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No similar available at the moment.
        </p>
      )}
      <div className=" columns-2 sm:columns-3 md:columns-4 [column-fill:balance]">
        {artworkLimit.map((item: Artwork) => (
          <ProductItem
            id={item.id}
            key={item.id}
            media={item.media || img1}
            title={item.title}
            description={item.description}
            imageHash={item.imageHash}
            category={item.category}
            material={item.material}
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
