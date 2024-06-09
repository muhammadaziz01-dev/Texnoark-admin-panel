import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useSubCategoryStore from "@store-sub-category";
import {GlobalTable , GlobalSearch , GlobalPogination} from "@ui"
import {ModalSubCategory} from "@modals"
function subcategory() {
   const navigate = useNavigate();
    const { subcategory } = useParams();
    const subCatigoryId = Number(subcategory);
    const {getDataSubCatigory , dataSubCatigory , isLoader ,totlCount } = useSubCategoryStore();
    const [serach , setSearch] =useState("");
    const [params , setParams] = useState({id:subCatigoryId ,limit:10 , page:1 , search:serach})
    const totleCuont2 = Math.ceil(totlCount / params?.limit)

    // console.log(subCatigoryId);
    

    //Function useEffect is getDataSubCategory <-----
     useEffect(()=>{
      getDataSubCatigory(params)
     },[params , serach])
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
      setSearch(searchString)
      
    },[location.search]);
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

   //  Props data ClobalTeble <----------------
     const theder = [
        {title: "S/N" , value:"t/r"},
        {title: "Subcategory" , value:"name"},
        {title: "Parent ID" , value:"parent_category_id"},
        {title: "Action" , value:"action3"}
      ]
   //  =-=-=-=--=----=-=-=-===-=--=-=-=-=-=-=-=-=-=-



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
       setSearch(search)
       setParams(preParams=>({ ...preParams, search }))
       const searchParams = new URLSearchParams(location.search);
         searchParams.set("search", search)
         navigate (`?${searchParams}`)
 
 }
 ///---------------------


    //=-=-=-=--=----=-=-=-===-=--=-=-=-=-=-=-=-=-=-
  return <>
     <ToastContainer />
     <div className="py-3 flex items-center justify-between">
         <GlobalSearch search={serach} hendelChange={hendalChange} />
        <ModalSubCategory title="post" />
     </div>
     <GlobalTable heders={theder} body={dataSubCatigory} skelatonLoader={isLoader}/>
     <GlobalPogination totleCuont={totleCuont2} page={params?.page} setParams={changePage}/>
  </>
}

export default subcategory