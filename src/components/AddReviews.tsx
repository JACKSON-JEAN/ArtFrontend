import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getUserId, getUsername } from "../utils/decodeToken";
import { useMutation } from "@apollo/client";
import { ADD_REVIEWS_MUTATION } from "../graphql/reviews";
import { useToast } from "../context/ToastContext";

interface AddReviewsProps {
  artId: number;
  onClose: () => void;
}

const AddReviews: React.FC<AddReviewsProps> = ({ artId, onClose }) => {
  const RatingIcon = FaStar as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const clientId = getUserId()

  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const {success} = useToast()

  const [addReviews, { loading }] = useMutation(ADD_REVIEWS_MUTATION, {
    onCompleted: (data) => {
      setError({
        isError: false,
        errorMessage: "",
      });
      setRating(0);
      setHover(0);
      setName("");
      setComment("");
      success("Review added successfully!")
    },
    onError: (error) => {
      const message = error.message.includes("required")
        ? "Please fill both rating and name"
        : "Something went wrong, please try again!";
      setError({
        isError: true,
        errorMessage: message,
      });
    },
  });

  useEffect(() => {
    const clientName = getUsername();
    if (clientName) {
      setName(clientName);
    }
  }, []); // <-- runs only once when component mounts

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || !name.trim()) {
        setError({
            isError: true,
            errorMessage: "Both rating and name are required!",
          });
          return;
    }

    addReviews({
        variables: {
            addReviewsInput: {
                rating,
                comment,
                artworkId: Number(artId),
                clientName: name || undefined,
                customerId: Number(clientId) || undefined
            }
        }
    })

    // Reset form
    setRating(0);
    setHover(0);
    setName("");
    setComment("");
    onClose()
  };

  return (
    <div className="w-full">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-10 z-10 ease-in-out duration-700"
      ></div>

      {/* Review Form */}
      <div className="fixed left-0 top-28 z-20 w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white rounded-sm px-4 py-4 shadow-lg relative"
        >
          <p
            onClick={onClose}
            className=" absolute right-5 top-4 text-base cursor-pointer"
          >
            X
          </p>
          <p className="text-lg text-red-950 font-semibold text-center mb-4">
            Rate this Product
          </p>

          {/* Rating Section */}
          <div className="flex mb-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <label key={starValue}>
                  <input
                    type="radio"
                    name="rating"
                    value={starValue}
                    onClick={() => setRating(starValue)}
                    className="hidden"
                  />
                  <RatingIcon
                    className={`cursor-pointer transition-colors duration-200 ${
                      starValue <= (hover || rating)
                        ? "text-orange-500"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>

          {/* Name Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
            />
          </div>

          {/* Comment Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="review">Comment:</label>
            <textarea
              id="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
              rows={4}
            ></textarea>
          </div>

          {error.isError && (
            <p className=" text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {error.errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
