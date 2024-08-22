
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
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import {  useSearchParams } from "react-router-dom";

import { Props } from "@globol-interface";
import { ModalDelete , ModalBrand , ModalBrandSingle , ModalCategory , ModalSubCategory , ModalBrandCategory , ModalProduct , ModalStock , ModalBaner} from "@modals"


function indec({ heders, body, skelatonLoader }: Props) {

  const navigate = useNavigate();
  const [searchPaams] = useSearchParams();
  const page = Number(searchPaams.get("page")) || 1;
  const limit = Number(searchPaams.get("limit")) || 10;


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
                                   <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/brands/${body?.id}`)}}  className=' text-gray-500'><ShortcutIcon/></Button>
                              </div>
                              :heder.value == "action2" ? <div className="flex items-center gap-2">
                                 <div className=' text-gray-500'><ModalDelete id={body?.id} title="category"/></div>
                                 <ModalCategory title="put" id={body?.id} data={body}/>
                                 <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/category/${body?.id}`)}}  className=' text-gray-500'><ShortcutIcon/></Button>
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
                              <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/products/${body?.id}`)}}  className=' text-gray-500'><VisibilityIcon/></Button>
                              </div>
                              :heder.value == "action6" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="brand-category"/></div>
                              <ModalBrandSingle title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "banner" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="banner"/></div>
                              <ModalBaner title="put" id={body?.id} data={body}/>
                              </div>
                              :heder.value == "action7" ? <div className="flex items-center gap-2">
                              <div className=' text-gray-500'><ModalDelete id={body?.id} title="stock"/></div>
                              <ModalStock title="put" id={body?.id} data={body}/>
                             {/* <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/products/${body?.id}`)}}  className=' text-gray-500'><VisibilityIcon/></Button> */}
                              </div>
                              : heder.value == "t/r" ? <>{page * limit -(limit - 1) +index }</> 
                              : heder.value == "image" ? <><img className="w-[120px] h-[40px] object-contain" src={body?.image} alt="brand logo" /></> 
                              : heder.value == "price" ? <>{body?.price} $</> 
                              : heder.value == "product_id?.name" ? <>{body?.product_id?.name}</> 
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
