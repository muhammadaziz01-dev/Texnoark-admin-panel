import request from "../config"

// ----------------> Interface Services Banner <-------------------------------------
export interface postData {
    position?: string| number;
    file?: Blob;
  }

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface getBanner{
    search?: string;
    page?:number;
    limit?:number;
}


interface Banner{
    get : ()=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:any | any)=> any,
}

// ---------> Interface Srore Brand <--------------------
export interface StoreBanner {
    isLoader:boolean;
    dataBanner:any[];
    totlCount:number;
    getBanner: ()=> Promise <any>;
    postBanner: (data:FormData)=> Promise <any>;
    deleteBanner: (id:number)=> Promise <any>;
    updateBanner: (data:{id:string|number , putData:FormData})=> Promise <any>;

}




// ----------------> Instance Brand <----------------------------
export const banner:Banner = {
    get: ()=> request.get(`/ads`),
    post: (data)=> request.post("/ads/create" , data),
    delete: (id)=> request.delete(`/ads/delete/${id}`),
    update: (data)=> request.put(`/ads/update/${data.id}`, data.putData),
    
}