import React from "react";
import { Link } from "react-router-dom";

interface AddRatingProps{
    itemId: number
}

const AddRating: React.FC<AddRatingProps> = ({itemId}) => {
  return (
    <div className=" w-36 absolute left-0 top-4 bg-white rounded-sm border shadow-sm">
      <p className=" w-full text-base text-blue-600 hover:underline cursor-pointer !py-1 px-2">
        <Link to="/reviews">Reviews</Link>
        
      </p>
      <p className=" text-base text-blue-600 hover:underline cursor-pointer py-1 px-2 border-t">
        Add Reviews
      </p>
    </div>
  );
};

export default AddRating;
