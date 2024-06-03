import request from "../config"

// ----------------> Interface Services Brand <-------------------------------------
export interface postData{
    brand_name: string;
    brand_description: string;
    position:number|string;
    image:string;
}

export interface UpdateData{
    id:number;
    putData: postData;
}


interface Brand{
    post : (data:postData)=> any,
    delete : (id:number)=> any,
    get : ()=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Srore Brand <--------------------
export interface StoreBrand {
    isLoader:boolean;
    dataBrands:any[];
    totlCount:number;
    getBrand: ()=> Promise <any>;
    postBrand: (data:postData)=> Promise <any>;
    deleteBrand: (id:number)=> Promise <any>;
    updateBrand: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Brand <----------------------------
export const brand:Brand = {
    post: (data)=> request.post("/api/brand/create" , data),
    delete: (id)=> request.delete(`/api/brand/delete/${id}`),
    get: ()=> request.get(`/api/brand/get-all/q`),
    update: (data)=> request.put(`/api/brand/update/${data.id}`, data.putData)
}