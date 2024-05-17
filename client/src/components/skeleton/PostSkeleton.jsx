const PostSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-2 p-2">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-20 h-4 rounded-full bg-gray-300 animate-pulse" />
        </div>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-300 animate-pulse" />
      <div className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
      <div className="h-64 rounded-lg bg-gray-300 animate-pulse" />
    </div>
  );
};

export default PostSkeleton;
