import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer ,} from "react-toastify";


import useBrandStore from "@store-brand";
import {GlobalTable , GlobalSearch} from "@ui";
import {ModalBrand} from "@modals"
function index() {
  const navigate = useNavigate();
  const [change, setChange] = useState("")
  const [parms , setParams] = useState({limit: 10, page:1 , search:change})
  const {getBrand , dataBrands , isLoader} = useBrandStore();
  
  // -> Function getBrand -------------->
  useEffect(() => {
    getBrand(parms);
  }, [parms , change]);
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
  // <- Function getBrand <--------------


  // Props Global teble -------------->
  const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Brand" , value:"name"},
    {title: "Action" , value:"action"}
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
      <ModalBrand title="post"/>
    </div>
    <GlobalTable heders={theder} body={dataBrands} skelatonLoader={isLoader}/>
  </>
}

export default index