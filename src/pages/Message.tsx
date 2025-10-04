import bluerealbackground from "../assets/bluerealbackground.jpg"
import pomaroll from "../assets/pomarollcropped.png"
const Message = () => {
  return (
    <div className="w-screen h-screen bg-[url('../assets/bluebackground2.jpg')]" style={{ backgroundImage: `url(${bluerealbackground})`, backgroundPosition:"center", backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        {/* main screen */}
        <div className="w-full h-full flex items-center justify-center p-3">
          <div className="bg-white flex justify-center items-center flex-col p-3 gap-y-5 rounded-xl ring-4 shadow-xl shadow-blue-400 ring-blue-400">
            <div className="shadow-xl border-2  rounded-xl border-blue-400">
            <img src={pomaroll} alt=""  className="p-1.5"/>
            </div>
            <div className="border-3 flex flex-col gap-y-5 p-3  rounded-xl border-blue-400 shadow-xl">
              <div className="flex flex-col w-full justify-center text-center border-2 py-1 border-blue-400 border-dotted ">
                <p className="font-extrabold text-blue-400">to my amore</p>
                <p className="font-extrabold text-blue-400">happy anniversary <br /> ૮ ˶ᵔ ᵕ ᵔ˶ ა</p>
              </div>
              {/* main content */}
              <div className="text-center border-2 border-blue-400 py-1.5 rounded-md border-dotted">
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ipsam doloribus voluptate unde quaerat aperiam, reprehenderit impedit obcaecati incidunt culpa possimus sapiente quo fugit alias suscipit quisquam quos libero deleniti.</p>
              </div>
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-full font-bold text-sm px-3">Continue {'<'}3</button>
          </div>
        </div>
    </div>
  )
}

export default Message