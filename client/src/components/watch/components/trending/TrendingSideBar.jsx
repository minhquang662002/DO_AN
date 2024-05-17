import { Swiper, SwiperSlide } from "swiper/react";
import { TMDB_imageResize, getGenreName } from "../../../../utils/constants";
const TrendingSideBar = ({ trendingData }) => {
  let mb_sidebar;
  mb_sidebar = (
    <>
      <p className="mb-2 font-bold">Other trending films</p>
      <Swiper
        slidesPerView="auto"
        // loop={true}
        spaceBetween={10}
        slidesPerGroupAuto
        className="text-center lg:hidden w-full"
      >
        {trendingData?.slice(1, 11).map((item, index) => {
          return (
            <SwiperSlide key={index} className="!w-[100px]">
              <div>
                <a
                  href={`/${trendingData[0].media_type}/${trendingData[0].id}/watch`}
                >
                  <img
                    src={TMDB_imageResize("w200", item.poster_path)}
                    width={100}
                    height={150}
                    className="rounded-lg"
                  />
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );

  let pc_sidebar = (
    <div className="hidden md:block lg:block bg-gray-600 rounded-lg overflow-y-scroll border-track lg:h-[500px] md:h-[500px]">
      {trendingData?.slice(1, 11).map((item, index) => {
        return (
          <div
            className="hover:bg-black transition relative overflow-hidden"
            key={index}
          >
            <div
              className="block absolute bg-cover layer-right brightness-50 h-full w-full"
              style={{
                backgroundImage: `url(${TMDB_imageResize(
                  "w500",
                  item.backdrop_path
                )})`,
              }}
            />
            <div className="flex md:gap-x-4 gap-x-10 !brightness-100 p-2">
              <div className="shrink-0">
                <img
                  src={TMDB_imageResize("w200", item.poster_path)}
                  width={100}
                  height={150}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex flex-col">
                <a href={`/${item.media_type}/${item.id}`}>
                  <h3 className="md:text-sm text-xl hover:text-red-600 cursor-pointer text-white">
                    {item.title || item.name}
                  </h3>
                </a>
                <div className="md:hidden flex gap-x-2 text-sm flex-wrap">
                  {getGenreName(item.genre_ids).map((genre) => (
                    <a
                      key={genre.id}
                      href={`/genre/${item.media_type}/${genre.id}?page=1`}
                    >
                      <span className="whitespace-nowrap">{genre.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="lg:hidden md:hidden">{mb_sidebar}</div>
      {pc_sidebar}
    </>
  );
};

export default TrendingSideBar;
