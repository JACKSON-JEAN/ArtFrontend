import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../graphql/messages";
import { Helmet } from "@dr.pogodin/react-helmet";

const Contact = () => {
  const { success, error: toastError } = useToast();
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      success("Message sent successfully.");
      setUserInput({
        fullName: "",
        email: "",
        message: "",
      });
    },
    onError: (error) => {
      const message = error.message.includes("Invalid email")
        ? "Invalid email format"
        : "Something went wrong, please try again!";
      toastError(message);
    },
  });

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const emailValidator = /\S+@\S+\.\S+/;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !userInput.fullName.trim() ||
      !userInput.email.trim() ||
      !userInput.message.trim()
    ) {
      toastError("Please fill all the fields!");
      return;
    }
    if (!emailValidator.test(userInput.email)) {
      toastError("Invalid email address!");
      return;
    }
    sendMessage({
      variables: {
        messageInput: {
          fullName: userInput.fullName,
          email: userInput.email,
          message: userInput.message,
        },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Pearl Art Galleries</title>
        <meta
          name="description"
          content="Have a question or collaboration idea? Contact Pearl Art Galleries for inquiries, partnerships, or support."
        />
        <link
          rel="canonical"
          href="https://www.pearlartgalleries.com/contact"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Pearl Art Galleries" />
        <meta
          property="og:description"
          content="Reach out to Pearl Art Galleries — we’d love to hear from you."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />
        <meta
          property="og:url"
          content="https://www.pearlartgalleries.com/contact"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Pearl Art Galleries" />
        <meta
          name="twitter:description"
          content="Have a question or collaboration idea? Contact Pearl Art Galleries."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />

        <meta
          name="keywords"
          content="contact pearl art galleries, african art, art inquiries, pearl art galleries support"
        />
      </Helmet>

      <div
        className={`${"wrapper"} w-full block md:flex flex-col md:flex-row md:gap-3 px-10 sm:px-16 min-h-screen py-4 bg-slate-100`}
      >
        <section className=" flex-1 mb-4 md:mb-0">
          <h1 className=" text-xl text-red-950 font-semibold">
            We'd Love to hear from you.
          </h1>
          <p className=" font-light mb-2">
            Questions, collaborations, or just want to chat about African Art?
            Reach out, we're here to connect.
          </p>
          <div className=" ">
            <div>
              <p>
                Email:{" "}
                <span className=" font-light">
                  pearlartgalleries@gmail.com
                </span>{" "}
              </p>
              <p>
                Call us: <span className=" font-light">+256 776 286 453</span>
              </p>
            </div>
          </div>
        </section>
        <section className=" flex-1">
          <p className=" mb-2 font-light">Or, send us a message directly.</p>
          <form
            onSubmit={submitHandler}
            className=" bg-white py-2 px-3 border"
            action=""
          >
            <div className=" flex flex-col mb-3">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="text"
                placeholder="Full Name..."
                value={userInput.fullName}
                onChange={(e) => changeHandler("fullName", e.target.value)}
              />
            </div>
            <div className=" flex flex-col mb-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="text"
                placeholder="Email..."
                value={userInput.email}
                onChange={(e) => changeHandler("email", e.target.value)}
              />
            </div>
            <div className=" flex flex-col mb-3">
              <label htmlFor="message">Message</label>
              <textarea
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                rows={3}
                name="message"
                id="message"
                placeholder="Message..."
                value={userInput.message}
                onChange={(e) => changeHandler("message", e.target.value)}
              ></textarea>
            </div>
            <button className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-sm shadow-sm hover:shadow-md">
              {loading ? "Sending message..." : "Send message"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Contact;
