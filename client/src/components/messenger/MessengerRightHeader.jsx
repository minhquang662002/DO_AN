import { IoIosCall, IoIosVideocam } from "react-icons/io";
import { PeerContext } from "../context/PeerContext";
import { useContext } from "react";

const MessengerRightHeader = ({ selectedConver }) => {
  const { callUser, setCallTarget } = useContext(PeerContext);
  return (
    <div className="flex items-center justify-between p-2 border-b border-cyan-500 dark:border-purple-500">
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-full border border-gray-300 bg-cover"
          style={{
            backgroundImage: `url(${
              selectedConver?.avatar || selectedConver?.target?.avatar
            })`,
          }}
        />
        <p>
          {selectedConver?.name ||
            `${selectedConver?.target?.firstName} ${selectedConver?.target?.lastName}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <IoIosCall className="text-2xl hover:text-green-400 cursor-pointer" />
        <IoIosVideocam
          className="text-2xl hover:text-blue-400 cursor-pointer"
          onClick={() => {
            callUser(selectedConver.target?._id);
            setCallTarget(selectedConver?.target);
          }}
        />
      </div>
    </div>
  );
};

export default MessengerRightHeader;
