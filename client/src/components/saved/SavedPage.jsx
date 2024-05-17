import { useGetSavedPostQuery } from "../../redux/services/post.service";
import { useEffect } from "react";
import { resetPostState } from "../../redux/slices/postSlice";
import EmptyPost from "../404/EmptyPost";
import { useDispatch, useSelector } from "react-redux";
const SavedPage = () => {
  const dispatch = useDispatch();
  const {
    auth: { token },
    post: { posts },
  } = useSelector((state) => state);
  useGetSavedPostQuery(null, { skip: !token, refetchOnMountOrArgChange: true });

  useEffect(() => {
    return () => {
      dispatch(resetPostState());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 w-full md:w-2/5 grow p-4 mx-auto">
      <p className="font-bold text-2xl border-b border-gray-300 dark:text-white">
        Saved posts
      </p>
      {posts.length > 0 ? (
        posts?.map((item) => <Post key={item._id} item={item} type="saved" />)
      ) : (
        <EmptyPost />
      )}
    </div>
  );
};

export default SavedPage;
