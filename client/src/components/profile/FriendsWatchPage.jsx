import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FriendsWatchPage = () => {
  const {
    user: { user },
  } = useSelector((state) => state);
  return (
    <div className="flex flex-col p-4 mx-auto rounded bg-slate-200 dark:bg-gray-900 w-[1050px] gap-2">
      <p className="font-bold text-xl">Friends</p>
      <div className="grid grid-cols-2 gap-2">
        {user?.friends?.map((item) => (
          <div
            key={item._id}
            className="flex gap-2 rounded border border-white items-center h-24 p-2"
          >
            <Link
              to={`/profile?id=${item?.userID}`}
              className="bg-cover bg-center w-20 h-20 border border-gray-300 rounded hover:brightness-75"
              style={{ backgroundImage: `url(${item?.avatar})` }}
            />
            <div>
              <Link
                to={`/profile?id=${item?.userID}`}
                className="font-bold hover:text-cyan-500 transition-colors"
              >
                {item?.firstName} {item?.lastName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsWatchPage;
