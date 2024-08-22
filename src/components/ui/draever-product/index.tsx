import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

import useProductStore from "@store-product";
import { toast } from "react-toastify";




export default function TemporaryDrawer({ data , id }:any) {







  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const productDetailValidationSchema = Yup.object().shape({
    quantity: Yup.number().min(0, "must be at least greater than 0").required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    discount: Yup.number().min(0, "must be at least greater than 0").required("Discount is required"),
    colors: Yup.string().required("Color is required"),
  });

  const initialValues = {
    quantity: data?.quantity || "",
    discount: data?.discount ||"",
    description: data?.description || "",
    colors: data?.colors?.join(", ") || "",
  };

  const {updateProductDetels} = useProductStore();

  const handleSubmit = async (values: any) => {
    
    const updetDataDetels = {id:data.id , putDataDetels:{...values , product_id:id }}

    try {
        const respons = await updateProductDetels(updetDataDetels)  
        if(respons === 200){
            toggleDrawer(false)
            toast.success("Product detels updated successfully")
            setTimeout(()=>{
              window.location.reload();
            },1000)
        }
    } catch (err) {
      console.log(err);
    }
  };

  const DrawerList = (
    <>
      <Box
        sx={{ width: 400 }}
        role="presentation"
      >
        <div className="w-full h-full">
          <div className="py-2 px-2 flex justify-end">
            <button onClick={toggleDrawer(false)} className="py-1 px-2 rounded-md hover:shadow-md duration-200">
              <ClearIcon />
            </button>
          </div>
          <div className="px-3 pt-4">
            <Formik
              initialValues={initialValues}
              validationSchema={productDetailValidationSchema}
              onSubmit={handleSubmit}
            >
            
                <Form className="w-full flex flex-col gap-[8px]">
                  <h2 className="text-center text-[#D55200] text-[22px] pb-4 font-semibold">Edite product detels</h2>

                  <Field
                    as={TextField}
                    label="Quantity"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="quantity"
                    className="w-[100%] mb-3 outline-none py-0"
                    helperText={
                      <ErrorMessage
                        name="quantity"
                        component="span"
                        className="mb-3 text-red-500 text-center"
                      />
                    }
                  />

                  <Field
                    as={TextField}
                    label="Discount"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="discount"
                    className="w-[100%] mb-3 outline-none py-0"
                    helperText={
                      <ErrorMessage
                        name="discount"
                        component="span"
                        className="mb-3 text-red-500 text-center"
                      />
                    }
                  />

                  <Field
                    as={TextField}
                    label="Description"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="description"
                    className="w-[100%] mb-3 outline-none py-0"
                    helperText={
                      <ErrorMessage
                        name="description"
                        component="span"
                        className="mb-3 text-red-500 text-center"
                      />
                    }
                  />

                  <Field
                    as={TextField}
                    label="Colors"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="colors"
                    className="w-[100%] mb-3 outline-none py-0"
                    helperText={
                      <ErrorMessage
                        name="colors"
                        component="span"
                        className="mb-3 text-red-500 text-center"
                      />
                    }
                  />

                  

                  <Button
                    sx={{ fontSize: "16px", fontWeight: "600", padding: "14px", backgroundColor: "#D55200", "&:hover": { background: "#D52200" } }}
                    variant="contained"
                    type="submit"
                    className="w-[100%]"
                  >
                    edite
                  </Button>
                </Form>
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
        edite
      </button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
