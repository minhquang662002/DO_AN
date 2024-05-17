import { BsPlus } from "react-icons/bs";
import ContactUser from "./ContactUser";
import { useContext, useEffect, useMemo, memo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useGetGroupConversationsQuery } from "../../redux/services/message.service";
import { useGetCurrentWeatherQuery } from "../../redux/services/weather.service";
import { useSelector } from "react-redux";

const HomeRight = ({ user }) => {
  const { setShowModal, userLocation, setUserLocation } =
    useContext(GlobalContext);
  const {
    auth: { token },
    message: { groups },
  } = useSelector((state) => state);

  const displayBg = useMemo(() => {
    const morning = [
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521613/unisocial/morning_1_mfyypo.jpg",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/morning_4_bbc4ko.jpg",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521607/unisocial/morning_3_xxxjhf.webp",
    ];
    const noon = [
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/noon_2_qgofbs.png",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521609/unisocial/noon_4_syknvx.jpg",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/noon_5_of8slv.png",
    ];
    const night = [
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/night_3_u28kvw.jpg",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/night_1_igiuol.jpg",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521608/unisocial/night_4_xp3rrq.png",
      "https://res.cloudinary.com/dd0w757jk/image/upload/v1659521610/unisocial/night_2_a4kjh6.png",
    ];
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime <= 12) {
      return morning[Math.floor(Math.random() * morning.length)];
    }
    if (currentTime > 12 && currentTime < 19) {
      return noon[Math.floor(Math.random() * noon.length)];
    }
    if (currentTime >= 19 || currentTime < 6) {
      return night[Math.floor(Math.random() * night.length)];
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
    );
  }, [setUserLocation]);

  const { data } = useGetCurrentWeatherQuery(
    {
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    },
    { skip: !userLocation }
  );

  useGetGroupConversationsQuery(null, { skip: !token });
  return (
    <>
      <p className="text-sm text-slate-400 dark:text-white font-bold px-2">
        Weather today
      </p>
      <div className="my-4 h-[150px] relative text-white">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg brightness-50"
          style={{ backgroundImage: `url(${displayBg})` }}
        />
        <div className="flex items-center justify-evenly w-full gap-2 absolute top-1/2 -translate-y-1/2 p-2 h-full">
          <div className="mb-auto">
            <p className="font-bold text-lg">{data?.name}</p>
            <p className="font-bold text-sm">{data?.sys?.country}</p>
          </div>
          <p className="font-bold text-4xl">
            {parseInt(data?.main?.temp)}
            <span>&#8451;</span>
          </p>
          <div className="mt-auto text-center">
            <div
              className="w-10 h-10 bg-center bg-contain"
              style={{
                backgroundImage: `url(${
                  data
                    ? `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`
                    : ""
                })`,
              }}
            />
            <p className="font-bold">{data?.weather?.[0].main}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-400 dark:text-white font-bold px-2">
        Contacts
      </p>
      <div className="border-b border-gray-200 dark:border-purple-500 mb-2" />
      {user?.friends?.map((item) => (
        <ContactUser key={item.userID} item={item} type="single" />
      ))}
      <p className="text-sm text-slate-400 font-bold px-2">
        Group conversations
      </p>
      {groups?.map((item) => (
        <ContactUser key={item?.userID} item={item} type="group" />
      ))}
      <div
        className="flex gap-2 items-center font-bold hover:bg-cyan-400 dark:hover:bg-purple-500 hover:text-white transition-colors rounded-lg p-2 cursor-pointer"
        onClick={() =>
          setShowModal((state) => ({ ...state, create_group: true }))
        }
      >
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-300 dark:bg-purple-500">
          <BsPlus className="text-xl" />
        </div>
        <p>Create group chat</p>
      </div>
    </>
  );
};

export default memo(HomeRight);
