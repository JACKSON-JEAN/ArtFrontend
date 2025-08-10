
const Contact = () => {
  return (
    <div className={`${"wrapper"} w-full flex flex-col md:flex-row md:gap-3 px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}>
      <section className=" flex-1">
        <p className=" text-lg text-red-950 font-semibold">
          We'd Love to hear from you.
        </p>
        <p className=" font-light mb-2">
          Questions, collaborations, or just want to chat about African Art?
          Reach out, we're here to connect.
        </p>
        <div className=" ">
          <div>
            <p>
              Email: <span className=" font-light">info@zubart.com</span>{" "}
            </p>
            <p>
              Support: <span className=" font-light">+256 776 286 453</span>
            </p>
          </div>
        </div>
        {/* <div>
            <img src={image} alt="" />
        </div> */}
      </section>
      <section className=" flex-1">
        <p className=" mb-2 font-light">Or, send us a message directly.</p>
        <form className=" bg-white py-2 px-3 border" action="">
          <div className=" flex gap-3">
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="text"
                placeholder="FirstName..."
              />
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="text"
                placeholder="LastName..."
              />
            </div>
          </div>
          <div className=" flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="text"
              placeholder="Email..."
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
            ></textarea>
          </div>
          <button className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
