import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/hooks";
import {
  useAddMemberMutation,
  useRemoveGroupChatMemberMutation,
} from "../../redux/services/message.service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoPersonRemoveOutline } from "react-icons/io5";

const GroupSettingsModal = ({ setShowModal, showModal }) => {
  const {
    auth: { user },
  } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [addMember] = useAddMemberMutation();
  const [removeMember] = useRemoveGroupChatMemberMutation();
  const modalRef = useRef();
  const [selectedUser, setSelectedUser] = useState([]);
  const handleSelect = (target) => {
    if (selectedUser.some((item) => item._id === target._id)) {
      return;
    }
    setSelectedUser((state) => [target, ...state]);
  };
  useEffect(() => {
    setSearchedList(
      user?.friends
        ?.filter((ini) => {
          return !showModal?.group_settings?.receiver?.some(
            (old) => old._id === ini._id
          );
        })
        .filter(
          (item) =>
            item?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, user, showModal?.group_settings?.receiver]);

  useClickOutside(modalRef, () =>
    setShowModal((state) => ({ ...state, group_settings: false }))
  );

  let cmp;
  if (showModal?.group_settings?.option === "member") {
    cmp = (
      <>
        {showModal?.group_settings?.receiver?.map((item) => (
          <div
            key={item?._id}
            className="relative hover:bg-cyan-400 dark:hover:bg-purple-500 rounded"
          >
            <Link
              to={`/profile?id=${item?._id}`}
              className="flex items-center gap-2 text-sm p-1"
            >
              <img
                className="w-8 h-8 rounded-full border border-gray-300"
                src={item?.avatar}
                alt="avt"
              />
              <p>
                {item?.firstName} {item?.lastName}
              </p>
            </Link>
            {showModal?.group_settings?.admin !== item?._id && (
              <IoPersonRemoveOutline
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:text-red-500"
                onClick={() => {
                  removeMember({
                    groupID: showModal.group_settings._id,
                    memberID: item._id,
                    adminID: showModal.group_settings.admin,
                  });
                  setShowModal((state) => ({
                    ...state,
                    group_settings: {
                      ...state.group_settings,
                      receiver: state.group_settings.receiver.filter(
                        (rec) => rec._id !== item._id
                      ),
                    },
                  }));
                }}
              />
            )}
          </div>
        ))}
      </>
    );
  } else {
    cmp = (
      <>
        <input
          className="border border-gray-200 rounded outline-none p-1 dark:text-black"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 text-xs">
          {selectedUser.map((item) => (
            <div key={item?._id} className="flex flex-col">
              <img
                className="w-8 h-8 rounded-full border border-gray-300 mx-auto"
                src={item?.avatar}
                alt="av"
              />
              <span className="select-none">
                {item?.firstName} {item?.lastName}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <p className="text-base font-bold">Friend list:</p>
          {searchedList?.map((item) => (
            <div
              key={item?._id}
              className="flex items-center gap-1 hover:bg-cyan-300 hover:text-white transition-colors p-1 rounded-lg cursor-pointer select-none"
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
          className="mt-auto p-1 font-bold bg-cyan-400 dark:bg-purple-500 text-white rounded transition-colors hover:bg-cyan-500"
          onClick={async () => {
            await addMember({
              member: selectedUser,
              groupID: showModal?.group_settings?._id,
            });
            toast.success("Added!");
            setShowModal((state) => ({ ...state, group_settings: false }));
          }}
        >
          Add member
        </button>
      </>
    );
  }

  return (
    showModal?.group_settings && (
      <div
        className="flex flex-col w-96 min-h-[500px] bg-white dark:bg-slate-900 dark:text-white rounded-lg p-2 gap-2"
        ref={modalRef}
      >
        <p className="text-center font-bold">
          {showModal?.group_settings?.option === "member"
            ? "Members"
            : "Add member"}
        </p>
        <div className="border-b border-gray-300" />

        {cmp}
      </div>
    )
  );
};

export default GroupSettingsModal;
