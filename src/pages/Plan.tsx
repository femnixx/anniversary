import { useEffect, useState } from "react";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import CircularGallery from "../components/CircularGallery";
import "../components/CircularGallery.css";
import { supabase } from "@/SupabaseClient";

interface GalleryItem {
  image: string;
  text: string;
}

const fallbackGallery: GalleryItem[] = [
  { image: "https://picsum.photos/id/1003/800/600", text: "First Date" },
  { image: "https://picsum.photos/id/1025/800/600", text: "Beach Day" },
  { image: "https://picsum.photos/id/1062/800/600", text: "Coffee Break" },
  { image: "https://picsum.photos/id/1074/800/600", text: "Concert Night" },
];

const Plan = () => {
  const [myGalleryItems, setMyGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data: files, error } = await supabase
        .storage
        .from("images")
        .list("moments/", { limit: 100 });

      if (error) {
        console.error("Error fetching images:", error);
        setMyGalleryItems(fallbackGallery); // fallback if error
        return;
      }

      const supabaseItems: GalleryItem[] = files.map((file) => {
        const { data } = supabase
          .storage
          .from("images")
          .getPublicUrl(`moments/${file.name}`);

        return {
          image: data.publicUrl,
          text: file.name.replace(/\.[^/.]+$/, ""),
        };
      });

      // Merge Supabase images with fallback if less than 4
      const combinedItems =
        supabaseItems.length >= 4
          ? supabaseItems
          : [...supabaseItems, ...fallbackGallery].slice(0, 4);

      setMyGalleryItems(combinedItems);
    };

    fetchImages();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(${bluerealbackground3})` }}
      >
        <div className="pt-8 text-center px-4">
          <p className="font-bold text-white text-3xl md:text-4xl italic drop-shadow-lg">
            Our favorite memories!
          </p>
        </div>

        <div className="flex justify-center items-center w-full" style={{ height: "65vh", position: "relative" }}>
          <CircularGallery
            key={myGalleryItems.length} // forces re-render if items change
            items={myGalleryItems}
            bend={2.5}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.03}
          />
        </div>
      </div>
    </div>
  );
};

export default Plan;
