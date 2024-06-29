import * as Yup from "yup";


// Validaton ->  signing and signup parameters <-----
export const signUpValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  last_name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  phone_number: Yup.string().required("Phone Number is required"), 
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export const signInValidationSchema = Yup.object({
  phone_number: Yup.string().required("Phone Number is required"), 
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});
// =--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


// Validaton ->   Brand  <-----
export const brandValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.number().min(0, "must be at least greater than 0").required("Position is required"),
  file: Yup.string().required("Image is required")
});

export const brandValidationSchemaUpdet = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  categoryId: Yup.number().min(0, "must be at least greater than 0").required("Position is required")
});
//-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


// -------- Validation new product detail --------------------
export const productDetailValidationSchema = Yup.object().shape({
  quantity: Yup.number().min(0, "must be at least greater than 0").required("Price is required"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number().min(0, "must be at least greater than 0").required("Price is required"),
  // product_id: Yup.number().min(0, "must be at least greater than 0").required("Position is required"),
  color: Yup.string().required("Position is required"),
  file: Yup.string().required("Image is required")
});
//--=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


// Validaton ->   Brand  <-----
export const bannerValidationSchema = Yup.object().shape({
  position: Yup.string().required("Position is required"),
  file: Yup.string().required("Image is required")
});
//==-=---------------=====-==-=-=-=-=--=-=-====-=--=-==--=-=-=-=-=-=-=-=-=