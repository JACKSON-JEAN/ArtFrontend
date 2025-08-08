import React from "react";

const Subscribe = () => {
  return (
    <div className=" mb-2 mt-2 text-center">
      <div className=" flex justify-center mb-2">
        <p className=" font-semibold text-xl text-red-950 max-w-80">
          Subscribe to our newsletter for regular updates.
        </p>
      </div>

      <form className=" border shadow-sm inline-block bg-white p-1 overflow-hidden rounded-full whitespace-nowrap">
        <input
          type="text"
          placeholder="Email address"
          className=" pl-2 outline-none"
        />
        <button className=" bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md text-white rounded-full px-1.5 py-[2.5px]">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
