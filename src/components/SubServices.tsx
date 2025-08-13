import React from 'react'
import { BsPatchCheck } from "react-icons/bs";
import {FaRegThumbsUp} from "react-icons/fa"
import {LuHandHelping} from "react-icons/lu"

const SubServices = () => {
    const PeaceIcon = FaRegThumbsUp as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >;
      const OriginalIcon = BsPatchCheck as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >;
      const SupportIcon = LuHandHelping as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >;
  return (
    <div className=" w-full rounded-sm mb-10">
      <p className=" text-2xl text-red-950 font-semibold pb-3">Why Buy From Pearl Art Galleries?</p>
      <div className=' w-full grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 justify-between'>
        <div className=' flex-1 border shadow-sm rounded-sm px-3 py-2'>
          <div className=' flex items-center gap-1'>
            <p className=' text-2xl'><PeaceIcon/></p>
            <p className=" text-xl font-semibold mb-1">Peace of Mind.</p>
          </div>
          <p>Guaranteed ship via DHL within 72 hours of payment confirmation.</p>
          <p>Free returns within 14 days of delivery.</p>
          <p>Secure checkout.</p>
        </div>
        <div className=' flex-1 border shadow-sm rounded-sm px-3 py-2'>
          <div className=' flex gap-1'>
            <p className=' text-2xl'><OriginalIcon/></p>
            <p className=" text-xl font-semibold mb-1">Own a True Original.</p>
          </div>
          <p>Our collection contains art hand-picked by our curators, signed by the artist, for you.
          </p>
        </div>
        <div className=' flex-1 border shadow-sm rounded-sm px-3 py-2'>
          <div className=' flex gap-1'>
            <p className=' text-2xl'><SupportIcon/></p>
            <p className=" text-xl font-semibold mb-1">Empowering Ugandan Artists.</p>
          </div>
          <p>Support indigenous Ugandan artists by buying unique, vibrant, original art.
          </p>
        </div>
      </div>
      </div>
  )
}

export default SubServices