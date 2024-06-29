
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { banner ,StoreBanner } from '@banner';
import axios from 'axios';

import {getCookies} from "@coocse" 


const useBannerStore = create <StoreBanner> ((set)=>({
    isLoader: false,
    dataBanner: [],
    totlCount: 0,
    getBanner : async()=>{
        try{
           set({isLoader: true})
           const respons = await banner.get()
        //    console.log(respons)
           if(respons.status === 200){
               set({dataBanner: respons?.data?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
    postBanner: async(data)=>{
        const access_token = getCookies("access_token");
        try {
            const response = await axios.post('https://ecomapi.ilyosbekdev.uz/ads/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization:  `Bearer ${access_token}`
                },
            });
            
            // console.log(response);
            if (response.status === 201) {
                set((state) => ({ dataBanner:  [...state.dataBanner, response?.data?.data] }));
                // set((state) => ({ dataBanner: state.dataBanner.length < 10 ? [...state.dataBanner, response?.data?.data] : [...state.dataBanner] }));
                // set((state)=>({totlCount: state.totlCount += 1}))
                return response?.status;
            }
        } catch (error) {
            console.log(error);
            toast.error("Error: ");
        }

    },
    deleteBanner: async(id)=>{
        try{
           const respons = await banner.delete(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({dataBanner: state.dataBanner.filter((el:any)=>el.id!== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },
    updateBanner: async(data)=>{
        try{
        const respons = await banner.update(data)
        if(respons?.status ===200){
            set((state)=>({dataBanner: state.dataBanner.map((el:any)=>el.id === data?.id ? {...data.putData , id:data?.id} : el)}))
            return respons?.status
        }
        
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBannerStore