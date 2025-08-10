import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ARTWORK } from "../graphql/artwork";
import { useSearch } from "../context/search.context";
import { Artwork } from "../types/artwork";

type ProductsProps = {
  limit?: number;
  subTitle?: string;
  categoryFilter?: string;
  onFilter?: (category: string) => void;
};

const ArtworkManagement: React.FC<ProductsProps> = ({
  limit,
  categoryFilter
}) => {
  // const [categoryFilter, setCategoryFilter] = useState<string>("");

  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });
  const artwork = data?.getArtwork || [];
  const displayedArtwork = limit ? artwork.slice(0, limit) : artwork;

  const filteredCategory = displayedArtwork.filter((item: Artwork) => {
    if (categoryFilter === "") {
      return displayedArtwork;
    }

    return item.category?.toUpperCase() === categoryFilter?.toUpperCase();
  });


  if (loading) return <p>Loading</p>;
  if (error)
    return <p>There was an error when fetching data. {error.message}</p>;
  return (
    <div
      className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}
    >
      <h1>Artwork</h1>
      {/* <div className=" w-full pb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategory.map((item: Artwork) => (
          <ProductItem
            id={item.id}
            key={item.id}
            image={img1}
            title={item.title}
            widthCm={item.widthCm}
            heightCm={item.heightCm}
            isFeatured={item.isFeatured}
            artworkId={item.id}
            price={item.price}
            showButton={true}
          />
        ))}
      </div> */}
      <table>
        <tbody>
          {filteredCategory.map((item: Artwork) => (
            <tr className=" border">
              <td className=" border px-1.5">{item.title}</td>
              <td className=" border px-1.5">{item.description}</td>
              <td className=" border px-1.5">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtworkManagement;
