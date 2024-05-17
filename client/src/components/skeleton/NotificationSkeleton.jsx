const NotificationSkeleton = () => {
  return (
    <div className="flex items-center gap-2 w-full p-2 rounded">
      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
      <div className="flex grow flex-col gap-2">
        <div className="w-full rounded-full h-4 bg-gray-300 animate-pulse" />
        <div className="w-10 rounded-full h-4 bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
};

export default NotificationSkeleton;
