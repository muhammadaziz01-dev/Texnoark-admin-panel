
import {
  Table,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Paper,
  Skeleton,
  Button,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import {  useSearchParams } from "react-router-dom";

import { Props } from "@globol-interface";
import { ModalDelete , ModalBrand , ModalCategory , ModalSubCategory , ModalBrandCategory , ModalProduct} from "@modals"


function indec({ heders, body, skelatonLoader }: Props) {

  const navigate = useNavigate();
  // const [searchPaams] = useSearchParams();
  // const page = Number(searchPaams.get("page")) || 1;
  // const limit = Number(searchPaams.get("limit")) || 8;


  return (
    <>
      
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {heders?.map((heder, index) => {
                    return (
                      <TableCell key={index}>
                        <TableSortLabel>{heder.title}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  skelatonLoader ? Array.from(new Array(5)).map((_, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((_, index2)=>{
                          return <TableCell key={index2}><Skeleton /></TableCell>
                        })
                      }
                    </TableRow> 
                  })

                    :  body?.length > 0 ?  
                    body?.map((body, index)=>{
                      return <TableRow key={index}>
                        {
                          heders?.map((heder, index2)=>{
                            return <TableCell key={index2}>{
                              heder.value == "action" ? <div className="flex items-center gap-2">
                                  <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand"/></div>
                                   <ModalBrand title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "action2" ? <div className="flex items-center gap-2">
                                 <div className=' text-gray-500'><ModalDelete id={body?.id} title="category"/></div>
                                 <ModalCategory title="put" id={body?.id} data={body}/>
                                 <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/category/${body?.id}`)}}  className=' text-gray-500'><VisibilityIcon/></Button>
                              </div>
                              :heder.value == "action3" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="sub-category"/></div>
                              <ModalSubCategory title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "action4" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand-category"/></div>
                              <ModalBrandCategory title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "action5" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="product"/></div>
                              <ModalProduct title="put" id={body?.id} data={body}/>
                              {/* <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/category/${body?.id}`)}}  className=' text-gray-500'><VisibilityIcon/></Button> */}
                              </div>
                              : heder.value == "t/r" ? <>{index + 1 }</> 
                              // : heder.value == "parent_category_id" ? <>{body?.parent_category_id?.name }</>
                              : (body[heder.value])
                            }</TableCell>
                          })
                        }
                      </TableRow>
                    })
                    : <TableRow>
                      <TableCell colSpan={heders?.length}>No information yet</TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default indec;
