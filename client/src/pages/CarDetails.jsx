import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="Arrow Icon"
          className="rotate-180 backdrop-opacity-65"
        />
        Back To The Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <div className="lg:col-span-2">
          <div>
            <img
              src={(car.images?.length ? car.images : [car.image])[mainIndex]}
              alt="Car Image"
              className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {(car.images?.length ? car.images : [car.image])
              .slice(0, 4)
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Car ${index}`}
                  onClick={() => setMainIndex(index)}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer transition border-2 ${
                    mainIndex === index
                      ? "border-black"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} - {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="Car Info Icons" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}

            <div>
              <h1 className="text-xl">Vehicle Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
          </div>
        </div>

        {/* Right: Booking Section */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay.toFixed(2)}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              required
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              required
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
            />
          </div>

          <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl">
            Reserve Vehicle
          </button>

          <p className="text-center text-sm">
            No credit card required to reserve.
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
