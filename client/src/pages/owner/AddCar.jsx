import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [images, setImages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...images];
    const dragged = reordered.splice(dragIndex, 1)[0];
    reordered.splice(index, 0, dragged);
    setImages(reordered);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return null;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImages([]);
        setCar({
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap gap-2">
            {images.length > 0 ? (
              images.map((img, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative cursor-grab ${dragIndex === index ? "opacity-50" : "opacity-100"}`}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Car Image ${index + 1}`}
                    className="h-14 rounded object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 text-center text-white text-xs bg-black/50 rounded-b">
                      Cover
                    </span>
                  )}
                </div>
              ))
            ) : (
              <label htmlFor="car-image">
                <img
                  src={assets.upload_icon}
                  alt="Upload Icon"
                  className="h-14 rounded cursor-pointer"
                />
              </label>
            )}
          </div>
          <label
            htmlFor="car-image"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="file"
              id="car-image"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => setImages([...e.target.files])}
            />
            <p className="text-sm text-gray-500">
              {images.length > 0
                ? `${images.length} Image(s) Selected — Drag To Reorder, Cover Image Should Be The Front Of Your Car`
                : "Upload Images Of Your Car"}
            </p>
          </label>
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
            <select
              required
              value={car.location}
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select A Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Car Description */}
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
          {isLoading ? "Listing Your Car..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
