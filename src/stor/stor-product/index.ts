
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { product , StoreProduct } from '@product';


const useProductStore = create <StoreProduct> ((set)=>({
    isLoader: false,
    dataProduct: [],
    totlCount: 0,
    getProduct : async(data)=>{
        try{
           set({isLoader: true})
           const respons = await product.get(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({dataProduct: respons?.data?.data?.products});
               set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postProduct: async(data)=>{
        
            try{
                const respons = await product.post(data)
             //    console.log(respons)
                if(respons.status === 201){
                    set((state)=>({dataProduct: state.dataProduct.length < 10 ? [...state.dataProduct, respons?.data?.data] : [...state.dataProduct]})) 
                    set((state)=>({totlCount: state.totlCount += 1}))
                    return respons?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteProduct: async(id)=>{
        try{
           const respons = await product.delete(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({dataProduct: state.dataProduct.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateProduct: async(data)=>{
            try{
                const respons = await product.update(data)
                if(respons?.status === 200){
                    set((state)=>({dataProduct: state.dataProduct.map((el:any)=>el.id === data?.id ? {...data.putData , id:data.id} : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useProductStore