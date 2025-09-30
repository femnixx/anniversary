import bluerealbackground from "../assets/bluerealbackground.jpg"

const Message = () => {
  return (
    <div className="w-screen h-screen bg-[url('../assets/bluebackground2.jpg')]" style={{ backgroundImage: `url(${bluerealbackground})`, backgroundPosition:"center", backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        {/* main screen */}
        <div className="w-full h-full flex items-center justify-center p-3">
          <div className="bg-white flex justify-center items-center flex-col p-3 gap-y-5">
            <div>
              <p>To My Amore~</p>
            </div>
            <div>
              <p>Hapy Anniversary!!</p>
            </div>
            {/* main content */}
            <div className="text-center">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ipsam doloribus voluptate unde quaerat aperiam, reprehenderit impedit obcaecati incidunt culpa possimus sapiente quo fugit alias suscipit quisquam quos libero deleniti.</p>
            </div>
            <button>Continue</button>
          </div>
        </div>
    </div>
  )
}

export default Message