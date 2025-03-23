import { fetchTvStationNews } from "@/app/api-services/APIServices";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import newsBanner from "../images/news-banner.png";
import defaultImage from "../images/default-image.png";
import Loader from "./Loader";

export default function TrendingNews() {
  const { data: newsData, isLoading} = useQuery({
    queryKey: ["tv-news"],
    queryFn: () => fetchTvStationNews(),
  });
  return (
    <>
    <div className="bg-[#222222] p-4 rounded-2xl shadow-lg w-full max-w-sm">
      {/* Heading */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between bg-[#222222] p-3 rounded-md">
          <Image
            src={newsBanner}
            alt="news-banner"
            width={400}  // Increase width
            height={250} // Increase height
            className="w-full h-auto rounded-lg"
          />


        </div>

      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Trending News</h2>
        <span className="text-[#C3CC5A] cursor-pointer">➜</span>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {newsData?.slice(0, 6)?.map((news, index) => (
          <Link href={news?.url} target="_blank">
          <div
            key={news?.id}
            className={`flex items-start gap-3 p-2 rounded-lg ${index === 0 ? "bg-[#303030]" : "hover:bg-[#303030]"
              } transition`}
            
          >
            {/* News Image */}
            <img
              src={news?.image_path ?? defaultImage}
              alt={news.name}
              className="w-14 h-14 object-cover rounded-lg"
            />

            {/* News Content */}
            <div className="flex-1">
              <h3 className="text-white text-sm font-medium">{news.name}</h3>
              {/* <p className="text-gray-400 text-xs">{news.timestamp}</p> */}
            </div>

            {/* Bookmark Icon */}
            <Bookmark size={16} className="text-[#C3CC5A] cursor-pointer" />
          </div>
          </Link>
        ))}
      </div>
    </div>
       {isLoading  ? <Loader/> : null}
    </>
  );
}
