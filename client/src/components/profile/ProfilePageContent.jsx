import ProfilePageContentLeft from "./ProfilePageContentLeft";
import ProfilePageContentRight from "./ProfilePageContentRight";
import { FC, memo } from "react";
import FriendsWatchPage from "./FriendsWatchPage";

const ProfilePageContent = ({ searchParams }) => {
  return (
    <>
      {searchParams.get("sk") ? (
        <FriendsWatchPage />
      ) : (
        <div className="flex flex-col md:flex-row w-full max-w-[1050px] justify-between gap-4">
          <ProfilePageContentLeft />
          <ProfilePageContentRight />
        </div>
      )}
    </>
  );
};

export default memo(ProfilePageContent);
