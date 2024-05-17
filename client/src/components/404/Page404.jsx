import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../asset/404.json";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Player
          autoplay={true}
          loop={true}
          src={animationData}
          style={{ width: "800px" }}
        />
        <p className="text-lg mt-4">
          Return to{" "}
          <Link to="/" className="text-sky-400 cursor-pointer hover:underline">
            home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page404;
