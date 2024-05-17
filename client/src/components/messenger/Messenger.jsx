import MessengerRight from "./MessengerRight";
import { useGetAllConversationsQuery } from "../../redux/services/message.service";
import { useSelector } from "react-redux";
import { lazy, useState } from "react";
import { Suspense } from "react";
const MessengerLeft = lazy(() => import("./MessengerLeft"));

const Messenger = () => {
  const {
    auth: { token, user },
    online,
  } = useSelector((state) => state);
  const { data } = useGetAllConversationsQuery(null, { skip: !token });
  const [selectedConver, setSelectedConver] = useState(null);

  return (
    <div className="flex grow dark:text-white dark:bg-slate-900 overflow-hidden">
      <Suspense
        fallback={
          <div className="w-[25%] flex flex-col gap-2 grow p-2 border-r border-cyan-400 dark:border-purple-500">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-12 rounded bg-gray-300 animate-pulse"
              ></div>
            ))}
          </div>
        }
      >
        <MessengerLeft
          conversations={data?.data}
          user={user}
          setSelectedConver={setSelectedConver}
          selectedConver={selectedConver}
          online={online}
        />
      </Suspense>

      {selectedConver ? (
        <MessengerRight selectedConver={selectedConver} user={user} />
      ) : (
        <div className="w-[75%]"></div>
      )}
    </div>
  );
};

export default Messenger;
