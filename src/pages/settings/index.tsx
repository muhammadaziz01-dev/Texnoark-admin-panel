import { useEffect , useState } from "react"

import {auth} from "@service-auth";
import{getCookies , removeCookiesAll} from "@coocse"

function index() {

    const [adminData, setAdminData] = useState<any>({})

    const getAdminData = async(id:number) => {
        try{
            const respons = await auth.getAdminId(id)
            if(respons.status === 200){
                setAdminData(respons.data)
            }
             
        }catch(err){
            console.log(err)
        }
    }

 // function useEffect <-------------------
useEffect(()=>{
    const adminId = Number(getCookies("admin_id"));
    getAdminData(adminId);

},[]);

 //=-=-=-=-=-=-=-=-=-=-=---=--=-=-=-=-=-=-=-=-=



  return <>
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex items-center justify-around">
        <div>
            <img src="https://t4.ftcdn.net/jpg/03/59/09/01/360_F_359090172_vsL1da5fNVENKKMoQTq7NSwPPrllQcRB.jpg" alt="Admin img" />
        </div>
        <div className="flex items-start gap-[60px]">
            <div className="flex flex-col items-start gap-3">
                <div>
                   <h2 className=" inline-block border-b">First name</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.first_name}</h1>
                </div>
                <div>
                   <h2 className=" inline-block border-b">Last name</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.last_name}</h1>
                </div>
                <div>
                   <h2 className=" inline-block border-b">Phone number</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.phone_number}</h1>
                </div>
            </div>
            <div className="flex flex-col items-start gap-3">
                <div>
                   <h2 className=" inline-block border-b">Email</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.email}</h1>
                </div>
                <div>
                    <h2 className=" inline-block border-b">Created at</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.createdAt ? adminData?.createdAt.slice(0, 10) :"" }</h1>
                </div>
                <div>
                    <h2 className=" inline-block border-b">Updated at</h2>
                    <h1 className="text-[18px] font-semibold">{adminData?.updatedAt ? adminData?.updatedAt.slice(0, 10) :"" }</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="py-2 px-5 rounded-md bg-[#D55200] text-white font-medium hover:bg-[rgb(213,110,0)] duration-300 active:bg-[#D55200]">update</button>
                    <button className="py-2 px-5 rounded-md bg-red-500 text-white font-medium hover:bg-red-700 duration-300 active:bg-red-500">delete</button>
                </div>
            </div>
        </div>
    </div>
  </div>
  </>
}

export default index