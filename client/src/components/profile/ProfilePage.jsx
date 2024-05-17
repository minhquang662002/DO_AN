import ProfileButton from "./ProfileButton";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/services/profile.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilePageContent from "./ProfilePageContent";
import { resetPostState } from "../../redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
const ProfilePage = () => {
  const {
    user: { user },
    auth,
  } = useSelector((state) => state);
  const [searchParams] = useSearchParams();
  const { isFetching } = useGetProfileQuery(`${searchParams.get("id")}`, {
    skip: !auth.token,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetPostState());
    };
  }, [dispatch, searchParams]);
  return (
    <>
      <Helmet>
        <title>
          {user ? `${user?.firstName} ${user?.lastName}` : ""} | UniSocial
        </title>
      </Helmet>
      <div className="flex flex-col gap-6 flex-grow items-center dark:text-white">
        <div className="w-full shadow bg-white dark:bg-slate-900">
          <div className="w-full md:max-w-[1050px] mx-auto">
            {isFetching ? (
              <div
                className={`w-full h-56 md:h-96 rounded-b-lg ${
                  isFetching ? "bg-gray-500 animate-pulse" : ""
                }`}
              />
            ) : (
              <div
                className={`w-full h-56 md:h-96 bg-cover bg-center rounded-b-lg ${
                  isFetching ? "bg-gray-500 animate-pulse" : ""
                }`}
                style={{ backgroundImage: `url(${user?.background})` }}
              />
            )}
            <div className="flex flex-col md:flex-row justify-between -mt-16 md:-mt-8 mx-4 ">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex justify-center items-center md:border-4 md:border-white rounded-full">
                  <div
                    className={`w-36 h-36 bg-cover bg-center border border-gray-200 rounded-full ${
                      isFetching ? "animate-pulse bg-gray-300" : ""
                    }`}
                    style={{ backgroundImage: `url(${user?.avatar})` }}
                  />
                </div>

                <div className="flex flex-col text-center md:text-left md:justify-end">
                  <h2 className="text-lg md:text-3xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {user?.friends?.length || 0} friends
                  </p>
                  <div className="flex flex-row-reverse justify-center md:justify-end mb-2">
                    {user?.friends?.slice(0, 7).map((item) => (
                      <img
                        key={item?._id}
                        src={item?.avatar}
                        className={`w-8 h-8 bg-cover bg-center border border-gray-300 rounded-full -ml-2`}
                        alt="test"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {!isFetching ? (
                <ProfileButton user={user} auth={auth} />
              ) : (
                <div
                  className="flex gap-4 justify-center md:justify-end items-end 
                  [&>div]:flex [&>div]:gap-2 [&>div]:items-center 
                  [&>div]:transition-colors [&>div]:rounded-lg [&>div]:px-4 [&>div]:py-2"
                >
                  <div className="w-12 h-6 animate-pulse bg-slate-300" />
                  <div className="w-12 h-6 animate-pulse bg-slate-300" />
                </div>
              )}
            </div>
            <div className="flex gap-2 text-sm border-t border-gray-300 mt-8 p-2">
              <Link
                to={`/profile?id=${searchParams.get("id")}`}
                className={`${searchParams.get("sk") ? "" : "text-cyan-500"}`}
              >
                Posts
              </Link>
              <Link
                to={`/profile?id=${searchParams.get("id")}&sk=friends`}
                className={`${searchParams.get("sk") ? "text-cyan-500" : ""}`}
              >
                Friends
              </Link>
            </div>
          </div>
        </div>

        <ProfilePageContent searchParams={searchParams} />
      </div>
    </>
  );
};

export default ProfilePage;
