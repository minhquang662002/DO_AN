import { TMDB_imageResize } from "../../../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { XCircleIcon } from "@heroicons/react/outline";
// import { addToList } from "../utils/api";

const FilmItem = ({ item, mediaType }) => {
  const [loaded, setLoaded] = useState(true);
  return (
    <div className="overflow-hidden cursor-pointer">
      <div className="relative">
        <Link to={`/watch/${mediaType}/${item.id}`}>
          <img
            className={`transition-all hover:scale-125 ${
              loaded ? "" : "bg-gray-600 animate-pulse"
            }`}
            src={TMDB_imageResize(`w500`, item.poster_path)}
            width={200}
            height={300}
            onLoad={() => setLoaded(true)}
            alt="movie logo"
          />
        </Link>
        {/* {router.asPath.includes("watchlist") && (
          <XCircleIcon
            className="w-6 h-6 absolute top-0 right-2 hover:text-red-600"
            onClick={() =>
              addToList(
                item.media_type,
                item.id,
                item.name || item.title,
                item.poster_path
              )
            }
          />
        )} */}
      </div>
      <Link to={`/watch/${item.media_type}/${item.id}`}>
        <p className="text-xs lg:text-base font-bold cursor-pointer hover:text-red-600 transition-colors text-black">
          {item.title || item.name || item.filmName}
        </p>
      </Link>
    </div>
  );
};

export default FilmItem;
