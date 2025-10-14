import bluerealbackground from "../assets/bluerealbackground.jpg"


const Plan = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full" style={{backgroundImage: `url(${bluerealbackground})`}}>
        <div className="w-full h-auto pt-10">
          <p className="font-bold text-white text-2xl italic text-center">plan our next date!</p>
        </div>
      </div>
    </div>
  )
}

export default Plan