import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useMutation } from "@apollo/client";
import { ADD_SUBSCRIBER_MUTATION } from "../graphql/subscriber";

const Subscribe = () => {
  const [userEmail, setUserEmail] = useState("")
  const {success, error: toastError} = useToast()

  const [addSubscriber, {loading}] = useMutation(ADD_SUBSCRIBER_MUTATION, {
    onCompleted: () =>{
      success("Subscribed successfully.")
      setUserEmail("")
    },
    onError: (error) =>{
      const message = error.message.includes("Email already exists")
      ? "Email already exists!"
      : "Something went wrong, please try again!"

      toastError(message)
    }
  })

  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if(!userEmail.trim()){
      toastError("Please fill in your email!")
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      toastError("Invalid email address!");
      return;
    }
    addSubscriber({
      variables: {
        addSubscriberInput: {
          email: userEmail.trimEnd()
        } 
      }
    })
    
  }
  
  return (
    <div className=" mb-2 mt-2 text-center">
      <div className=" flex justify-center mb-2">
        <p className=" font-semibold text-xl text-red-950 max-w-80">
          Subscribe to our newsletter for regular updates.
        </p>
      </div>

      <form onSubmit={submitHandler} className=" border shadow-sm inline-block bg-white p-1 overflow-hidden rounded-full whitespace-nowrap">
        <input
          type="text"
          placeholder="Email address"
          className=" pl-2 outline-none"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button className=" bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md text-white rounded-full px-1.5 py-[2.5px]">
          {loading? "Adding..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
