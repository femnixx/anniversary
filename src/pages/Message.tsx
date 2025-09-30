import bluebackground from "../assets/bluebackground.jpg"

const Message = () => {
  return (
    <div className="w-screen h-screen bg-[url('../assets/bluebackground2.jpg')]" style={{ backgroundImage: `url(${bluebackground})`}}>
        
    </div>
  )
}

export default Message