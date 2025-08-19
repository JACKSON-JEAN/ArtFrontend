import React from "react";
import { Link } from "react-router-dom";

interface AddRatingProps{
    itemId: number
}

const AddRating: React.FC<AddRatingProps> = ({itemId}) => {
  return (
    <div className=" w-36 absolute left-0 top-4 bg-white border shadow-sm px-2 py-1">
      <p className=" text-base text-blue-600 hover:underline cursor-pointer">
        Add Ratings
      </p>
      <Link to="/reviews" className=" text-base text-blue-600 hover:underline cursor-pointer">
        View Ratings
      </Link>
    </div>
  );
};

export default AddRating;
