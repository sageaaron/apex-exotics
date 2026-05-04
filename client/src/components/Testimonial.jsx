import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Cape Town, South Africa",
      image: assets.testimonial_image_1,
      testimonial:
        "Flawless experience from booking to return. The Lamborghini Urus was delivered in pristine condition, and the entire process felt seamless and premium. Apex Exotics truly sets the standard for luxury rentals.",
    },
    {
      name: "Marcus Williams",
      location: "Durban, South Africa",
      image: assets.testimonial_image_3,
      testimonial:
        "I listed my McLaren 720s through Apex Exotics and had my first booking within days. Everything is handled — payments, screening, and logistics. It's the perfect platform for exotic car owners.",
    },
    {
      name: "Sophia Lee",
      location: "Pretoria, South Africa",
      image: assets.testimonial_image_2,
      testimonial:
        "Absolutely exceptional service. The booking process was effortless, and the Porsche 911 exceeded expectations. Apex Exotics makes luxury driving accessible without compromise.",
    },
  ];
  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="Client Experiences"
        subTitle="Stories from those who`ve experienced the pinnacle of luxury driving"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="Star Icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
