const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
      <h1 className="md:text-4xl text-2xl font-semibold">
        Join the Apex Circle
      </h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Be the first to access exclusive vehicles, private listings, and premium
        experiences.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          required
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter Your Email"
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
