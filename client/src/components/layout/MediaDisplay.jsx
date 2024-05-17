import { checkType } from "../../utils/fn";

const MediaDisplay = ({ images, videos }) => {
  const imagesLength = images?.length || 0;
  const videosLength = videos?.length || 0;
  const mixed = [...videos, ...images];
  const totalCount = imagesLength + videosLength;
  let display;
  if (totalCount === 1 || totalCount === 2) {
    display = <>{mixed?.map((item) => checkType(item))}</>;
  }
  if (totalCount === 3 || totalCount === 4) {
    display = (
      <div className="mt-4 flex flex-col gap-1">
        {checkType(mixed[0])}
        <div className="flex overflow-x-hidden gap-1">
          {mixed?.slice(1).map((item) => {
            if (typeof item !== "string") {
              if (item?.type?.startsWith("image")) {
                return (
                  <img
                    key={item?.preview}
                    className={`${totalCount === 3 ? "w-1/2" : "w-1/3"}`}
                    src={item?.preview}
                    alt="postcontent"
                  />
                );
              } else {
                return (
                  <video
                    key={item?.preview}
                    className={`${totalCount === 3 ? "w-1/2" : "w-1/3"}`}
                    src={item?.preview}
                    controls
                  />
                );
              }
            } else {
              if (item.includes("image")) {
                return (
                  <img
                    key={item}
                    className={`${totalCount === 3 ? "w-1/2" : "w-1/3"}`}
                    src={item?.preview || item}
                    alt="postcontent"
                  />
                );
              } else {
                return (
                  <video
                    key={item}
                    className={`${totalCount === 3 ? "w-1/2" : "w-1/3"}`}
                    src={item?.preview || item}
                    alt="postcontent"
                    controls
                  />
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
  if (totalCount >= 5) {
    return (
      <div className="mt-4 flex gap-1">
        <div className="flex flex-col gap-1 w-1/2 shrink-0">
          {mixed?.slice(0, 2).map((item) => checkType(item, "grow"))}
        </div>
        <div className="flex flex-col gap-1">
          {mixed?.slice(2, 5).map((item, index) => {
            if (typeof item !== "string") {
              if (item?.type?.startsWith("image")) {
                return (
                  <div key={item?.preview} className="relative">
                    <img src={item?.preview} alt="postcontent"></img>
                    {totalCount > 5 && index === 2 && (
                      <div
                        className="bg-black absolute inset-0 text-white text-3xl flex items-center justify-center"
                        style={{ background: "rgba(0,0,0, 0.4)" }}
                      >
                        <span>+{totalCount - 5}</span>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={item?.preview} className="relative">
                    <video src={item?.preview} alt="postcontent" controls />
                    {totalCount > 5 && index === 2 && (
                      <div
                        className="bg-black absolute inset-0 text-white text-3xl flex items-center justify-center"
                        style={{ background: "rgba(0,0,0, 0.4)" }}
                      >
                        <span>+{totalCount - 5}</span>
                      </div>
                    )}
                  </div>
                );
              }
            } else {
              if (item.includes("image")) {
                return (
                  <div key={item} className="relative">
                    <img src={item} alt="postcontent"></img>
                    {totalCount > 5 && index === 2 && (
                      <div
                        className="bg-black absolute inset-0 text-white text-3xl flex items-center justify-center"
                        style={{ background: "rgba(0,0,0, 0.4)" }}
                      >
                        <span>+{totalCount - 5}</span>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={item} className="relative">
                    <video src={item} alt="postcontent" controls />
                    {totalCount > 5 && index === 2 && (
                      <div
                        className="bg-black absolute inset-0 text-white text-3xl flex items-center justify-center"
                        style={{ background: "rgba(0,0,0, 0.4)" }}
                      >
                        <span>+{totalCount - 5}</span>
                      </div>
                    )}
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
  return <>{display}</>;
};

export default MediaDisplay;
