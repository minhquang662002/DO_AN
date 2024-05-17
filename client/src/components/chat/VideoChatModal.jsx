import { useContext, useState } from "react";
import { PeerContext } from "../context/PeerContext";
import { useSelector } from "react-redux";

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";
import { FaPhoneSlash } from "react-icons/fa";
import { useEffect } from "react";
import { useSendMessageMutation } from "../../redux/services/message.service";

const VideoChatModal = ({ user }) => {
  const { userVideo, myVideo, callTarget, call, leaveCall } =
    useContext(PeerContext);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    setInterval(() => setTimer((state) => state + 1), 1000);
  }, []);

  const [micToggle, setMicToggle] = useState(true);
  const [camToggle, setCamToggle] = useState(true);
  const [sendMessage] = useSendMessageMutation();
  const { socket } = useSelector((state) => state);

  return (
    <div className="flex flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black">
      <video
        playsInline
        autoPlay
        muted
        className="w-48 border border-gray-600 absolute top-12 right-4 rounded-lg"
        ref={myVideo}
      />

      <div>
        <video
          playsInline
          autoPlay
          ref={userVideo}
          className="h-[600px] object-cover"
        />
      </div>

      <div className="flex justify-center bg-gray-800 p-2 items-center gap-4">
        <div
          className={`flex justify-center items-center w-8 h-8 rounded-full text-white cursor-pointer ${
            camToggle ? "bg-gray-700" : "bg-gray-300"
          }`}
          onClick={() => {
            setCamToggle((state) => !state);
            socket.socket.invoke("HideCam", user.userID);
          }}
        >
          {camToggle ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
        </div>
        <div
          className="flex justify-center items-center w-12 h-12 bg-red-500 text-white rounded-full"
          onClick={() => {
            sendMessage({
              data: {
                call: {
                  type: "video",
                  timer,
                },
              },
              receiver: callTarget ? callTarget.userID : user?.userID,
              sender: callTarget ? user?.userID : call.from.userID,
              type: "single",
            });

            leaveCall(callTarget ? callTarget.userID : call.from.userID);
          }}
        >
          <FaPhoneSlash />
        </div>
        <div
          className={`flex justify-center items-center w-8 h-8 rounded-full text-white cursor-pointer ${
            micToggle ? "bg-gray-700" : "bg-gray-300"
          }`}
          onClick={() => {
            setMicToggle((state) => !state);
            socket.socket.invoke("HideMic", user.userID);
          }}
        >
          {micToggle ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>
    </div>
  );
};

export default VideoChatModal;
