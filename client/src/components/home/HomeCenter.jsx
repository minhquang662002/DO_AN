import { useState } from "react";
import Post from "../posts/Post";
import PostCreate from "../posts/PostCreate";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPost from "../404/EmptyPost";
import PostSkeleton from "../skeleton/PostSkeleton";
import { useGetPublicPostsQuery } from "../../redux/services/post.service";
import { useSelector } from "react-redux";

const HomeCenter = ({ user, token }) => {
  const [page, setPage] = useState(0);
  const { isFetching } = useGetPublicPostsQuery(page, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });
  const { posts, total } = useSelector((state) => state.post);

  return (
    <>
      <div className="flex flex-col w-full md:basis-4/6 gap-10 mt-8 overflow-x-hidden">
        <PostCreate user={user} />

        {posts?.length > 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage((state) => state + 1)}
            hasMore={!(page >= Math.floor((total || 0) / 10))}
            style={{ overflow: "unset auto" }}
            loader={<div className="w-32 h-32 bg-black" />}
            endMessage={
              <p className="justify-center text-center text-sm font-bold">
                You have seen it all
              </p>
            }
          >
            {posts?.map((item) => (
              <Post key={item?.postID} item={item} />
            ))}
          </InfiniteScroll>
        ) : (
          !isFetching && <EmptyPost />
        )}
        {isFetching && [1, 2, 3].map((item) => <PostSkeleton key={item} />)}
      </div>
    </>
  );
};

export default HomeCenter;
