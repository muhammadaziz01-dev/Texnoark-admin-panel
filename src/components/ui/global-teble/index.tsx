
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
} from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import {  useSearchParams } from "react-router-dom";

import { Props } from "@globol-interface";
import { ModalDelete , ModalBrand} from "@modals"


function indec({ heders, body, skelatonLoader }: Props) {

  // const navigate = useNavigate();
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

                    :  body?.map((body, index)=>{
                      return <TableRow key={index}>
                        {
                          heders?.map((heder, index2)=>{
                            return <TableCell key={index2}>{
                              heder.value == "action" ? <div className="flex items-center gap-2">
                                  <button className=' text-gray-500'><ModalDelete id={body?.id}/></button>
                                   <ModalBrand title="put" id={body?.id} data={body}/>
                              </div>
                              : heder.value == "t/r" ? <p>{index + 1 }</p>
                              : (body[heder.value])
                            }</TableCell>
                          })
                        }
                      </TableRow>
                    })
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
