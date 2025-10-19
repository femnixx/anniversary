import bluerealbackground from "../assets/bluerealbackground.jpg"
import pomsit from "../assets/pomsit.png"
import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload"
import { Divider } from 'primereact/divider';
import { useState } from "react";
        
const onUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onSelect = (e: FileUploadSelectEvent) => {
    const selectedfiles = Array.from(e.files as File[]);
    setFiles(selectedfiles);
    
  }
}

const Moments = () => {


  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <div className="w-full h-auto pt-20 text-center flex flex-col justify-center items-center">
          <div className="w-full h-auto">
            <div className="bg-white p-3 m-3 rounded-xl flex flex-col gap-y-10">
              <p className="text-center font-semibold text-xl italic pt-5">pick your favorite moment <br /> of us together!</p>
              <div className="w-full justify-center flex flex-1">
                <img src={pomsit} alt="" className="w-50 -my-15"/>
              </div>
              <div className="w-full outline-blue-400 outline-dashed outline-2">
              </div>
              <FileUpload mode="basic"></FileUpload>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Moments