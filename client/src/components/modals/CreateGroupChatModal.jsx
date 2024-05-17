import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/hooks";
import { useCreateGroupChatMutation } from "../../redux/services/message.service";
import { handleCreateGroupChat } from "../../utils/fn";
const CreateGroupChatModal = ({ setShowModal, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    avatar: null,
    members: [],
  });
  const modalRef = useRef();
  const [createGroup] = useCreateGroupChatMutation();

  const {
    auth: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    setSearchedList(
      user?.friends?.filter(
        (item) =>
          item?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, user]);

  useClickOutside(modalRef, () =>
    setShowModal((state) => ({ ...state, create_group: false }))
  );

  const handleSelect = (target) => {
    if (groupInfo.members.some((item) => item._id === target._id)) {
      return;
    }
    setGroupInfo((state) => ({
      ...state,
      members: [target, ...state.members],
    }));
  };

  return (
    <div
      className="flex flex-col w-96 h-[600px] bg-white dark:bg-slate-900 dark:text-white rounded-lg p-2"
      ref={modalRef}
    >
      <div className="text-center font-bold">Create group chat</div>
      <div className="border-b border-gray-300 my-2" />
      <p className="text-sm">Group name: </p>
      <input
        className="bg-slate-200 dark:bg-slate-800 dark:text-white rounded text-sm px-2 py-1 my-2 outline-none"
        placeholder="Enter..."
        value={groupInfo.name}
        onChange={(e) =>
          setGroupInfo((state) => ({ ...state, name: e.target.value }))
        }
      />

      <div>
        <p className="text-sm">Group avatar: </p>
        <div className="relative">
          <label
            htmlFor="file"
            className="block mx-auto my-4 w-24 h-24 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${groupInfo.avatar?.preview})` }}
          />
        </div>
        <input
          className="hidden"
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setGroupInfo((state) => ({
                ...state,
                avatar: Object.assign(e.target.files[0], {
                  preview: URL.createObjectURL(e.target.files[0]),
                }),
              }));
            }
          }}
        />
      </div>

      <div className="text-xs">
        <p className="mr-2 text-sm">Member:</p>
        <div className="flex flex-wrap gap-1">
          {groupInfo.members.map((item) => (
            <div
              key={item?._id}
              className="inline-flex gap-1 items-center p-1 bg-cyan-400 dark:bg-purple-500 text-white rounded"
            >
              <span className="select-none">
                {item?.firstName} {item?.lastName}
              </span>
              <FaTimes
                className="hover:text-red-500 cursor-pointer"
                onClick={() =>
                  setGroupInfo((state) => ({
                    ...state,
                    members: state.members.filter(
                      (selected) => selected?._id !== item?._id
                    ),
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <input
        className="bg-slate-200 dark:bg-slate-800 dark:text-white rounded text-sm px-2 py-1 my-2 outline-none"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-2 text-xs overflow-y-auto pstb my-2">
        {searchedList?.map((item) => (
          <div
            key={item?._id}
            className="flex items-center gap-1 hover:bg-cyan-300 dark:hover:bg-purple-500 hover:text-white transition-colors p-1 rounded-lg cursor-pointer select-none mx-4"
            onClick={() => handleSelect(item)}
          >
            <img
              className="w-8 h-8 bg-cover bg-center rounded-full border border-gray-300"
              src={item?.avatar}
              alt="fr_av"
            />
            <span>
              {item?.firstName} {item?.lastName}
            </span>
          </div>
        ))}
      </div>
      <button
        className={`mt-auto p-1 bg-cyan-400 hover:bg-cyan-500 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded transition-colors`}
        onClick={async () => {
          setLoading(true);
          await handleCreateGroupChat(groupInfo, createGroup);
          setLoading(false);
          setShowModal((state) => ({ ...state, create_group: false }));
        }}
      >
        Create
      </button>
    </div>
  );
};

export default CreateGroupChatModal;
