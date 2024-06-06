import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalCategory} from "@modals"
import {GlobalTable ,  GlobalSearch} from "@ui";
import useCategoryStore from "@stor-category"



function index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [parms , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataCategory , dataCategory , isLoader} =  useCategoryStore();

useEffect(() =>{
  getDataCategory(parms);
},[parms , change]);


 // Props Global teble -------------->
 const theder = [
  {title: "S/N" , value:"t/r"},
  {title: "Category" , value:"name"},
  {title: "Action" , value:"action2"}
]


// Hendel chenge ------>
const hendalChange = (e:any)=>{
  const search = e.target.value;
  setChange(search)
  setParams(preParams=>({ ...preParams, search }))
  const searchParams = new URLSearchParams(location.search);
        searchParams.set("search", search)
        navigate (`?${searchParams}`)

}
///---------------------
  return <>
  <ToastContainer />
  <div className="py-3 flex items-center justify-between">
    <GlobalSearch search={change} hendelChange={hendalChange}/>
    <ModalCategory title="post" 
    />
  </div>
   <GlobalTable heders={theder} body={dataCategory} skelatonLoader={isLoader}/>
  </>
}

export default index