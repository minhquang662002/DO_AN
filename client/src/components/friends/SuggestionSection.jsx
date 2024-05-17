import InfiniteScroll from "react-infinite-scroll-component";
import { useGetSuggestionsQuery } from "../../redux/services/friendRequest.service";
import { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import { useSelector } from "react-redux";

const SuggestionSection = () => {
  const { auth } = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const { data = [] } = useGetSuggestionsQuery(auth?.token && page, {
    skip: !auth?.token || page >= 4,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data?.data?.suggestions.length) {
      setSuggestions((state) => [...state, ...data?.data?.suggestions]);
    }
  }, [data?.data?.suggestions]);

  return (
    <InfiniteScroll
      dataLength={suggestions?.length}
      next={() => setPage((state) => state + 1)}
      hasMore={page <= 4}
      style={{ overflow: "unset auto" }}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="flex flex-col md:grid grid-cols-4 gap-2 mt-2">
        {suggestions?.map((item) => (
          <FriendCard key={item?._id} item={item} type="suggest" />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SuggestionSection;
