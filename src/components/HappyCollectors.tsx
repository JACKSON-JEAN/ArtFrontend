import React from "react";

const HappyCollectors = () => {
  return (
    <div className=" mb-10 border-t border-b p-4 bg-slate-100">
      <p className=" text-2xl text-red-950 font-semibold text-center pb-6">
        Reviews from our happy collectors
      </p>
      <div className=" grid sm:grid-cols-2 gap-4 sm:gap-10">
        <div className=" max-w-80 mx-auto">
          <p className=" italic text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            illo maxime deleniti iusto facilis provident sit ipsum facere natus
            amet rerum quisquam commodi reprehenderit tenetur animi, dolores
            eaque labore. Adipisci.
          </p>
          <p className=" font-semibold">John Doe</p>
        </div>
        <div className=" max-w-80 mx-auto">
          <p className=" italic text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            illo maxime deleniti iusto facilis provident sit ipsum facere natus
            amet rerum quisquam commodi reprehenderit tenetur animi, dolores
            eaque labore. Adipisci.
          </p>
          <p className=" font-semibold">John Doe</p>
        </div>
        
      </div>
    </div>
  );
};

export default HappyCollectors;
