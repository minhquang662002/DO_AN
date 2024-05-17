import { toast } from "react-toastify";

export const handleFormChange = (e, formValue, setFormValue) => {
  e.preventDefault();
  const { name, value } = e.target;
  setFormValue({ ...formValue, [name]: value });
};

export const checkImage = (file) => {
  let error = "";
  if (!file) {
    return (error = "No files selected!");
  }
  if (file.size > 1024 * 1024) {
    error = "Image's size exceeds allowed size (limit 1MB)";
  }
  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/webp"
  ) {
    error = "Image format is incorrect (Image format must be JPG or PNG)";
  }
  return error;
};

export const videoCheck = (file) => {
  let error = "";
  if (!file) {
    return (error = "No files selected!");
  }
  if (file.size > 5 * 1024 * 1024) {
    error = "Video's size exceeds allowed size (limit 5MB)";
  }
  if (file.type !== "video/mp4" && file.type !== "video/webm") {
    error = "Video format is incorrect (Video format must be MP4 or WEBM)";
  }
  return error;
};

export const fileCheck = (file) => {
  let error = "";
  if (file.type.startsWith("image")) {
    error = checkImage(file);
  } else if (file.type.startsWith("video")) {
    error = videoCheck(file);
  }
  return error;
};

export const uploadFile = async (files) => {
  let upFiles = [];
  try {
    for (const item of files) {
      if (typeof item !== "string") {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", "aiee6fhb");
        formData.append("cloud_name", "dd0w757jk");
        formData.append("folder", "unisocial");
        if (item.type.startsWith("image")) {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dd0w757jk/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          upFiles.push(data.url);
        }
        if (item.type.startsWith("video")) {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dd0w757jk/video/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          upFiles.push(data.url);
        }
      }
    }
  } catch (error) {
    alert(error);
  }
  return upFiles;
};

export const addFile = (addedFiles, setContent) => {
  const files = addedFiles.map((file) =>
    Object.assign(file, { preview: URL.createObjectURL(file) })
  );
  let videos = [];
  let images = [];

  files.forEach((item) => {
    if (item.type.startsWith("image")) {
      images.push(item);
    } else {
      videos.push(item);
    }
  });

  setContent((state) => ({
    ...state,
    images: [...state.images, ...images],
    videos: [...state.videos, ...videos],
  }));
};

export const handleUpdateProfile = async (prevInfo, curInfo, updateUser) => {
  const updatedAvatar = await uploadFile([curInfo.avatar]);
  const updatedBg = await uploadFile([curInfo.background]);
  curInfo.avatar = updatedAvatar.length > 0 ? updatedAvatar[0] : curInfo.avatar;
  curInfo.background = updatedBg.length > 0 ? updatedBg[0] : curInfo.background;
  if (
    prevInfo.avatar === curInfo.avatar &&
    prevInfo.background === curInfo.background &&
    prevInfo.firstName.trim() === curInfo.firstName.trim() &&
    prevInfo.lastName.trim() === curInfo.lastName &&
    prevInfo.gender === curInfo.gender &&
    prevInfo.birthday === curInfo.birthday &&
    prevInfo.address.trim() === curInfo.address.trim()
  ) {
    return toast.error("Profile info not change!");
  }
  updateUser(curInfo);
};

export const handleCreatePost = async (content, createPost) => {
  if (
    content.text.trim().length === 0 &&
    content.images.length === 0 &&
    content.videos.length === 0
  ) {
    return toast.error("No content!");
  }
  const imagesUrl = await uploadFile(content.images);
  const videosUrl = await uploadFile(content.videos);
  await createPost({
    ...content,
    images: imagesUrl.length > 0 ? imagesUrl.join(",") : "",
    videos: videosUrl.length > 0 ? videosUrl.join(",") : "",
  });
};

export const handleEditPost = async (prevContent, curContent, editPost, id) => {
  if (
    prevContent.text === curContent.text &&
    JSON.stringify(prevContent.images) === JSON.stringify(curContent.images) &&
    JSON.stringify(prevContent.videos) === JSON.stringify(curContent.videos)
  ) {
    return toast.error("Content not change!");
  }
  const updatedImageList = await uploadFile(curContent.images);
  const updatedVideoList = await uploadFile(curContent.videos);
  curContent.images =
    updatedImageList.length > 0
      ? [
          ...curContent.images.filter((item) => !item.preview),
          ...updatedImageList,
        ].join(",")
      : curContent.images?.join(",");
  curContent.videos =
    updatedVideoList.length > 0
      ? [
          ...curContent.videos.filter((item) => !item.preview),
          ...updatedVideoList,
        ].join(",")
      : curContent.videos?.join(",");
  await editPost({ data: curContent, id });
};

export const checkType = (item, addCl) => {
  if (typeof item !== "string") {
    if (item?.type?.startsWith("image")) {
      return (
        <img
          className={`${addCl}`}
          key={item.preview}
          src={item?.preview}
          alt="postcontent"
        />
      );
    } else if (item?.type?.startsWith("video")) {
      return (
        <video
          className={`${addCl}`}
          key={item.preview}
          src={item?.preview}
          controls
        />
      );
    }
  } else {
    if (item.includes("image")) {
      return (
        <img className={`${addCl}`} key={item} src={item} alt="postcontent" />
      );
    } else if (item.includes("video")) {
      return <video className={`${addCl}`} key={item} src={item} controls />;
    }
  }
};

export const handleCreateComment = async (
  e,
  commentContent,
  setCommentContent,
  fn,
  ids,
  setState
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (
      !commentContent.text &&
      !Object.keys(commentContent.image).length &&
      !Object.keys(commentContent.video).length
    ) {
      return toast.error("Empty content!");
    }
    setCommentContent({ text: "", image: {}, video: {} });
    if (commentContent.image?.preview) {
      var imageUrl = await uploadFile([commentContent.image]);
    }
    if (commentContent.video?.preview) {
      var videoUrl = await uploadFile([commentContent.video]);
    }
    const { postID, commentID } = ids;
    const { data } = await fn({
      postID,
      commentID,
      data: {
        ...commentContent,
        image: imageUrl?.length > 0 ? imageUrl[0] : "",
        video: videoUrl?.length > 0 ? videoUrl[0] : "",
      },
    });

    setState((state) => [data.data.comments, ...state]);
  }
};

export const handleEditComment = async (
  e,
  commentContent,
  setCommentContent,
  fn,
  commentID,
  setState,
  pos,
  setEditComment
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (
      !commentContent.text &&
      !Object.keys(commentContent.image).length &&
      !Object.keys(commentContent.video).length
    ) {
      return toast.error("No content!");
    }
    setCommentContent({ text: "", image: {}, video: {} });
    if (commentContent.image?.preview) {
      var imageUrl = await uploadFile([commentContent.image]);
    }
    if (commentContent.video?.preview) {
      var videoUrl = await uploadFile([commentContent.video]);
    }
    const { data } = await fn({
      commentID,
      data: {
        ...commentContent,
        image: imageUrl?.length > 0 ? imageUrl[0] : "",
        video: videoUrl?.length > 0 ? videoUrl[0] : "",
      },
    });
    setState((state) => [
      ...state.slice(0, pos),
      data.data.comments,
      ...state.slice(pos + 1),
    ]);
    setEditComment(false);
    return;
  }
};

export const handleLikeComment = async (
  cnd,
  id,
  pos,
  user,
  commentList,
  setCommentList,
  likeComment,
  unlikeComment
) => {
  if (!cnd) {
    let updatedItem = {
      ...commentList[pos],
      likes: [...commentList[pos].likes, user?.userID],
    };
    setCommentList((state) => [
      ...state.slice(0, pos),
      updatedItem,
      ...state.slice(pos + 1),
    ]);
    await likeComment(id);
  } else {
    let updatedItem = {
      ...commentList[pos],
      likes: commentList[pos].likes.filter((cmt) => cmt !== user.userID),
    };
    setCommentList((state) => [
      ...state.slice(0, pos),
      updatedItem,
      ...state.slice(pos + 1),
    ]);
    await unlikeComment(id);
  }
};

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve({ file, url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
}

// const handleMessage = async (e, messageValue, setMessageValue, setMessages, fn, item, user) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     if (
//       !messageValue.text.trim() &&
//       !messageValue.images.length &&
//       !messageValue.videos.length &&
//       !Object.keys(messageValue.call).length
//     ) {
//       return;
//     } else {
//       if (messageValue.images.length > 4 || messageValue.videos.length > 4) {
//         return toast.error("Maxium number of images and videos are 4");
//       }
//       setMessageValue({ text: "", videos: [], images: []});
//       setMessages((state) => [{...messageValue, sender: user._id}, ...state]);
//       if (messageValue.images.length > 0) {
//         var imagesUrl = await uploadFile(messageValue.images);
//       }
//       if (messageValue.videos.length > 0) {
//         var videosUrl = await uploadFile(messageValue.videos);
//       }

//       const { error } = await fn({
//         data: {
//           ...messageValue,
//           images: imagesUrl || [],
//           videos: videosUrl || [],
//         },
//         receiver: item?.type === "group" ? item?.receiver : item?._id,
//         conveID: item?.type === "group" ? item?._id : undefined,
//       });
//       if (error) {
//         toast.error(error.data);
//       }
//     }
//   }
// };

export const handleCreateGroupChat = async (groupInfo, createGroup) => {
  let uploadAvatar;
  if (groupInfo.members.length < 2 || groupInfo.members.length > 9) {
    return toast.error(
      "Group must have at least 3 members and at max 10 members!"
    );
  }
  if (groupInfo.name.trim().length === 0) {
    return toast.error("Group name is requried!");
  }
  if (groupInfo.name.trim().length > 25) {
    return toast.error("Group name must only contain 25 characters!");
  }
  if (groupInfo.avatar) {
    uploadAvatar = await uploadFile([groupInfo.avatar]);
  } else {
    return toast.error("Group avatar is required");
  }

  await createGroup({
    name: groupInfo.name,
    members: groupInfo.members,
    avatar: uploadAvatar[0],
  });
};
