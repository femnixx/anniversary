import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";
import bluerealbackground from "../assets/bluerealbackground.jpg";
import pomsit from "../assets/pomsit.png";
import { supabase } from "../SupabaseClient";

const Moments = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const onSelect = (e: FileUploadSelectEvent) => {
    const selectedFiles = Array.from(e.files as File[]);
    setFiles(selectedFiles);
    console.log("Selected files:", selectedFiles);
  };

  // Handle upload
  const onUpload = async () => {
    if (files.length === 0) return alert("No files selected!");
    setUploading(true);

    for (const file of files) {
      const filePath = `moments/${file.name}`;
      const { error } = await supabase.storage.from("images").upload(filePath, file);

      if (error) {
        console.error("Upload failed:", error.message);
        alert(`❌ Failed to upload ${file.name}`);
      } else {
        console.log("Uploaded:", filePath);
      }
    }

    alert(`✅ Successfully uploaded ${files.length} file(s)!`);
    setUploading(false);
    setFiles([]);
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center py-10 px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bluerealbackground})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Main Card */}
      <div className="relative bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-y-8 w-full max-w-lg max-h-[85vh] border border-gray-200">
        
        {/* Title */}
        <p className="text-center font-semibold text-xl italic text-gray-800">
          pick your favorite moment <br /> of us together!
        </p>

        {/* Cute image */}
        <div className="w-full flex justify-center">
          <img src={pomsit} alt="cute" className="w-52 md:w-60 -my-6" />
        </div>

        {/* Scrollable Upload Section */}
        <ScrollArea.Root className="w-full h-[45vh] rounded-xl overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full rounded-xl relative">
            
            {/* Top/Bottom fade for smooth scroll */}
            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-10" />

            {/* Upload box */}
            <div className="w-full border-2 border-dashed border-blue-400 rounded-xl p-4 text-center bg-white/70 relative z-0">
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
                className="flex flex-col gap-2 w-full justify-center items-center"
                chooseOptions={{
                  className: "bg-blue-400 text-white rounded-lg px-3 py-1",
                }}
                uploadOptions={{
                  className: "bg-green-400 text-white rounded-lg px-3 py-1",
                }}
                cancelOptions={{
                  className: "bg-red-400 text-white rounded-lg px-3 py-1",
                }}
                pt={{
                  buttonbar: { className: "flex gap-4 justify-center mt-3" },
                }}
              />

              {/* Selected file preview */}
              {files.length > 0 && (
                <div className="w-full bg-blue-50 rounded-xl p-3 mt-5">
                  <p className="font-semibold text-blue-600 mb-2 text-center">
                    Selected Files
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 text-left">
                    {files.map((file, i) => (
                      <li key={i}>📸 {file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea.Viewport>

          {/* Custom scrollbar */}
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex select-none touch-none p-0.5 bg-transparent transition hover:bg-blue-200"
          >
            <ScrollArea.Thumb className="flex-1 bg-blue-400 rounded-full" />
          </ScrollArea.Scrollbar>

          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    </div>
  );
};

export default Moments;
