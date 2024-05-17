import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { BiUser, BiError } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Formik, Form, Field } from "formik";
import { signInSchema } from "../../utils/schema";
import { useLoginUserMutation } from "../../redux/services/auth.service";

const LoginForm = ({ setFormSwitch }) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          await loginUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
              <BiUser className="mr-1" />
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none bg-gray-200"
                autoComplete="off"
              />
              {errors.email && touched.email && (
                <BiError className="text-red-600 text-2xl" />
              )}
            </div>
            {errors.email && touched.email ? (
              <p className="text-red-600 text-xs font-bold px-2">
                {errors.email}
              </p>
            ) : (
              <div className="my-4" />
            )}

            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <div className="flex items-center bg-gray-200 p-2 rounded-xl text-black mb-4">
              <AiOutlineLock className="mr-1 text-black" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="bg-gray-200 outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className="block w-full text-white p-2 bg-black dark:bg-purple-500 rounded-full"
            >
              {isLoading ? "LOADING..." : "SIGN IN"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center">
        Don't have account yet?{" "}
        <span
          className="text-sky-500 hover:text-purple-500 hover:underline font-bold cursor-pointer"
          onClick={() => setFormSwitch(true)}
        >
          Sign up
        </span>
      </div>
    </>
  );
};

export default LoginForm;
