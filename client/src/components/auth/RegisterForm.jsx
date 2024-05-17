import { BiUser, BiError } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Formik, Form, Field } from "formik";
import { signUpSchema } from "../../utils/schema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DatePickerField } from "../modals/DatePicker";
import { useRegisterMutation } from "../../redux/services/auth.service";

const RegisterForm = ({ setFormSwitch }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    birthday: "",
    gender: "",
  };
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex gap-x-2">
              <div className="grow">
                <label htmlFor="firstName" className="block mb-1">
                  First Name:
                </label>
                <div
                  className={`flex items-center bg-gray-200 p-2 rounded-xl text-black ${
                    errors.firstName && touched.firstName
                      ? "border border-red-400"
                      : "outline-none"
                  }`}
                >
                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="outline-none bg-gray-200 w-full px-2"
                    autoComplete="dmn"
                  />
                  {errors.firstName && touched.firstName && (
                    <BiError className="text-red-600 text-2xl" />
                  )}
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="text-red-600 text-xxs font-bold whitespace-nowrap pl-2">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="grow">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name:
                </label>
                <div
                  className={`flex items-center bg-gray-200 p-2 rounded-xl text-black ${
                    errors.lastName && touched.lastName
                      ? "border border-red-400"
                      : "outline-none"
                  }`}
                >
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="outline-none bg-gray-200 w-full px-2"
                    autoComplete="dmn"
                  />
                  {errors.lastName && touched.lastName && (
                    <BiError className="text-red-600 text-2xl" />
                  )}
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="text-red-600 text-xxs font-bold px-2 whitespace-nowrap">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <div
                className={`flex items-center bg-gray-200 p-2 rounded-xl text-black ${
                  errors.email && touched.email
                    ? "border border-red-400"
                    : "outline-none"
                }`}
              >
                <BiUser className="mr-1 text-black" />
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="outline-none bg-gray-200 w-full"
                  autoComplete="dmn"
                />
                {errors.email && touched.email && (
                  <BiError className="text-red-600 text-2xl" />
                )}
              </div>
              {errors.email && touched.email && (
                <p className="text-red-600 text-xxs font-bold px-2">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded-xl text-black">
                <AiOutlineLock className="mr-1 text-black" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-gray-200 outline-none w-full"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600 text-xxs font-bold px-2">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-1">
                Confirm Password:
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded-xl text-black">
                <AiOutlineLock className="mr-1 text-black" />
                <Field
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm password"
                  className="bg-gray-200 outline-none w-full"
                />
              </div>
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-red-600 text-xxs font-bold px-2">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label id="gender__group" className="block mb-1">
                  Gender:
                </label>
                {errors.gender && touched.gender && (
                  <BiError className="text-red-600 text-2xl" />
                )}
              </div>
              <div
                className="flex justify-between gap-4"
                role="group"
                aria-labelledby="gender__group"
              >
                <label
                  className={`border ${
                    errors.gender && touched.gender
                      ? "border-red-600"
                      : "border-gray-300"
                  } p-2 grow rounded flex justify-between items-center gap-2`}
                >
                  Male
                  <Field type="radio" name="gender" value="1" />
                </label>
                <label
                  className={`border ${
                    errors.gender && touched.gender
                      ? "border-red-600"
                      : "border-gray-300"
                  } p-2 grow rounded flex justify-between items-center gap-2`}
                >
                  Female
                  <Field type="radio" name="gender" value="2" />
                </label>
                <label
                  className={`border ${
                    errors.gender && touched.gender
                      ? "border-red-600"
                      : "border-gray-300"
                  } p-2 grow rounded flex justify-between items-center gap-2`}
                >
                  Other
                  <Field type="radio" name="gender" value="0" />
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-1" htmlFor="birthday">
                Birthday:
              </label>
              <div className="bg-gray-200 p-2 rounded-xl text-black">
                <DatePickerField
                  name="birthday"
                  className="bg-gray-200 outline-none w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="font-roboto w-full font-bold text-white p-2 bg-sky-400 dark:bg-purple-500 rounded-full mt-4"
            >
              {isLoading ? "LOADING..." : "SIGN UP"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center">
        Already have account?{" "}
        <span
          className="text-cyan-400 hover:text-purple-500 hover:underline font-bold cursor-pointer"
          onClick={() => setFormSwitch(false)}
        >
          Sign in
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
