import animationData from "../../asset/loading.json";
import { Player } from "@lottiefiles/react-lottie-player";
const LoadingLayout = () => {
  return (
    <div className="fixed w-screen h-screen" style={{ zIndex: 1000 }}>
      <div className="absolute inset-0 bg-black opacity-80" />
      <Player
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        autoplay={true}
        loop={true}
        src={animationData}
        style={{ width: "400px" }}
      />
    </div>
  );
};

export default LoadingLayout;
