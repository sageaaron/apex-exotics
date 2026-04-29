import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Add Your Car"
        subTitle="Fill in your car details, upload images, and set your pricing to make your car available for bookings"
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload Icon"
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload A Picture Of Your Car</p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              required
              type="text"
              placeholder="Ferrari"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              required
              type="text"
              placeholder="SF90 Spider"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>
        </div>

        {/* Car Year, Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              required
              type="number"
              placeholder="2025"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              required
              type="number"
              placeholder="20000"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              required
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select A Category</option>
              <option value="Hypercar">Hypercar</option>
              <option value="Supercar">Supercar</option>
              <option value="Performance">Performance</option>
              <option value="Open-Top">Open-Top</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              required
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select A Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              required
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select A Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              required
              type="number"
              placeholder="2"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col w-full">
            <label>Location</label>
            <input
              required
              type="text"
              placeholder="Sandton, Johannesburg"
              value={car.location}
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>
        </div>

        {/* Car  Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            required
            rows={5}
            placeholder="Low mileage Ferrari SF90 Spider in pristine condition with full service history, perfect for weekend drives"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="Tick Icon" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
