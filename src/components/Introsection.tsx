import React from "react";
import { PiPackageLight } from "react-icons/pi";
import { CiWallet, CiHeadphones } from "react-icons/ci";
import img4 from "../images/img4.jpeg"
import img3 from "../images/img3.jpeg"
import img2 from "../images/img2.jpeg"
import img1 from "../images/img1.jpeg"

const Introsection = () => {
  const PackageIcon = PiPackageLight as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const PaymentIcon = CiWallet as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const SupportIcon = CiHeadphones as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  return (
    <div className=" w-full bg-white border mb-4">
      <div className=" w-full px-3 py-2 rounded-sm flex justify-betweenpx-3 justify-between">
        <div className=" flex gap-2 items-center relative">
          <div className=" w-6 h-6 rounded-full bottom-0 left-2 bg-amber-100 absolute"></div>
          <div className=" z-10">
            <p className=" text-3xl text-red-950">
              <PackageIcon />
            </p>
          </div>
          <div>
            <p className=" text-red-950 font-semibold leading-tight">
              Free shipping
            </p>
            <p className=" font-light leading-tight">
              Free shipping for order above $500
            </p>
          </div>
        </div>
        <div className=" flex gap-2 items-center relative">
          <div className=" w-6 h-6 rounded-full bottom-0 left-2 bg-amber-100 absolute"></div>
          <div className=" z-10">
            <p className=" text-3xl text-red-950">
              <PaymentIcon />
            </p>
          </div>
          <div>
            <p className=" text-red-950 font-semibold leading-tight">
              Flexible payment
            </p>
            <p className=" font-light leading-tight">
              Multiple secure payment options
            </p>
          </div>
        </div>
        <div className=" flex gap-2 items-center relative">
          <div className=" w-6 h-6 rounded-full bottom-0 left-2 bg-amber-100 absolute"></div>
          <div className=" z-10">
            <p className=" text-3xl text-red-950">
              <SupportIcon />
            </p>
          </div>
          <div>
            <p className=" text-red-950 font-semibold leading-tight">
              24/7 support
            </p>
            <p className=" font-light leading-tight">
              We support online all days.
            </p>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-3 pb-3">
        <div className=" flex-1 h-44 rounded-sm overflow-hidden relative">
           <img className=" w-full min-h-full" src={img3} alt="" />
           <div className=" absolute !z-30 bg-amber-100">
            <p className="">Carving</p>
           </div>
        </div>
        <div className=" flex-1 h-44 rounded-sm overflow-hidden">
           <img className=" w-full min-h-full" src={img2} alt="" />
           <p>Painting</p>
        </div>
        <div className=" flex-1 h-44 rounded-sm overflow-hidden">
           <img className=" w-full min-h-full" src={img1} alt="" />
        </div>
        <div className=" flex-1 h-44 rounded-sm overflow-hidden">
           <img className=" w-full min-h-full" src={img3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Introsection;
