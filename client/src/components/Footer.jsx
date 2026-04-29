import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500  ">
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        <div>
          <img src={assets.logo} alt="Logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Apex Exotics is a curated platform for renting and listing the
            world's finest supercars. We connect drivers and owners through
            seamless, secure, and premium automotive experiences.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="Instagram Icon"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="FacebookIcon"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.gmail_logo}
                alt="Gmail Icon"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Collection</a>
            </li>
            <li>
              <a href="#">List Your Vehicle</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms Of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact Us
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>123 Luxury Drive</li>
            <li>Sandton, Johannesburg, 2196</li>
            <li>+27 123 456 789</li>
            <li>example@apexexotics.com</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Built By - Sage Aaron Padayachee</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>

          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
