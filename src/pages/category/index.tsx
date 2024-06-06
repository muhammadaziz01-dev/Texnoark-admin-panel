import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";

import {ModalCategory} from "@modals"
import {GlobalTable} from "@ui";
import useCategoryStore from "@stor-category"



function index() {

const [dataGet ,] = useState({limit: 10, page:1})
const {getDataCategory , dataCategory , isLoader} =  useCategoryStore();

useEffect(() =>{
  getDataCategory(dataGet);
},[]);


 // Props Global teble -------------->
 const theder = [
  {title: "S/N" , value:"t/r"},
  {title: "Category" , value:"name"},
  {title: "Action" , value:"action2"}
]
  return <>
  <ToastContainer />
  <div className="py-3">
    <ModalCategory title="post" 
    />
  </div>
   <GlobalTable heders={theder} body={dataCategory} skelatonLoader={isLoader}/>
  </>
}

export default index