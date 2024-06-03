import axios from "axios";
import { getCookies } from "@coocse";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


// async function  refreshAccsesToken (){
//     console.log("start refresh token function");
//     try{
//    const stored_refresh_token= getCookies("refresh_token"); // refresh_token
//     // console.log(stored_refresh_token);
   
   
//    if(!stored_refresh_token){
//        throw new Error ("Refresh token not found in cookie ") 
//    }else{
//        console.log("get token refresh");
       
//        const response:any = await axios.get(`https://store.go-clothes.uz/v1/token/${stored_refresh_token}`)
//        console.log(response + " refresh data");
//        const {access_token , refresh_token} = response.data;
//        console.log(access_token + " acses token 401 kegin");
//        console.log(refresh_token + " refresh token 401 kegin");
//        setCookies("access_token", access_token);
//        setCookies("refresh_token", refresh_token);
//        return access_token;
//    }
//      console.log("tey blok end");
     
//     }catch(error){
//       console.log(error);
//       console.log("catch blok end");
      
//     }
// }




request.interceptors.request.use((config) => {
    const access_token = getCookies("access_token") 
    if (access_token) {
        config.headers["Authorization"] =  `Bearer ${access_token}`
    }
    return config
})

// request.interceptors.response.use((response:any)=>{
//     return response
// }, async (error :any)=>{
//     if(error.response && error.response.status === 401){
//        const access_token =  await refreshAccsesToken();
//     //    console.log(access_token);
       
//        if(access_token){
//           const originalRequest = error.config
//           originalRequest.headers["Authorization"] = access_token
//        }else{
//          console.error("Access token not found in config file " + error.config)
//          return Promise.reject(error)
//        }
//     }
// })

export default request


