import bluerealbackground from "../assets/bluerealbackground.jpg";
import pomaroll from "../assets/pomarollcropped.png";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${bluerealbackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Main screen */}
      <div className="flex items-center justify-center w-full h-full p-4 md:p-16">
        {/* Card */}
        <div className="bg-white flex flex-col justify-between items-center p-4 md:p-8 gap-6 rounded-2xl ring-4 ring-blue-400 shadow-xl shadow-blue-300 w-full max-w-4xl min-h-[70vh]">
          {/* Top content (image + message) */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6">
            {/* Image section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={pomaroll}
                alt="pomaroll"
                className="object-contain rounded-xl border-2 border-blue-400 shadow-md w-[80%] sm:w-[70%] md:w-[90%] h-auto max-h-[250px] md:max-h-[320px]"
              />
            </div>

            {/* Message section */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 p-4 rounded-xl border-2 border-blue-400 shadow-md bg-white/80">
              <div className="text-center border-2 border-blue-400 border-dotted py-2 rounded-lg">
                <p className="font-extrabold text-blue-400 text-lg md:text-xl">
                  to my amore
                </p>
                <p className="font-extrabold text-blue-400 text-base md:text-lg">
                  happy anniversary <br /> ૮ ˶ᵔ ᵕ ᵔ˶ ა
                </p>
              </div>

              {/* Main content */}
              <div className="text-center border-2 border-blue-400 border-dotted py-3 px-2 rounded-md">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                  ipsam doloribus voluptate unde quaerat aperiam, reprehenderit
                  impedit obcaecati incidunt culpa possimus sapiente quo fugit
                  alias suscipit quisquam quos libero deleniti.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            className="bg-blue-400 text-white py-2 px-5 rounded-full font-bold text-sm md:text-base shadow-md hover:bg-blue-500 transition"
            onClick={() => {
              navigate("/options");
            }}
          >
            Continue {"<"}3
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
