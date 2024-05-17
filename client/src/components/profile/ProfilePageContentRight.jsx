import PostCreate from "../posts/PostCreate";
import Post from "../posts/Post";
import { useGetUserPostsQuery } from "../../redux/services/post.service";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import EmptyPost from "../404/EmptyPost";
import PostSkeleton from "../skeleton/PostSkeleton";
import { useSelector } from "react-redux";

const ProfilePageContentRight = () => {
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const {
    auth,
    user: { user },
    post: { posts, total },
  } = useSelector((state) => state);
  const { isFetching } = useGetUserPostsQuery(
    { id: searchParams.get("id"), page },
    {
      skip: !auth.token,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="flex flex-col gap-4 basis-3/5 shrink-0 overflow-hidden">
      {user?.userID === auth?.user?.userID && <PostCreate user={auth?.user} />}

      {posts?.length > 0 ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage((state) => state + 1)}
          hasMore={!(page >= Math.floor((total || 0) / 10))}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "unset auto" }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all!</b>
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
  );
};

export default ProfilePageContentRight;
