import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/fn";
import { toast } from "react-toastify";
import { BsFileImage } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { checkImage } from "../../utils/fn";
const ImageCropModal = ({ setUpdatedAvatar, setShowCrop }) => {
  const [img, setImg] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const { file } = await getCroppedImg(img, croppedAreaPixels, 0);
      setUpdatedAvatar(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    } catch (e) {
      toast.error(e);
    }
  }, [croppedAreaPixels, img, setUpdatedAvatar]);
  const onClose = useCallback(() => {
    setUpdatedAvatar(null);
  }, [setUpdatedAvatar]);

  const imgValidator = (file) => {
    const error = checkImage(file);
    if (error) {
      return toast.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    validator: imgValidator,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      setImg(URL.createObjectURL(acceptedFiles[0]));
    },
  });
  return (
    <div className="h-96 bg-white shadow">
      <div className="relative h-72">
        {img ? (
          <div {...getRootProps()}>
            <Cropper
              cropShape="round"
              showGrid={false}
              aspect={1}
              image={img}
              crop={crop}
              zoom={zoom}
              onCropChange={(crop) => setCrop(crop)}
              onZoomChange={(zoom) => setZoom(zoom)}
              onCropComplete={onCropComplete}
            />
            <input {...getInputProps()} />
          </div>
        ) : (
          <div className="relative h-full">
            <label
              className="flex m-4 h-full items-center justify-center bg-gray-500 rounded-lg text-white group hover:bg-gray-400 transition cursor-pointer"
              htmlFor="dafuck"
              {...getRootProps()}
            >
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-600 group-hover:bg-gray-500 transition">
                  <BsFileImage className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm">Add photo</p>
                <p className="text-xs">or drag and drop</p>
              </div>
            </label>

            <input {...getInputProps()} />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end mx-8 mt-2">
        <button
          className="text-xs hover:bg-gray-300 rounded-lg px-2 text-blue-500 font-bold"
          onClick={() => {
            onClose();
            setShowCrop(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold"
          onClick={async () => {
            await showCroppedImage();
            setShowCrop(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropModal;
