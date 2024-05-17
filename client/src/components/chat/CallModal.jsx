import { FaPhoneSlash } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";
import { PeerContext } from "../context/PeerContext";
import { useSendMessageMutation } from "../../redux/services/message.service";

const CallModal = ({
  callTarget,
  call,
  answerCall,
  leaveCall,
  type,
  user,
  callAccepted,
}) => {
  const { userVideo } = useContext(PeerContext);
  const [timer, setTimer] = useState(0);
  const [sendMessage] = useSendMessageMutation();
  useEffect(() => {
    if (callAccepted) {
      setInterval(() => setTimer((state) => state + 1), 1000);
    }
  }, [callAccepted]);
  return (
    <div className="fixed flex flex-col items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-120 bg-white dark:bg-slate-900 border dark:border-purple-500 z-50 rounded-lg text-black dark:text-white">
      <div
        className="w-24 h-24 rounded-full border border-gray-300 dark:border-purple-500 bg-cover bg-center mx-auto my-4"
        style={{
          backgroundImage: `url(${
            callTarget ? callTarget?.avatar : call?.from.avatar
          })`,
        }}
      />
      <p className="font-bold text-center">
        {callTarget
          ? `${callTarget?.firstName} ${callTarget?.lastName}`
          : `${call?.from.firstName} ${call?.from.lastName}`}
      </p>
      {type ? (
        <div>
          {timer}
          <audio ref={userVideo} autoPlay playsInline />
        </div>
      ) : (
        <p className="text-sm">
          Calling <span className="animate-ping">.</span>
          <span className="animate-ping">.</span>
          <span className="animate-ping">.</span>
        </p>
      )}
      {callTarget ? (
        <button
          className="mt-auto mb-8 flex justify-center items-center w-14 h-14 bg-red-500 rounded-full"
          onClick={() => {
            if (callAccepted) {
              sendMessage({
                data: {
                  call: {
                    type: "audio",
                    timer,
                  },
                },
                receiver: callTarget ? callTarget.userID : user?.userID,
                sender: callTarget ? user?.userID : call.from.userID,
                type: "single",
              });
            }
            leaveCall(callTarget.userID);
          }}
        >
          <FaPhoneSlash className="text-lg" />
        </button>
      ) : (
        <div className="flex gap-2 mt-auto mb-8 ">
          {!type && (
            <button
              className="flex justify-center items-center w-14 h-14 bg-green-500 rounded-full"
              onClick={() => answerCall()}
            >
              <BsFillTelephoneFill className="text-lg text-white" />
            </button>
          )}
          <button
            className="flex justify-center items-center w-14 h-14 bg-red-500 rounded-full"
            onClick={() => {
              if (callAccepted) {
                sendMessage({
                  data: {
                    call: {
                      type: "audio",
                      timer,
                    },
                  },
                  receiver: callTarget ? callTarget.userID : user?.userID,
                  sender: callTarget ? user?.userID : call.from.userID,
                  type: "single",
                });
              }
              leaveCall(call.from.userID);
            }}
          >
            <FaPhoneSlash className="text-xl text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CallModal;
