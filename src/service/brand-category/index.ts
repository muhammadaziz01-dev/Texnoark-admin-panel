import request from "../config"

// ----------------> Interface Services Brand catigory <-------------------------------------
export interface postData{
    name: string;
    brand_id?:number;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface getBrand{
    search?: string;
    page?:number;
    limit?:number;
}


interface BrandCatigorty{
    get : (data:getBrand)=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Srore Brand Category<--------------------
export interface StoreBrandCategory {
    isLoader:boolean;
    dataBrandsCategory:any[];
    totlCount:number;
    getBrandCategory: (data:getBrand)=> Promise <any>;
    postBrandCategory: (data:any)=> Promise <any>;
    deleteBrandCategory: (id:number)=> Promise <any>;
    updateBrandCategory: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Brand <----------------------------
export const brandCategory:BrandCatigorty = {
    get: (data)=> request.get(`/brand-category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/brand-category/create" , data),
    delete: (id)=> request.delete(`/brand-category/delete/${id}`),
    
    update: (data)=> request.patch(`/brand-category/update/${data.id}`, data.putData)
}