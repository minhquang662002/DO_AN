const PostCreateModalHeader = ({ user }) => {
  return (
    <div className="flex items-center px-4 py-2 gap-2">
      <div
        className="w-10 h-10 bg-cover bg-center border border-gray-300 rounded-full"
        style={{ backgroundImage: `url(${user?.avatar})` }}
      />
      <p>
        {user?.firstName} {user?.lastName}
      </p>
    </div>
  );
};

export default PostCreateModalHeader;
