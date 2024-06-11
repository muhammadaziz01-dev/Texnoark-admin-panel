import  { useState } from "react";
import * as Yup from "yup";
import axios from 'axios';
import { Button, Drawer, Input, Upload } from "antd";
// import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { ErrorMessage, Field, Formik, Form } from "formik";

// import { postProductSchema2 } from "@validation";
// import { getDataFromCookie } from "@token-service";
import { toast } from "react-toastify";
import {getCookies} from "@coocse"

interface FormValues {
  quantity: string;
  description: string;
  discount: string;
  colors: string;
  product_id: any;
  files: File[];
}

export const postProductSchema2 = Yup.object().shape({
    quantity: Yup.number().required("Please enter quantity"),
    description: Yup.string().required("Please enter description"),
    discount: Yup.number().required("Please enter discount"),
    colors: Yup.string().required("Please enter color"),
  });

const Testdraever  = ({id}:{id:number}) => {
  const [open, setOpen] = useState(false);
//   const { postProductDetail } = useProductDetailStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const initialValues: FormValues = {
    quantity: "",
    description: "",
    discount: "",
    colors: "",
    product_id: id || "",
    files: [],
  };

  const handleSubmit = async (values: FormValues) => {
    const productId: any = id || "";
    const formData = new FormData();
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("discount", values.discount);
    formData.append("colors", values.colors);
    formData.append("product_id", productId);

    values.files.forEach((file) => {
      formData.append("files", file);
    });

    // try {
    //   const res = await postProductDetail(formData);
    //   if (res && res.status === 201) {
    //     toast.success("Product added successfully");
    //     onClose();
    //   }
    // } catch (error:any) {
    //     toast.error(error);
    // }

    const access_token = getCookies("access_token") 
     
    try {
      const response = await axios.post("https://ecomapi.ilyosbekdev.uz/product-detail/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:  `Bearer ${access_token}`
        },
      });
       if (response && response.status === 201) {
        toast.success("Product added successfully");
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
       <button
        aria-label="add to favorites"
        onClick={showDrawer}
        className="py-2 px-5 rounded-md bg-[#D55200] text-white font-medium hover:bg-[rgb(213,110,0)] duration-300 active:bg-[#D55200]"
      >
        Create
      </button>

      {/* <Button onClick={showDrawer}>
         Create
      </Button> */}
      <Drawer
        title="Add Product Details"
        onClose={onClose}
        open={open}
        className="pt-[60px]"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postProductSchema2}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <Field
                type="number"
                name="quantity"
                as={Input}
                placeholder="Quantity"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-[#ff0000] mt-0"
              />
              <Field
                type="text"
                name="description"
                as={Input}
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-[#ff0000]"
              />
              <Field
                type="number"
                name="discount"
                as={Input}
                placeholder="Discount"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-[#ff0000]"
              />
              <Field type="text" name="colors" as={Input} placeholder="Color" />
              <ErrorMessage
                name="colors"
                component="div"
                className="text-[#ff0000]"
              />
              <Field name="files">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    multiple
                    beforeUpload={(file) => {
                      setFieldValue(
                        "files",
                        field.value ? [...field.value, file] : [file]
                      );
                      return false;
                    }}
                  >
                    <Button >Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage
                name="files"
                component="div"
                className="text-[#ff0000]"
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  backgroundColor: "#D55200",
                  color: "white",
                  borderColor: "#D55200",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default Testdraever