import { TMDB_imageResize } from "../../../../utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
const MovieSideBar = ({ similiar }) => {
  let pc_ver = (
    <div className="hidden lg:block">
      <p className="uppercase font-bold">similar movies</p>
      <div
        className="flex flex-col max-h-132 overflow-y-scroll"
        style={{ maxHeight: 600 }}
      >
        {similiar?.results.map((item) => {
          return (
            <a href={`/watch/movie/${item.id}`} key={item.id}>
              <div className="flex gap-x-4 p-2 hover:bg-red-600 cursor-pointer transition">
                <div>
                  <img
                    className="rounded-lg"
                    src={TMDB_imageResize("w500", item.poster_path)}
                    width={100}
                    height={150}
                  />
                </div>
                <p className="w-2/4">{item.title}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );

  let mb_ver = (
    <div className="block lg:hidden">
      <p className="uppercase font-bold my-2">similar movies</p>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        slidesPerGroupAuto
        className="text-center w-full"
      >
        {similiar?.results?.map((item) => {
          return (
            <SwiperSlide key={item.id} className="!w-[100px]">
              <a href={`/movie/${item.id}`}>
                <div>
                  <a
                    className="rounded-lg"
                    src={TMDB_imageResize("w500", item.poster_path)}
                    width={100}
                    height={150}
                  />
                </div>
              </a>
              <p className="text-xs">{item.title}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );

  return (
    <>
      {pc_ver}
      {mb_ver}
    </>
  );
};

export default MovieSideBar;
