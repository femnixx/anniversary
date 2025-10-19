import bluerealbackground3 from "../assets/bluerealbackground3.jpg"

const Journey = () => {
  return (
    <div className='w-screen h-screen'>
      <div
  className="w-full h-full bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bluerealbackground3})` }}
>
  <div className="w-full h-full flex flex-col justify-center items-center bg-black/30 text-white">
    <p className="text-xl font-semibold">Scroll down or something</p>
  </div>
</div>

    </div>
  )
}

export default Journey