import bluerealbackground from "../assets/bluerealbackground.jpg"

const Moments = () => {
  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <div className="w-full h-auto pt-20 text-center flex flex-col justify-center items-center">
          <p className="text-center">pick your favorite moment <br /> of us together!</p>
          <p>upload file</p>
        </div>
      </div>
    </div>
  )
}

export default Moments