import {
  PlayIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomImage from "./CustomImage";
import { TMDB_imageResize, getGenreName } from "../../../utils/constants";

const Carousel = ({ carouselData }) => {
  return (
    <>
      <Swiper loop={true} className="w-full h-[300px] lg:h-[600px] text-cente">
        {carouselData?.map((item) => {
          return (
            <SwiperSlide key={item?.id} className="relative group">
              <CustomImage
                className="group-hover:brightness-75 transition object-cover object-center"
                src={TMDB_imageResize("original", item?.backdrop_path)}
              />

              <a href={`/watch/movie/${item?.id}`}>
                <PlayIcon
                  className="hidden lg:block absolute invisible transition group-hover:visible 
            right-32 top-1/2 -translate-y-1/2 w-36 h-36 cursor-pointer hover:text-red-500 text-white"
                />
              </a>
              <div className="absolute md:top-1/4 top-1/3 left-8 lg:top-32 lg:left-24 md:max-w-sm lg:max-w-2xl select-none text-left text-white">
                <h4 className="font-bold text-2xl md:text-5xl lg:text-5xl mb-4">
                  {item?.title || item?.name}
                </h4>
                <div className="text-sm md:text-base lg:text-base flex gap-x-4 mb-2">
                  <div className="flex items-center gap-x-1">
                    <StarIcon className="w-4 h-4" />
                    <span>IMDB: {item.vote_average}</span>
                  </div>
                  <div className="hidden md:flex lg:flex items-center gap-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>
                      DURATION:{" "}
                      {`${Math.floor(item?.runtime / 60)}h ${
                        item.runtime % 60
                      }m`}
                    </span>
                  </div>
                  <div className="hidden md:flex lg:flex items-center gap-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>YEAR: {item?.release_date?.substring(0, 4)}</span>
                  </div>
                </div>

                <div className="hidden mb-4 lg:mb-8 text-xs lg:flex gap-x-2">
                  {getGenreName(item?.genre_ids).map((genre) => (
                    <a
                      key={genre.id}
                      href={`/${item?.media_type}/genre?id=${genre?.id}&page=1`}
                    >
                      <div className="cursor-pointer transition hover:text-red-600 hover:border-red-600 font-bold text-sm border-white border-2 w-auto py-2 px-4 rounded-3xl text-center whitespace-nowrap">
                        {genre?.name}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="hidden md:block lg:block">{item?.overview}</div>
                <div className="hidden lg:flex items-center gap-4 my-2">
                  <div className="text-xs font-bold uppercase rounded p-1 text-white border border-white">
                    {item?.original_language}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold uppercase rounded p-1 text-white border border-white">
                      TMDB
                    </div>
                    <span className="text-sm font-bold">
                      {item?.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                {/* <div className="flex gap-x-4 text-xs md:text-base lg:text-base">
                <Link href={`/movie/${item.id}/watch`}>
                  <button className="flex items-center justify-center gap-x-2 md:w-36 lg:w-36 md:h-12 lg:h-12 w-24 h-8 rounded-full bg-red-600 transition hover:bg-red-500 shadow-lg hover:shadow-red-600">
                    <PlayIcon className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" />
                    <span> Watch now</span>
                  </button>
                </Link>
                <button
                  className="flex items-center justify-center gap-x-2 md:w-36 lg:w-36 md:h-12 lg:h-12 w-24 h-8 rounded-full bg-white text-black"
                  onClick={() =>
                    addToList("movie", item.id, item.title, item.poster_path)
                  }
                >
                  <PlusIcon className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" />
                  <span>Add list</span>
                </button>
              </div> */}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;
