
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Formik, Form, Field, ErrorMessage , FormikProps} from "formik";
import { useMask } from "@react-input/mask";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import ClearIcon from '@mui/icons-material/Clear';

import {auth} from "@service-auth"
import { signUpValidationSchema } from "@validations"

export default function TemporaryDrawer({id, data}:{id:number , data?:any}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useMask({mask: "+998 (__) ___-__-__",replacement: { _: /\d/ },});

  const initialValues = {
    first_name: data.first_name || "", 
    last_name: data.last_name || "",  
    phone_number: data.phone_number ||"" , 
    email: data.email ||"", 
    password:  "" 
  }


// updet admin data finction --------------------------------
 const signUp = async(values:any)=>{
  // console.log(values);
  const phone = values.phone_number.replace(/\D/g, "");
  const usrData = {...values , phone_number: `+${phone}`};
  const updetDaminInfo = {id:id, updateData:usrData}

  
   
 try{
   const res = await auth.updateAdminId(updetDaminInfo);
  //  console.log(res);
   if(res.status === 200){
      toast.success("Admin updated successfully")
      setTimeout(()=>{
        toggleDrawer(false)();
        window.location.reload();
      }, 1000)
   }
 }catch(err:any){
   console.log(err);
   toast.error("Error " +  err?.message)
 }
  
}


 //------------------------------------


  const DrawerList = (
    <>
      <Box
        sx={{ width: 400 }}
        role="presentation"
        
      >
        <div className="w-full h-full ">
           <div className="py-2 px-2"><button onClick={toggleDrawer(false)} className="py-1 px-2  rounded-md hover:shadow-md duration-200"><ClearIcon/></button></div>
           <div className="px-3 pt-4">
             <Formik
              initialValues={ initialValues }
              validationSchema={signUpValidationSchema}
              onSubmit={signUp}
            >
              {({ errors, touched }: FormikProps<any>) => (
              <Form className="w-full flex flex-col gap-[8px]">
              <h2 className=" text-center text-[#D55200] text-[22px] pb-4 font-semibold">Change admin information</h2>
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
                 inputRef={inputRef}
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
                  Change
                </Button>
              </Form>
              )}
             </Formik>
           </div>
        </div>
      </Box>
    </>
  );

  return (
    <div>
      <button 
      aria-label="add to favorites" 
      onClick={toggleDrawer(true)}
      className="py-2 px-5 rounded-md bg-[#D55200] text-white font-medium hover:bg-[rgb(213,110,0)] duration-300 active:bg-[#D55200]"
      >
        updet
      </button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
