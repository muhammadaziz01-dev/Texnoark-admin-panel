import {  useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer ,} from "react-toastify";


import useBrandCategoryStore from "@store-brand-category";
import {GlobalTable  , GlobalPogination} from "@ui";
import { ModalBrandSingle} from "@modals"
function index() {
  const { brandId } = useParams();
  const brandCategoryId = Number(brandId);
  const [parms , setParams] = useState({limit: 10, page:1 , id:brandCategoryId})
  const {getCategoryBrandId , dataBrandCategoryId , isLoader , totlCountBrandCategory} = useBrandCategoryStore();
  const totleCuont2 = Math.ceil(totlCountBrandCategory / parms?.limit)
  
  // -> Function getBrand -------------->
  useEffect(() => {
    getCategoryBrandId(parms);
  }, [parms , brandCategoryId]);
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNuber = page ? parseInt(page): 1;
    setParams(preParams=>({
       ...preParams,
        page:pageNuber,
    }));
    
  },[location.search]);
  // <- Function getBrand <--------------


  // Props Global teble -------------->
  const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Brand Category" , value:"name"},
    {title: "Brand ID" , value:"brand_id"},
    {title: "Action" , value:"action6"}
  ]


  //--- pagination tett mui <----
const changePage = (value:number)=>{
  setParams(preParams=>({
      ...preParams,
      page:value
  }));
}
//=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-



  return <>
    <ToastContainer />
    <div className="py-3 flex items-center justify-end">
      <ModalBrandSingle title="post"/>
    </div>
    <GlobalTable heders={theder} body={dataBrandCategoryId} skelatonLoader={isLoader}/>
    <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} />
  </>
}

export default index