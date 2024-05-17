import { AiFillLike } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

const PostBody = ({ item, setShowComments }) => {
  return (
    <div className="text-sky-900 dark:text-stone-200 px-3 py-2">
      <p>{item?.text}</p>
      {(item?.images?.length > 0 || item?.videos?.length) > 0 && (
        <Swiper
          className="min-h-120 w-full grow rounded-lg shadow-lg border border-gray-200 dark:border-purple-500 bg-black mt-2"
          slidesPerView={1}
          // loop={true}
          pagination={{
            clickable: true,
          }}
        >
          {[...item?.images, ...item?.videos]?.map((item) => {
            return (
              <SwiperSlide className="my-auto" key={item}>
                {item?.includes("image") ? (
                  <img className="w-full" src={item} alt="post_img" />
                ) : (
                  <video
                    className="flex "
                    src={item}
                    autoPlay={true}
                    controls
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {(item?.comments > 0 || item?.likes?.length > 0) && (
        <div className="flex items-center justify-between">
          {item?.likes?.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full text-white">
                <AiFillLike className="w-3 h-3" />
              </div>
              <span>{item?.likes.length}</span>
            </div>
          )}
          <div className="flex gap-2 text-xs mt-4 ml-auto cursor-pointer hover:underline">
            {item?.comments > 0 && (
              <p onClick={() => setShowComments((state) => !state)}>
                {item.comments} comments
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostBody;
