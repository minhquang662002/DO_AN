import {
  BsMoon,
  BsFillBookmarkFill,
  BsMessenger,
  BsFillCloudHailFill,
} from "react-icons/bs";
import { FaCompass } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/hooks";
import { useGetHotNewsQuery } from "../../redux/services/news.service";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { memo } from "react";

SwiperCore.use([Pagination, Autoplay]);

const HomeLeft = ({ user }) => {
  const { data } = useGetHotNewsQuery();
  const [toggleDarkMode] = useDarkMode();
  return (
    <>
      <Link
        to={`/profile?id=${user?.userID}`}
        className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-cyan-200 dark:hover:bg-purple-500 transition cursor-pointer border dark:border-purple-500"
      >
        <div
          className="border border-black h-10 w-10 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url(${user?.avatar})` }}
        />
        <div className="text-sm">
          <p className="font-bold whitespace-nowrap">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs">@{user?.email.split("@")[0]}</p>
        </div>
      </Link>

      <div
        className="flex flex-col my-8 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-purple-500 rounded-lg text-sm
      [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:px-4 [&>a]:py-3 [&>a]:border-b  
      [&>a]:border-gray-200 dark:[&>a]:border-purple-500 [&>a:hover]:bg-cyan-200 dark:[&>a:hover]:bg-purple-500 [&>a]:transition-colors [&>a]:cursor-pointer
      [&>a>svg]:text-lg"
      >
        <Link to="/messenger" className="group rounded-t-lg">
          <BsMessenger className="text-blue-600" />
          <span className="group-hover:text-cyan-600 dark:group-hover:text-white">
            Messenger
          </span>
        </Link>
        <Link to="/explore" className="group">
          <FaCompass className="text-orange-600" />
          <span className="group-hover:text-cyan-600 dark:group-hover:text-white">
            Explore
          </span>
        </Link>
        <Link to="/saved" className="group">
          <BsFillBookmarkFill className="text-purple-600" />
          <span className="group-hover:text-cyan-600 dark:group-hover:text-white">
            Saved
          </span>
        </Link>
        <Link to="/weather" className="group">
          <BsFillCloudHailFill className="text-slate-300" />
          <span className="group-hover:text-cyan-600 dark:group-hover:text-white">
            Weather
          </span>
        </Link>
        <div
          className="group border-none flex items-center gap-2 px-4 py-3 border-b  
      border-gray-200 dark:border-purple-500 hover:bg-cyan-200 dark:hover:bg-purple-500 transition-colors cursor-pointer rounded-b-lg"
          onClick={toggleDarkMode}
        >
          <BsMoon className="text-white-600 text-lg" />
          <span className="group-hover:text-cyan-600 dark:group-hover:text-white">
            Display
          </span>
        </div>
      </div>

      <div className="flex flex-col grow rounded-lg text-sm">
        <p className="text-slate-400 dark:text-purple-600 font-bold px-2">
          News
        </p>
        <div className="border-b border-gray-200 dark:border-purple-500 mb-2" />
        <Swiper
          initialSlide={1}
          className="w-full grow rounded-lg shadow-lg border border-gray-200 dark:border-purple-500"
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
        >
          {data?.map((item) => {
            return (
              <SwiperSlide
                key={item?.newsTitle}
                className="relative bg-cover bg-center inset-0 bg-sky-300 rounded-lg shrink-0 select-none brightness-90"
                style={{ backgroundImage: `url(${item?.newsImg})` }}
              >
                <div className="absolute text-white bottom-8 left-4">
                  <p>{item?.newsTitle}</p>
                  <button
                    className="bg-cyan-400 dark:bg-purple-500 p-1 rounded text-xs cursor-pointer hover:bg-cyan-500 transition-colors"
                    onClick={() => window.open(`${item?.newsUrl}`)}
                  >
                    Read
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default memo(HomeLeft);
