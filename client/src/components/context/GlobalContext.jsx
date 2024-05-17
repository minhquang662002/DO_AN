import { useState, createContext } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState({
    post: false,
    profile: false,
    create_group: false,
    group_settings: false,
    confirm_modal: false,
  });
  const [postChoices, setPostChoices] = useState({
    tags: false,
    images: false,
  });
  const [showChatBox, setShowChatBox] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showModal,
        setShowModal,
        postChoices,
        setPostChoices,
        showChatBox,
        setShowChatBox,
        userLocation,
        setUserLocation,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };
