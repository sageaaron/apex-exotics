import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 pt-10 bg-linear-to-r from-[#6ee2f5] to-primary max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">
      <div className="text-white">
        <h2 className="text-3x1 font-medium">Own An Exotic?</h2>
        <p className="mt-2">
          Rent or list it with Apex Exotics. Join a curated platform where
          luxury meets opportunity.
        </p>
        <p className="max-w-130">
          We take care of bookings, payments, and driver verification, so you
          can enjoy a seamless luxury experience.
        </p>
        <button className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer">
          List Your Exotic
        </button>
      </div>

      <img
        src={assets.banner_car_image}
        alt="Car Banner"
        className="max-h-45 pb-2"
      />
    </div>
  );
};

export default Banner;
