import { useState, useEffect } from "react";
import { TMDB_imageResize } from "../../utils/constant";
const TVSideBar = ({ seasonsList, ep, season, id }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected({ ep: Number(ep), season: Number(season) });
  }, [ep, season]);

  return (
    <>
      <p className="uppercase font-bold">Seasons</p>
      <div className="flex flex-col rounded-lg">
        {seasonsList.map((item) => {
          return (
            <div key={item.id}>
              <div
                className="relative flex p-2 gap-x-4 group cursor-pointer"
                onClick={() => {
                  setSelected((state) => ({
                    ...state,
                    season:
                      item.season_number !== state.season
                        ? item.season_number
                        : -1,
                  }));
                }}
              >
                <div
                  className={`absolute bg-cover inset-0 blur-layer-right rounded-lg ${
                    selected?.season === item.season_number
                      ? "!brightness-50"
                      : "group-hover:brightness-50"
                  }`}
                  style={{
                    backgroundImage: `url(${TMDB_imageResize(
                      "original",
                      item.poster_path
                    )})`,
                  }}
                />
                <div className="overflow-hidden">
                  <Image
                    className="shrink-0  rounded-lg group-hover:scale-125 transition"
                    src={TMDB_imageResize("w500", item.poster_path)}
                    width={100}
                    height={150}
                  />
                </div>

                <div
                  className={`!brightness-100 ${
                    selected?.season === item.season_number
                      ? "text-red-600"
                      : "group-hover:text-red-600"
                  }`}
                >
                  <p className="font-bold text-sm md:text-lg">{item.name}</p>
                  <p className="text-xs md:text-sm">
                    {item.episodes.length} episodes
                  </p>
                </div>
              </div>
              <div
                className={`${
                  selected?.season === item.season_number ? "h-96" : "h-0"
                } overflow-y-scroll flex flex-col gap-y-4 my-4 transition-all`}
              >
                {item.episodes.map((eps) => (
                  <Link
                    href={`/tv/${id}/watch?season=${item.season_number}&ep=${eps.episode_number}`}
                    key={eps.id}
                  >
                    <div
                      className={`flex gap-x-2 p-2 ${
                        season == item.season_number && ep == eps.episode_number
                          ? "text-red-600"
                          : "hover:bg-gray-800 hover:text-red-600 cursor-pointer"
                      }`}
                    >
                      <Image
                        className="rounded-lg shrink-0"
                        src={TMDB_imageResize("w500", eps.still_path)}
                        width={150}
                        height={100}
                      />
                      <div className="text-sm w-36">
                        <p>Ep {eps.episode_number}:</p>
                        <p className="text-xs">{eps.name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TVSideBar;
