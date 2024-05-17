import { Formik, Form, Field } from "formik";
import { DatePickerField } from "./DatePicker";
import { checkImage, handleUpdateProfile } from "../../utils/fn";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../redux/services/profile.service";
import dayjs from "dayjs";

const EditProfileForm = ({
  user,
  updatedAvatar,
  updatedBg,
  setUpdatedBg,
  setShowCrop,
  setLoading,
}) => {
  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: user?.address,
    birthday: dayjs(user?.birthday).format("MM/DD/YYYY"),
    gender: user?.gender,
  };

  const [updateUser] = useUpdateUserMutation();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold">Profile picture</h3>
        <label
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowCrop(true)}
        >
          Edit
        </label>
      </div>
      <div
        className="w-32 h-32 border border-gray-300 rounded-full bg-center bg-cover mx-auto my-4"
        style={{
          backgroundImage: `url(${
            updatedAvatar ? updatedAvatar.preview : user?.avatar
          })`,
        }}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold">Background picture</h3>
        <label htmlFor="editBg" className="text-blue-500 cursor-pointer">
          Edit
        </label>
        <input
          id="editBg"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const error = checkImage(e.target.files[0]);
            if (error) {
              return toast.error(error);
            }
            setUpdatedBg(
              Object.assign(e.target.files[0], {
                preview: URL.createObjectURL(e.target.files[0]),
              })
            );
          }}
        />
      </div>
      <div
        className="w-3/4 h-48 rounded-lg bg-center bg-cover mx-auto my-4"
        style={{
          backgroundImage: `url(${
            updatedBg ? updatedBg.preview : user?.background
          })`,
        }}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold mb-4">Private information</h3>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          setLoading(true);
          await handleUpdateProfile(
            user,
            {
              ...values,
              avatar: updatedAvatar || user.avatar,
              background: updatedBg || user.background,
            },
            updateUser
          );
          setLoading(false);
        }}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex gap-x-2">
            <div className="grow">
              <label htmlFor="firstName" className="block mb-1 text-sm">
                First Name:
              </label>
              <div className={`flex items-center border p-2 rounded`}>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="outline-none w-full px-2 dark:bg-slate-900"
                />
              </div>
            </div>
            <div className="grow">
              <label htmlFor="lastName" className="block mb-1 text-sm">
                Last Name:
              </label>
              <div className={`flex items-center border p-2 rounded`}>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="outline-none w-full px-2 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <label id="gender__group" className="block mb-1 text-sm">
                Gender:
              </label>
            </div>
            <div
              className="flex justify-between gap-4"
              role="group"
              aria-labelledby="gender__group"
            >
              <label
                className={`border p-2 grow rounded flex justify-between items-center gap-2`}
              >
                Male
                <Field type="radio" name="gender" value="1" />
              </label>
              <label
                className={`border p-2 grow rounded flex justify-between items-center gap-2`}
              >
                Female
                <Field type="radio" name="gender" value="0" />
              </label>
              <label
                className={`border p-2 grow rounded flex justify-between items-center gap-2`}
              >
                Other
                <Field type="radio" name="gender" value="2" />
              </label>
            </div>
          </div>
          <div>
            <p className="block mb-1 text-sm">Birthday:</p>
            <div className="border p-2 rounded">
              <DatePickerField name="birthday" className="dark:bg-slate-900" />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 text-sm">
              Address:{" "}
            </label>
            <div className={`flex items-center border p-2 rounded`}>
              <Field
                name="address"
                placeholder="Enter your address"
                className="outline-none w-full px-2 dark:bg-slate-900"
              />
            </div>
          </div>
          <button
            type="submit"
            className="font-roboto w-full font-bold text-white bg-cyan-400 hover:bg-cyan-500 p-2 rounded mt-4 dark:bg-purple-500"
          >
            UPDATE
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfileForm;
