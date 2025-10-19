import bluerealbackground from "../assets/bluerealbackground.jpg"
import pomsit from "../assets/pomsit.png"


function onUpload() {

}

const Moments = () => {


  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <div className="w-full h-auto pt-20 text-center flex flex-col justify-center items-center">
          <div className="w-full h-auto">
            <div className="bg-white p-3 m-3 rounded-xl">
              <p className="text-center font-semibold text-xl italic pt-5">pick your favorite moment <br /> of us together!</p>
              <div className="w-full justify-center flex flex-1">
                <img src={pomsit} alt="" className="w-50"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Moments