import { useState, useEffect } from "react";
import { useGetCurrentWeatherQuery } from "../../redux/services/weather.service";
import { BsWind, BsEye, BsClouds } from "react-icons/bs";
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import dayjs from "dayjs";

const WeatherPage = () => {
  const [userLocation, setUserLocation] = useState(null);
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

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-4">
        <div className="basis-1/4 h-80 border border-gray-300 shadow dark:bg-slate-900 dark:text-white rounded p-4">
          <div
            className="w-24 h-24 bg-center bg-cover"
            style={{
              backgroundImage: `url(${
                data
                  ? `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`
                  : ""
              })`,
            }}
          />

          <p className="font-bold text-4xl">
            {parseInt(data?.main?.temp)}
            <span>&#8451;</span>
          </p>
          <p>{data?.weather[0].description}</p>
          <div className="border-t border-gray-300 my-4" />
          <div className="flex flex-col">
            <small>
              {data?.name}, {data?.sys?.country}
            </small>
            <small>{new Date().toLocaleString()}</small>
          </div>
        </div>

        <div className="flex gap-4 rounded-lg grow">
          <div className="w-full flex flex-col gap-4">
            <div className="basis-1/2 rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Wind Status</p>
              <div className="flex items-center gap-2 text-2xl">
                <BsWind />
                <p>{data?.wind.speed} km/h</p>
              </div>
            </div>
            <div className="grow rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Humidity</p>
              <div className="flex items-center gap-2 text-2xl">
                <WiHumidity />
                <p>{data?.main.humidity} %</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="basis-1/2 rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Sunrise and Sunset</p>
              <div className="flex items-center gap-2 text-2xl">
                <WiSunrise className="w-10 h-10" />
                <p>{dayjs.unix(data?.sys.sunrise).format("LT")}</p>
              </div>
              <div className="flex items-center gap-2 text-2xl">
                <WiSunset className="w-10 h-10" />
                <p>{dayjs.unix(data?.sys.sunset).format("LT")}</p>
              </div>
            </div>
            <div className="grow rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Visibility</p>
              <div className="flex items-center gap-2 text-2xl">
                <BsEye />
                <p>{Number(data?.visibility) / 1000} km</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="basis-1/2 rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Clouds</p>

              <div className="flex items-center gap-2 text-2xl">
                <BsClouds />
                <p>{data?.clouds.all} %</p>
              </div>
            </div>
            <div className="grow rounded-lg border border-gray-300 shadow dark:bg-slate-900 dark:text-white p-2">
              <p>Air Pressure</p>
              <p className="text-2xl">{data?.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
