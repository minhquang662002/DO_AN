import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Z]+$/i, "Must only contain alphabetic characters")
    .required("Please enter your first name!"),
  lastName: yup
    .string()
    .matches(/^[A-Z]+$/i, "Must only contain alphabetic characters")
    .required("Please enter your last name!"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "Must contain at least 8 characters, includes one uppercase, one lowercase, one number and one special case character"
  // )
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ),
  gender: yup.string().required(),
});
