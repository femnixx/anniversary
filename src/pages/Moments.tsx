import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";
import bluerealbackground from "../assets/bluerealbackground.jpg";
import pomsit from "../assets/pomsit.png";
import { supabase } from "../SupabaseClient";


const Moments = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onSelect = (e: FileUploadSelectEvent) => {
    const selectedFiles = Array.from(e.files as File[]);
    setFiles(selectedFiles);
    console.log("Selected files:", selectedFiles);
  };

  const onUpload = async () => {
    if (files.length === 0) return alert("No files selected!");
    console.log("Uploading files:", files);
    alert(`Uploaded ${files.length} file(s)!`);
    setUploading(true);

    for (const file of files) {
      const filePath = `moments/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("images").upload(filePath, file);
      
      if (error) {
        console.error("Upload failed:", error.message);
        alert(`Failed to upload ${file.name}`);
      } else {
        console.log("Uploaded:", filePath);
      }
    }

    alert(`Sucessfully uploaded ${files.length} file(s)!`);
    setUploading(false);
    setFiles([]);
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bluerealbackground})` }}>
      <div className="flex flex-col items-center justify-center w-full h-full pt-20 px-3">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col items-center gap-y-8 w-full max-w-lg">
          <p className="text-center font-semibold text-xl italic">
            pick your favorite moment <br /> of us together!
          </p>

          <div className="w-full flex justify-center">
            <img src={pomsit} alt="cute" className="w-52 md:w-60 -my-8" />
          </div>

          <div className="w-full border-2 border-dashed border-blue-400 rounded-xl p-4 text-center">
            <FileUpload
  name="files"
  accept="image/*"
  multiple
  customUpload
  uploadHandler={onUpload}
  onSelect={onSelect}
  chooseLabel="Choose Files"
  uploadLabel={uploading ? "Uploading..." : "Upload"}
  cancelLabel="Clear"
  className="flex flex-col gap-2  w-full  gap-x-3 gap-y-4 justify-center items-center"
  chooseOptions={{
    className: 'bg-blue-400 text-white rounded-lg px-2'
  }}
  uploadOptions={{
    className: 'bg-green-400 text-white  rounded-lg px-2'
  }}
  cancelOptions={{
    className: 'bg-red-400 text-white  rounded-lg px-2'
  }}
  pt={{
    buttonbar: { className: 'flex gap-5'}
  }}
/>

          </div>

          {/* Preview of selected files */}
          {files.length > 0 && (
            <div className="w-full bg-blue-50 rounded-xl p-3">
              <p className="font-semibold text-blue-600 mb-2 text-center">
                Selected Files
              </p>
              <ul className="text-gray-700 text-sm space-y-1">
                {files.map((file, i) => (
                  <li key={i}>📸 {file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moments;
