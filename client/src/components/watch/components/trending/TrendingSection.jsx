import { TMDB_imageResize, getGenreName } from "../../../../utils/constants";
import { PlayIcon } from "@heroicons/react/outline";
import TrendingSideBar from "./TrendingSideBar";

const TrendingSection = ({ trendingData }) => {
  return (
    <div className="font-sora mt-10 mb-24 mx-auto">
      <h2 className="text-xl lg:text-3xl py-8">Trending today</h2>
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-10 md:grid md:grid-cols-3 md:gap-x-10 ">
        <div className="lg:col-span-2 md:col-span-2">
          <div className="w-full h-72 relative lg:h-3/4 lg:group">
            <img
              style={{ height: "100%" }}
              src={TMDB_imageResize(
                "original",
                trendingData?.[0]?.backdrop_path
              )}
              className="rounded-lg group-hover:brightness-50 transition"
            />
            <a
              href={`/${trendingData?.[0]?.media_type}/${trendingData?.[0]?.id}/watch`}
            >
              <PlayIcon className="group-hover:visible invisible absolute w-24 h-24 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:text-red-600 transition" />
            </a>
          </div>
          <div className="py-4">
            <h3 className="text-lg lg:text-3xl">
              {trendingData?.[0]?.title || trendingData?.[0]?.name}
            </h3>
            <div className="text-xs lg:text-sm flex flex-wrap gap-2 my-2">
              {getGenreName(trendingData?.[0]?.genre_ids).map((genre) => (
                <a
                  href={`/genre/${trendingData?.[0]?.media_type}/${genre?.id}?page=1`}
                  key={genre?.id}
                >
                  <span className="rounded-full border border-white py-1 px-2 hover:border-red-600 hover:text-red-600 cursor-pointer">
                    {genre?.name}
                  </span>
                </a>
              ))}
            </div>
            <div className="text-sm lg:text-base">
              {trendingData?.[0]?.overview.length > 200 &&
                trendingData?.[0]?.overview.slice(0, 205) + "..."}
            </div>
          </div>
        </div>

        <TrendingSideBar trendingData={trendingData} />
      </div>
    </div>
  );
};

export default TrendingSection;
