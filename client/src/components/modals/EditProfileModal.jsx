import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/hooks";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import ImageCropModal from "./ImageCropModal";
import EditProfileForm from "./EditProfileInfo";
const EditProfileModal = ({ setShowModal, setLoading }) => {
  const { user } = useSelector((state) => state.auth);
  const [showCrop, setShowCrop] = useState(false);
  const [updatedAvatar, setUpdatedAvatar] = useState();
  const [updatedBg, setUpdatedBg] = useState();
  const modalRef = useRef();
  useClickOutside(modalRef, () => {
    setShowModal((state) => ({ ...state, profile: false }));
  });

  return (
    <>
      {
        <div
          ref={modalRef}
          className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col w-[700px] bg-white 
          dark:text-white dark:bg-slate-900 rounded-lg !opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative text-center border-b p-2">
            <p className="text-lg font-extrabold">
              {!showCrop ? "Edit profile" : "Update profile picture"}
            </p>
            <IoCloseCircleOutline
              className="absolute text-2xl top-1/2 right-4 -translate-y-1/2"
              onClick={() =>
                setShowModal((state) => ({ ...state, profile: false }))
              }
            />
          </div>
          {!showCrop ? (
            <EditProfileForm
              user={user}
              setUpdatedBg={setUpdatedBg}
              updatedAvatar={updatedAvatar}
              updatedBg={updatedBg}
              setShowCrop={setShowCrop}
              setLoading={setLoading}
            />
          ) : (
            <ImageCropModal
              setUpdatedAvatar={setUpdatedAvatar}
              setShowCrop={setShowCrop}
            />
          )}
        </div>
      }
    </>
  );
};

export default EditProfileModal;
