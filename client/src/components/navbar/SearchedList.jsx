import { Link } from "react-router-dom";
import { FC } from "react";

const SearchedList = ({ searchedList }) => {
  return (
    <div className="absolute w-full md:w-auto left-0 md:left-12 top-full mt-2 min-w-[300px] bg-white dark:bg-slate-900 dark:text-white rounded-lg shadow p-2 text-sm z-20 border border-gray-200 dark:border-purple-500">
      <h2 className="font-bold">Results:</h2>

      {searchedList?.map((item) => (
        <Link
          to={`/profile?id=${item?.userID}`}
          className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-sky-300 dark:hover:bg-purple-500"
          key={item?.userID}
        >
          <img
            className="w-10 h-10 rounded-full border border-gray-300"
            src={item?.avatar}
            alt="user avatar"
          />
          <div>
            <p>
              {item?.firstName} {item?.lastName}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchedList;
