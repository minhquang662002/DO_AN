import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../asset/logo.webp";
import form from "../../asset/form.jpg";

const AuthLayout = () => {
  const [formSwitch, setFormSwitch] = useState(false);

  if (localStorage["isLogged"]) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>UniSocial</title>
      </Helmet>
      <div className="flex min-h-screen dark:text-white">
        <div className="hidden lg:block relative basis-4/6 bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
            style={{ backgroundImage: `url(${form})` }}
          />
          <img src={logo} className="absolute w-12 top-6 left-6" alt="logo" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl text-center text-white">
            <p>Welcome to UniSocial</p>
            <p className="text-sm">Be yourself. Be social media.</p>
          </div>
        </div>
        <div className="w-80 my-auto p-8 flex-grow">
          <div className="flex flex-col gap-2 ">
            <img
              src={logo}
              className="lg:hidden w-24 h-24 mx-auto"
              alt="logo"
            />
            <h2 className="text-2xl font-bold mx-auto">UniSocial</h2>
            {formSwitch ? (
              <RegisterForm setFormSwitch={setFormSwitch} />
            ) : (
              <LoginForm setFormSwitch={setFormSwitch} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
