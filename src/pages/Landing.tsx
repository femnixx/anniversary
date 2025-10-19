import { useNavigate } from 'react-router-dom';
import '../App.css';
import cinnamorollpeeking from "../assets/cinnamorollpeeking.png";
import text from "../assets/text.png";
import envelope from "../assets/trans-evelope.png";
import blueBg from "../assets/bluerealbackground.jpg";
function Landing() {
  
const navigate = useNavigate();

  return (
    <>
      {/* splashscreen */}
      <div
        className="relative w-full min-h-dvh bg-cover bg-center"
        style={{ backgroundImage: `url(${blueBg})` }}
      >
        <div className="mx-auto max-w-7xl min-h-dvh grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2 items-center gap-4 md:gap-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 sm:pb-24">
          {/* Card */}
          <div className="order-1 md:order-none">
            <div className="bg-white/90 rounded-2xl p-4 sm:p-6 ring-1 ring-blue-200 shadow-lg shadow-blue-300/40 backdrop-blur-md md:max-w-lg">
              <p className="text-center text-blue-500 font-semibold text-[clamp(1.25rem,2.5vw,1.75rem)]">𝙨𝙪𝙧𝙥𝙧𝙞𝙨𝙚!</p>

              <div className="flex justify-center -mt-2 sm:-mt-3">
                <img
                  src={envelope}
                  alt="Baby blue envelope"
                  className="w-40 sm:w-52 md:w-64 h-auto object-contain"
                  decoding="async"
                  loading="lazy"
                />
              </div>

              <div className="-mt-4 sm:-mt-5 px-4">
                <div className="border-blue-200 border-dashed border"></div>
              </div>

              <div className="pt-3 sm:pt-4">
                <p className="text-center text-blue-500 font-bold text-[clamp(1rem,2.2vw,1.25rem)]">you've got mail !</p>
                <div className="mt-3 sm:mt-4 flex justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    className="bg-green-300/90 hover:bg-green-300 text-black px-4 sm:px-5 py-2 rounded-full shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 text-sm sm:text-base"
                    onClick={() => navigate('/message')}
                    aria-label="Open message"
                  >
                    open
                  </button>
                  <button
                    type="button"
                    className="bg-red-300/90 hover:bg-red-300 text-black px-4 sm:px-5 py-2 rounded-full shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 text-sm sm:text-base"
                    aria-label="Leave"
                  >
                    leave
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero text image */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={text}
              alt=""
              aria-hidden
              className="max-w-full max-h-[42vh] sm:max-h-[50vh] md:max-h-[60vh] object-contain"
              decoding="async"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom peeking character */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <img
            src={cinnamorollpeeking}
            alt="Cinnamoroll peeking from bottom edge"
            className="w-28 sm:w-36 md:w-44 -mb-1 sm:-mb-2 md:-mb-3 select-none"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default Landing;

