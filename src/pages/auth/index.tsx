

import  { useState  } from "react";
import { Formik, Form, Field, ErrorMessage , FormikProps} from "formik";
import { useMask } from "@react-input/mask";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer , toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import {setCookies } from "@coocse"
import {auth} from "@service-auth"
import {signInValidationSchema , signUpValidationSchema } from "@validations"
import "./style.scss";

const index = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useMask({mask: "+998 (__) ___-__-__",replacement: { _: /\d/ },});
  const inputRef2 = useMask({mask: "+998 (__) ___-__-__",replacement: { _: /\d/ },});





  //-> useEfect <------
  // useEffect(() => {
  //   if(getCookies("access_token")){
  //       navigate("/home");
  //   }
  // })
  //=-=--=-===-=-===-=-=-=

  // Custom styling for TextField when there's an error
const StyledTextField = styled(TextField)(({  }) => ({
  '& .MuiInputBase-root': {
    color: '#000',
    fontSize: '20px',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-error fieldset': {
      borderColor: 'red',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-error': {
      color: 'red',
    },
  },
}));



  //Aftarization -> signin and signup <-=-=-=--=-=-=-==-=-=-=-
  const signUp = async(values:any)=>{
      // console.log(values);
      const phone = values.phone_number.replace(/\D/g, "");
      const usrData = {...values , phone_number: `+${phone}`};

     try{
       const res = await auth.signup(usrData);
      //  console.log(res);
       if(res.status === 201){
          toast.success("Adbmin created successfully")
          setTimeout(()=>{
            setIsSignUp(false);
          }, 1000)
       }
     }catch(err:any){
       console.log(err);
       toast.error("Error " +  err?.message)
     }
      
  }

  const signIn = async(values:any)=>{
    const phone = values.phone_number.replace(/\D/g, "");
    const usrData = {...values , phone_number: `+${phone}`};
    // console.log(usrData);
    
    try{
      const res = await auth.signin(usrData);
      if(res.status === 201){
        setCookies("access_token", res?.data?.data?.tokens?.access_token);
        setCookies("refresh_token", res?.data?.data?.tokens?.refresh_token);
        setCookies("admin_data", res?.data?.data?.admin);
        setCookies("admin_id", res?.data?.data?.data?.id);


        // setCookies("refresh_token", res?.data?.tokens?.refresh_token);
        toast.success("Sign in success")
        setTimeout(()=>{
            navigate("/home");
        }, 1000)
      }
    }catch(error:any){
      console.log(error);
      toast.error("Error " +  error?.message)
    }
  }

  //=-=-=-=-=-=---=---=--=-=-=-=-=-=-=-=-=-=-=-=---=---=--


  return (
    <>
     <ToastContainer />
      <div className="auth-parent">
        <div
          className={`container-auth ${isSignUp ? "active" : ""}`}
          id="container-auth"
        >
          <div className="form-container sign-up">
            <Formik
              initialValues={{first_name: "", last_name:"",  phone_number: "" , email: "", password: "" }}
              validationSchema={signUpValidationSchema}
              onSubmit={signUp}
            >
              {({ errors, touched }: FormikProps<any>) => (
              <Form className="w-full flex flex-col gap-[8px]">
              <h2 className=" text-center text-[#D55200] text-[22px] font-semibold">Registration</h2>
                <Field
                  as={TextField}
                  label="First name"
                  sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                  type="text"
                  name="first_name"
                  error={touched.first_name && !!errors.first_name}
                  className="w-[100%] mb-1 outline-none py-0"
                  helperText={
                    <ErrorMessage
                  name="first_name"
                  component="p"
                  className="mb-1 text-red-500 text-center"/>
                  }
                />
                <Field
                  as={TextField}
                  label="Last name"
                  sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                  type="text"
                  name="last_name"
                  error={touched.last_name && !!errors.last_name}
                  className="w-[100%] mb-1 outline-none py-0"
                  helperText={
                    <ErrorMessage
                  name="last_name"
                  component="p"
                  className="mb-1 text-red-500 text-center"/>
                  }
                />

                <Field
                 as={TextField}
                 label="Telafono"
                 type="tel"
                 inputRef={inputRef2}
                 name="phone_number"
                 error={touched.phone_number && !!errors.phone_number}
                 className="w-full mb-1 outline-none"
                 helperText={
                    <ErrorMessage name="phone_number" component="p" className="mb-1 text-red-500 text-center" />
                 }
                />
                

                <Field
                  as={TextField}
                  label="Email"
                  sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                  type="email"
                  name="email"
                  error={touched.email &&!!errors.email}
                  className="w-[100%] mb-1 outline-none py-0"
                  helperText={
                    <ErrorMessage
                  name="email"
                  component="p"
                  className="mb-1 text-red-500 text-center"/>
                  }
                />
                

                <Field
                  as={TextField}
                  label="Password"
                  sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  error={touched.password &&!!errors.password}
                  className="w-[100%] mb-1 outline-none py-0"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={
                    <ErrorMessage
                    name="password"
                    component="p"
                    className="mb-1 text-red-500 text-center"/>
                  }
                />
                

                <Button
                  sx={{ fontSize: "16px", fontWeight: "600", padding: "14px" ,backgroundColor: "#D55200" ,"&:hover" :{background: "#D52200"} }}
                  variant="contained"
                  type="submit"
                  className="w-[100%]"
                >
                  Sign Up
                </Button>
              </Form>
              )}
            </Formik>
          </div>
          <div className="form-container sign-in">
            <Formik
              initialValues={{ phone_number: "", password: "" }}
              validationSchema={signInValidationSchema}
              onSubmit={signIn}
            >
              {({ errors, touched }: FormikProps<any>) => (
              <Form className="w-full flex flex-col gap-[15px]">
                <h2 className=" text-center text-[#D55200] text-[22px] font-semibold">login</h2>
                <Field
                 as={TextField}
                 label="Telafono"
                 type="tel"
                 inputRef={inputRef}
                 name="phone_number"
                 error={touched.phone_number && !!errors.phone_number}
                 className="w-full mb-1 outline-none"
                 helperText={
                    <ErrorMessage name="phone_number" component="p" className="mb-1 text-red-500 text-center" />
                 }
                />

                <p
                  onClick={() => {
                    alert("therefore, it should not be forgotten : ) ");
                    localStorage.clear();
                  }}
                  className="text-[20px] text-[#D52200] forgrt-pasword hover:text-[#d86f59] duration-200 cursor-pointer"
                >
                  Forgot password?
                </p>

                <Field
                  as={StyledTextField}
                  label="Password"
                  sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  error={touched.password && !!errors.password}
                  className="w-[100%] mb-3 outline-none py-0"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={
                    <ErrorMessage
                  name="password"
                  component="p"
                  className="mb-3 text-red-500 text-center"/>
                  }
                />

                <Button
                  sx={{ fontSize: "16px", fontWeight: "600", padding: "14px" , backgroundColor: "#D55200", "&:hover" :{background: "#D52200"} }}
                  variant="contained"
                  type="submit"
                  className="w-[100%]"
                >
                  Sign In
                </Button>
              </Form>
              )}
            </Formik>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <Button
                  className="hidden btn-test"
                  id="login"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </Button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <Button
                  className="hidden btn-test"
                  id="register"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
