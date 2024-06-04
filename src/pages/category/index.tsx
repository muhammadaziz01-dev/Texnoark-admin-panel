import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import {ModalCategory} from "@modals"
import {GlobalTable} from "@ui";
import useCategoryStore from "@stor-category"



function index() {

const {getDataCategory , dataCategory , isLoader} =  useCategoryStore();

useEffect(() =>{
  getDataCategory();
},[]);


 // Props Global teble -------------->
 const theder = [
  {title: "S/N" , value:"t/r"},
  {title: "Category" , value:"category_name"},
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