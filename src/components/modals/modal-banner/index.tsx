import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import useBannerStore from "@store-banner";
import { postData } from "@banner"
import { bannerValidationSchema  } from "@validations"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PropsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({ title, id, data }: PropsData) {

  const {postBanner, updateBanner} = useBannerStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: postData = {
    position: data?.position || "",
    file: undefined,
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("position", values.position);
    formData.append("file", values.file as Blob);
    console.log(formData);
    

    let status;
    if (!id) {
      status = await postBanner(formData);
    } else {
      const putData = { id: id, putData: formData };
      status = await updateBanner(putData);
    }

    if (status === 201 || status === 200) {
      toast.success(title === "post" ? "Successfully added" : "Successfully updated");
      setTimeout(()=>{
        handleClose();
        // window.location.reload()
      },1500)
    } else {
      toast.error("Error: " + status);
      handleClose();
    }
  };

  return (
    <div>
      {title === "post" ? 
        <button
          onClick={handleOpen}
          className="py-2 px-6 text-white font-semibold bg-[#D52200] hover:bg-[#9c4837] active:bg-[#D52200] duration-200 rounded-lg"
        >
          To add
        </button> 
      : 
        <Button
          color="inherit"
          onClick={handleOpen}
          sx={{ color: '#767676' }}
        >
          <EditIcon />
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={bannerValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
                <h1 className="text-center mb-2 text-[26px] font-bold">
                  {title === "post" ? "Add a brand" : "Edit a brand"}
                </h1>
                <Field
                  as={TextField}
                  label="Position"
                  sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                  type="number"
                  name="position"
                  className="w-[100%] mb-3 outline-none py-0"
                  helperText={
                    <ErrorMessage
                      name="position"
                      component="p"
                      className="mb-3 text-red-500 text-center"
                    />
                  }
                />
                <div>
                  <input
                    type="file"
                    name="file"
                    className="w-[100%] mb-3 outline-none py-0"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("file", event.currentTarget.files ? event.currentTarget.files[0] : undefined);
                    }}
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="mb-3 text-red-500 text-center"
                  />
                </div>
                <Button
                  sx={{ fontSize: "16px", fontWeight: "600", backgroundColor: "#D55200", "&:hover": { background: "#D52200" } }}
                  variant="contained"
                  type="submit"
                  className="w-[100%] py-3"
                >
                  {title === "post" ? "Add" : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
