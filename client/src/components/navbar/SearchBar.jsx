import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { useDebounce, useClickOutside } from "../../hooks/hooks";
import SearchedList from "./SearchedList";
import { useLocation } from "react-router-dom";
import { useSearchUserQuery } from "../../redux/services/profile.service";

const SearchBar = () => {
  const { pathname, search } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data } = useSearchUserQuery(
    { q: debouncedSearchTerm, limit: 10 },
    { skip: !debouncedSearchTerm }
  );
  const searchRef = useRef(null);

  useEffect(() => {
    return () => {
      setSearchOpen(false);
      setSearchTerm("");
    };
  }, [pathname, search]);

  useClickOutside(searchRef, () => {
    setSearchOpen(false);
    setSearchTerm("");
  });

  return (
    <div ref={searchRef}>
      <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full">
        <div
          className={`flex items-center justify-center rounded-full shrink-0 ${
            searchOpen
              ? ""
              : "border border-gray-300 dark:border-purple-500 bg-white cursor-pointer dark:bg-slate-800 dark:hover:bg-purple-500 hover:bg-gray-100"
          } h-10 w-10`}
          onClick={() => setSearchOpen(true)}
        >
          <BiSearch className="h-5 w-5" />
        </div>

        <input
          autoFocus
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          className={`outline-none bg-slate-100 dark:bg-slate-800 rounded-full transition-all ${
            searchOpen
              ? "w-32 text-xs md:text-base md:w-48 px-2"
              : "invisible w-0"
          }`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchOpen && debouncedSearchTerm && data?.data?.users?.length > 0 && (
        <SearchedList searchedList={data?.data?.users} />
      )}
    </div>
  );
};

export default SearchBar;
