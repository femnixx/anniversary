import bluerealbackground from "../assets/bluerealbackground.jpg"

const Message = () => {
  return (
    <div className="w-screen h-screen bg-[url('../assets/bluebackground2.jpg')]" style={{ backgroundImage: `url(${bluerealbackground})`, backgroundPosition:"center", backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        {/* main screen */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white border-1 flex justify-center items-center flex-col">
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>
            <p> hi there</p>

          </div>
        </div>
    </div>
  )
}

export default Message