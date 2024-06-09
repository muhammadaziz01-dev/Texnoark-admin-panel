import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer ,} from "react-toastify";


import useBrandStore from "@store-brand";
import {GlobalTable , GlobalSearch , GlobalPogination} from "@ui";
import {ModalBrand} from "@modals"
function index() {
  const navigate = useNavigate();
  const [change, setChange] = useState("")
  const [parms , setParams] = useState({limit: 10, page:1 , search:change})
  const {getBrand , dataBrands , isLoader , totlCount} = useBrandStore();
  const totleCuont2 = Math.ceil(totlCount / parms?.limit)
  
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
    {title: "Brand name" , value:"name"},
    {title: "Brand logo" , value:"image"},
    {title: "Action" , value:"action"}
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
      <ModalBrand title="post"/>
    </div>
    <GlobalTable heders={theder} body={dataBrands} skelatonLoader={isLoader}/>
    <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage}/>
  </>
}

export default index