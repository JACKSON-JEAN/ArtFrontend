import React from 'react'
import { PiPackageLight } from "react-icons/pi";
import { CiWallet, CiHeadphones } from "react-icons/ci";

const SubServices = () => {
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
    <div className=" w-full rounded-sm hidden sm:flex justify-betweenpx-3 justify-between mb-4">
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
  )
}

export default SubServices