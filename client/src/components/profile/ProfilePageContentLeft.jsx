import { MdAlternateEmail } from "react-icons/md";
import { BiCake } from "react-icons/bi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePageContentLeft = () => {
  const [searchParams] = useSearchParams();
  const {
    user: { user },
  } = useSelector((state) => state);
  return (
    <div
      className="flex flex-col gap-2 basis-2/5 
[&>div]:bg-white dark:[&>div]:bg-slate-900 [&>div]:rounded-lg [&>div]:p-4 [&>div]:shadow-lg [&>div]:border [&>div]:border-gray-200 dark:[&>div]:border-purple-500"
    >
      <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-2">
        <h2 className="text-xl font-bold mb-4">Intro</h2>
        <div>
          <MdAlternateEmail className="text-lg text-sky-600" />
          {user?.email}
        </div>
        <div>
          <BiCake className="text-lg text-pink-500" />
          {dayjs(user?.birthday).format("DD/MM/YYYY")}
        </div>
      </div>

      {/* <div className="hidden md:block">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Photos</h2>
          <p className="text-sky-500">See all photos</p>
        </div>
        <div className="grid grid-cols-3 gap-2 h-[250px]">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={`${borderCheck(item)} bg-gray-200`} />
          ))}
        </div>
      </div> */}

      <div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          <Link
            to={`/profile?id=${searchParams.get("id")}&sk=friends`}
            className="text-sky-500 dark:text-purple-500 cursor-pointer"
          >
            See all friends
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {user?.friends?.slice(0, 5).map((item) => (
            <div key={item?.userID} className="flex flex-col gap-1">
              <Link
                className="rounded-lg border border-gray-200 dark:border-purple-500"
                to={`/profile?id=${item?.userID}`}
              >
                <img
                  className="w-full rounded-lg hover:brightness-90 transition h-28"
                  src={item?.avatar}
                  alt="user_friend"
                />
              </Link>

              <Link
                className="text-sm whitespace-nowrap hover:underline"
                to={`/profile?id=${item?.userID}`}
              >
                {item?.firstName} {item?.lastName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContentLeft;
