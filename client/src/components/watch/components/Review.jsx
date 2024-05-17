import { TMDB_imageResize } from "../../../utils/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Linkify from "react-linkify";
import { useState } from "react";

const Review = ({ item }) => {
  const [showMore, setShowMore] = useState(true);
  dayjs.extend(relativeTime);

  return (
    <div className="flex flex-col text-sm rounded-lg bg-gray-900 p-4 mt-10">
      <div className="flex gap-x-4 items-center">
        <div
          className="rounded-full h-8 w-8 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-cover bg-center border border-white shrink-0"
          style={{
            backgroundImage: `url(${
              !item.author_details.avatar_path.includes("https")
                ? TMDB_imageResize("w200", item.author_details.avatar_path)
                : item.author_details.avatar_path.slice(1)
            })`,
          }}
        />
        <div className="w-full">
          <p className="font-bold">{item.author}</p>
          <p className="text-xs">{dayjs(item.created_at).fromNow()}</p>
        </div>
      </div>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a
            target="blank"
            href={decoratedHref}
            key={key}
            className="text-red-600 hover:underline"
          >
            {decoratedText}
          </a>
        )}
      >
        <div className={`${showMore ? "review-content" : ""} mt-4 mb-2`}>
          {item.content}
        </div>
      </Linkify>

      {showMore ? (
        <p
          className="text-right text-xs mb-2 cursor-pointer hover:text-red-600 transition-colors font-bold"
          onClick={() => setShowMore(false)}
        >
          View more
        </p>
      ) : (
        <p
          className="text-right text-xs mb-2 cursor-pointer hover:text-red-600 transition-colors font-bold"
          onClick={() => setShowMore(true)}
        >
          Collapse
        </p>
      )}

      <p className="text-right ">
        Rating:{" "}
        <span className="text-red-600 font-bold">
          {item.author_details.rating}
        </span>{" "}
        / <sub className="font-bold">10</sub>
      </p>
    </div>
  );
};

export default Review;
