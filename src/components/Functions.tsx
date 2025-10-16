const complimentGenerator = () => {
    const complimentsList = [
    "hi there",
    "hi",
    "you",
    "you're pretty",
    "You're so lovely",
    "i love you",
    "memememe"
  ];
  const random = Math.floor(Math.random() * complimentsList.length);
  const randomCompliment = complimentsList[random];
  
  return (
    <>
    <div>
        <p>${randomCompliment}</p>
    </div>
    </>
  )
}

export default complimentGenerator;