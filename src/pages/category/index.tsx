import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalCategory} from "@modals"
import {GlobalTable ,  GlobalSearch , GlobalPogination} from "@ui";
import useCategoryStore from "@stor-category"



function index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [parms , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataCategory , dataCategory , isLoader , totlCount} =  useCategoryStore();
const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
  getDataCategory(parms);
},[parms , change]);

useEffect(()=>{
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const search = params.get("search");
  const searchString =  search ? search  : ""
  const pageNuber = page ? parseInt(page): 1;
  setParams(preParams=>({
     ...preParams,
      page:pageNuber,
      search:searchString
  }));
  setChange(searchString)
  
},[location.search]);




 // Props Global teble -------------->
 const theder = [
  {title: "S/N" , value:"t/r"},
  {title: "Category" , value:"name"},
  {title: "Action" , value:"action2"}
]


//--- pagination tett mui <----
const changePage = (value:number)=>{
  setParams(preParams=>({
      ...preParams,
      page:value
  }));
}
//=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-


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

   <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} />
  </>
}

export default index