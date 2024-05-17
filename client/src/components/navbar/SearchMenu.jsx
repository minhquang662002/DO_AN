import { useDebounce } from "../../hooks/hooks";
import { useSearchUserQuery } from "../../redux/services/profile.service";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

const SearchMenu = ({ setIsShowingSearchMenu }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data } = useSearchUserQuery(
    { q: debouncedSearchTerm, limit: 10 },
    { skip: !debouncedSearchTerm }
  );
  return (
    <div className="lg:hidden flex flex-col fixed top-0 left-0 w-full h-full bg-white z-50 dark:bg-slate-800">
      <div className="flex px-2 py-1 items-center gap-2">
        <BsArrowLeft onClick={() => setIsShowingSearchMenu(false)} />
        <div className="flex items-center grow bg-slate-200 dark:bg-slate-700 rounded-full p-1">
          <input
            autoFocus
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            className={`outline-none bg-slate-200 dark:bg-slate-700 transition grow text-sm mx-2`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="border-b border-gray-400" />
      <div className="p-2">
        <p>Search result: </p>
        {data?.map((item) => (
          <Link
            to={`/profile?id=${item?._id}`}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-sky-300 dark:hover:bg-purple-500"
            onClick={() => setIsShowingSearchMenu(false)}
            key={item?._id}
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
    </div>
  );
};

export default SearchMenu;
