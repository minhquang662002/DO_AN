import dayjs from "dayjs";
import { FaEllipsisH } from "react-icons/fa";
import PostOptions from "./PostOptions";
import { useState, useRef, useContext, FC } from "react";
import { useClickOutside } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const PostHeader = ({ item, user, type }) => {
  const { setShowModal } = useContext(GlobalContext);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const optionRef = useRef(null);
  useClickOutside(optionRef, () => setShowPostOptions(false));
  return (
    <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-2">
        <Link
          to={`/profile?id=${item?.owner?.userID}`}
          className="w-12 h-12 border border-gray-200 dark:border-purple-500 bg-cover bg-center bg-no-repeat rounded-full"
          style={{ backgroundImage: `url(${item?.owner?.avatar})` }}
        />
        <div className="flex flex-col">
          <Link
            to={`/profile?id=${item?.owner?.userID}`}
            className="text-sky-900 dark:text-stone-200 font-bold cursor-pointer hover:underline"
          >
            {item?.owner?.firstName + " " + item?.owner?.lastName}{" "}
          </Link>
          <p className="text-xs text-gray-500 dark:text-stone-300 cursor-pointer hover:underline">
            {dayjs().from(dayjs(item?.createdAt), true)}
          </p>
        </div>
      </div>
      {(user?.userID === item?.owner?.userID || type) && (
        <div className="relative">
          <div ref={optionRef}>
            <FaEllipsisH
              className="w-8 h-8 dark:text-white cursor-pointer p-2 rounded-full hover:bg-cyan-400 dark:hover:bg-purple-500 hover:text-white transition-colors"
              onClick={() => setShowPostOptions((state) => !state)}
            />
            {showPostOptions && (
              <PostOptions
                item={item}
                type={type}
                setShowPostOptions={setShowPostOptions}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
