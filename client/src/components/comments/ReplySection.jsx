import Comment from "./Comment";

const ReplySection = ({
  user,
  replies,
  setReplyPage,
  item,
  post,
  replyList,
  setReplyList,
}) => {
  return (
    <>
      {replies?.map((item, index) => (
        <Comment
          key={item?.commentID}
          pos={index}
          item={item}
          user={user}
          post={post}
          replyList={replyList}
          setReplyList={setReplyList}
        />
      ))}
      {replies?.length < item?.replyTotal && (
        <p
          className="cursor-pointer inline-block"
          onClick={() => setReplyPage((state) => state + 1)}
        >
          View more replies
        </p>
      )}
    </>
  );
};

export default ReplySection;
