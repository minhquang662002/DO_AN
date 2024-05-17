import { getFilmDetail, getSimiliar } from "../../../../utils/constants";
import MovieSideBar from "../../components/watch/MovieSideBar";
import { useContext, useRef, useEffect, useState } from "react";
// import CommentSection from "../../../components/watch/comment/CommentSection";
import { useParams } from "react-router-dom";
const MovieDetaiWatch = (props) => {
  const videoRef = useRef();
  const { id, media_type } = useParams();
  const [filmData, setFilmInfo] = useState(null);
  const [similiar, setSimiliar] = useState(null);

  useEffect(() => {
    async function getData() {
      const { props } = await getFilmDetail("movie", id);
      const similiar = await getSimiliar("movie", id);
      setFilmInfo(props);
      setSimiliar(similiar);
    }
    getData();
  });

  return (
    <>
      <div className="p-10">
        <div className="lg:flex gap-x-10 font-sora">
          <div className="flex flex-col flex-grow">
            <iframe
              ref={videoRef}
              allowFullScreen
              src={`https://www.2embed.cc/embed/tmdb/movie?id=${id}`}
              className="w-full lg:h-full"
            />
            <div className="my-4">
              <h1 className="font-sans text-xl lg:text-3xl">
                {filmData?.filmData?.title}
              </h1>
              <i className="text-xs lg:text-base">
                {filmData?.filmData?.tagline}
              </i>
              <div className="flex gap-x-1">
                {filmData?.filmData?.genres?.map((item) => (
                  <span
                    className="mt-2 mb-4 text-xs lg:text-sm px-2 py-1 text-center whitespace-nowrap border border-white rounded-full"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <p className="text-sm lg:text-base">
                {filmData?.filmData?.overview}
              </p>
            </div>
          </div>

          <div className="lg:w-1/4 lg:shrink-0">
            <MovieSideBar similiar={similiar} />
          </div>
        </div>
        <CommentSection user={user} id={id} media_type="movie" />
      </div>
    </>
  );
};

export default MovieDetaiWatch;
