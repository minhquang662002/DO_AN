import { TMDB_imageResize } from "../../../../utils/constants";
import { StarIcon, PlayIcon, HeartIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { getFilmDetail, getReviews } from "../../../../utils/constants";
import Review from "../../components/Review";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useCreateNotificationMutation } from "../../../../redux/services/notification.service";
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const [filmData, setFilmInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { id, media_type } = useParams();
  const [createNotification] = useCreateNotificationMutation();
  const sortedReviews = reviews?.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    async function getData() {
      const { props } = await getFilmDetail("movie", id);
      const reviews = await getReviews("movie", id);
      setFilmInfo(props);
      setReviews(reviews);
    }
    getData();
  }, []);

  const recommendForFriends = async (object) => {};

  return (
    <>
      {/* <Head>
        <title>{filmData?.title}</title>
      </Head> */}
      <div className="relative w-full">
        <div
          className="w-full bg-cover brightness-50 layer min-h-[550px] md:min-h-[700px] lg:min-h-[700px]"
          style={{
            backgroundImage: `url(${TMDB_imageResize(
              "original",
              filmData?.filmData?.backdrop_path
            )})`,
          }}
        />
        <div className="absolute top-14 left-8 md:left-12 lg:left-12 text-white">
          <div className="flex max-w-xs md:max-w-3xl lg:max-w-4xl items-center">
            <h1 className="font-bold text-xl md:text-5xl lg:text-6xl font-sans">
              {filmData?.filmData?.title}
            </h1>

            <HeartIcon
              className="w-4 h-4 lg:h-8 lg:w-8 text-red-600 cursor-pointer transition-colors"
              onClick={() =>
                createNotification({
                  receiver:
                    user?.friends?.length > 0
                      ? user.friends.map((x) => x.userID).join(",")
                      : null,
                  text: `recommend you watching <b>${filmData?.filmData?.title}</b>`,
                  url: `${location.pathname}`,
                })
              }
            />
          </div>
          <div className="flex gap-x-2 font-sora my-4 flex-wrap">
            {filmData?.genres?.map((item) => {
              return (
                <a
                  href={`/genre/${media_type}/${item?.id}?page=1`}
                  key={item?.id}
                >
                  <div className=" md:text-base lg:text-base cursor-pointer transition hover:text-red-600 hover:border-red-600 font-bold text-sm border-white border-2 py-1 px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 rounded-3xl text-center whitespace-nowrap">
                    {item?.filmData?.name}
                  </div>
                </a>
              );
            })}
          </div>
          <p className="text-xs md:text-base lg:text-base font-sora max-w-xs md:max-w-2xl lg:max-w-2xl my-2">
            {filmData?.filmData?.overview}
          </p>
          <div className="flex items-center gap-x-2">
            <StarIcon className="h-6 text-red-600 border border-red-600 rounded-full p-1" />
            <p>
              <span className="font-bold text-xs md:text-3xl lg:text-3xl text-red-600 mt-2">
                {filmData?.filmData?.vote_average?.toFixed(1)}
              </span>
              <sub>/ 10</sub>
            </p>
            <span>({filmData?.filmData?.vote_count} votes)</span>
          </div>
          <a href={`${location.pathname}/watch`}>
            <div className="md:hidden lg:hidden bg-red-600 rounded-full text-xs font-bold w-24 h-8 flex items-center justify-center gap-x-1 my-4">
              <PlayIcon className="w-4 h-4" />
              <span>Play now</span>
            </div>
          </a>

          <div className="max-w-xs md:max-w-2xl lg:max-w-2xl">
            <h2 className="font-sora text-2xl text-white my-8">Cast</h2>
            <Swiper slidesPerView="auto" slidesPerGroupAuto spaceBetween={20}>
              {filmData?.castData?.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="!w-[50px] md:!w-[100px] lg:!w-[100px] select-none"
                  >
                    <a
                      href={`https://en.wikipedia.org/wiki/${item?.name?.replace(
                        " ",
                        "_"
                      )}`}
                    >
                      <img
                        className="rounded-lg"
                        width={100}
                        height={150}
                        src={TMDB_imageResize("original", item?.profile_path)}
                      />
                      <p className="text-xs md:text-sm lg:text-sm">
                        {item?.name}
                      </p>
                    </a>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <a href={`${location.pathname}/watch`}>
          <div className="hidden absolute top-48 right-32 text-white md:flex lg:flex flex-col items-center gap-y-4 hover:text-red-600 transition-colors">
            <PlayIcon className="transform w-20 h-20 cursor-pointer" />
            <p className="font-bold font-sora text-lg uppercase">Play now</p>
          </div>
        </a>
      </div>
      {sortedReviews?.length > 0 && (
        <div className="my-4 px-8 md:px-10 lg:px-10">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-3xl underline decoration-red-600 decoration-4">
            Reviews
          </h2>
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-4 lg:items-start">
            {sortedReviews?.map((item) => (
              <Review key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
