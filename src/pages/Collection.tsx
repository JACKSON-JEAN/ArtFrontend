import React from 'react'
import { useQuery } from '@apollo/client';
import img1 from "../images/art1.jpg";
import {HiOutlineShoppingBag} from "react-icons/hi2"
import {IoMdHeartEmpty} from "react-icons/io"
import { GET_ARTWORK } from '../graphql/artwork';
import { useSearch } from '../context/search.context';
import { Artwork } from '../types/artwork';

const Collection = () => {
  const ShoppingIcon = HiOutlineShoppingBag as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;
  const WishListIcon = IoMdHeartEmpty as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;
    const { query } = useSearch();
  

    const { loading, error, data } = useQuery(GET_ARTWORK, {
        variables: {
          searchInput: {
            keyword: query,
          },
        },
      });

      const artwork = data?.getArtwork || [];
  // const displayedArtwork = limit ? artwork.slice(0, limit) : artwork;
  
  return (
    <div className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-3 bg-slate-50`}>
      <div className=' flex items-center gap-10'>
        <p className=" text-2xl text-red-950 font-semibold pb-3">Original Paintings.</p>
        <form>
          <input type="text" 
          placeholder='Search for anything...'
          className=' border outline-blue-600 rounded-sm py-1 pl-2' />
        </form>
      </div>
      {error && <p className=' text-center'>{error.message}</p>}
      <div className=' w-full py-4'>
        <div className=" columns-2 sm:columns-3 md:columns-3">
          {
            artwork.map((item: Artwork) =>(
              <div key={item.id} className=' w-full break-inside-avoid mb-4 border shadow-sm rounded-sm overflow-hidden'>
                <img src={item?.media[0].url || img1} alt="" />
                <div className=' px-2 py-2'>
                <div className=' flex items-center justify-between'>
                   <p className=' font-semibold text-lg'>${item.price}</p>
                   <div className=' flex items-center gap-2'>
                    <p className=' text-xl cursor-pointer'><WishListIcon/></p>
                    <p className=' text-xl cursor-pointer'><ShoppingIcon/></p>
                   </div>
                 </div>
                 <p className=' text-lg'>{item.title}</p>
                 {item.widthCm && <p className=' text-gray-600'>{item.widthCm} X {item.heightCm} Cm</p>}
                </div>
              </div>
            ))
          }
          {loading && <p>Loading...</p>}
        </div>
        
      </div>
      {/* <Products subTitle='Our Collection' /> */}
    </div>
  )
}

export default Collection