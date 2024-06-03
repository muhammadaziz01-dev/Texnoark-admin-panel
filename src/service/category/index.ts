import request from "../config"

// ----------------> Instance Services <-------------------------------------
export interface postData{
    category_name: string;
}

export interface UpdateData extends postData{
    category_id:string;
}

interface getParams{
    page:number;
    limit:number;
}



interface Category{
    post : (data:postData)=> any,
    delete : (id:string)=> any,
    get : (params:getParams)=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Srore Category <--------------------
export interface StoreCategory {
    isLoader:boolean;
    data:any[];
    totlCount:number;
    getData: (params:getParams)=> Promise <any>;
    postData: (data:postData)=> Promise <any>;
    deleteData: (id:string)=> Promise <any>;
    updateData: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const category:Category = {
    post: (data)=> request.post("/category" , data),
    delete: (id)=> request.delete(`/category/${id}`),
    get: (params)=> request.get(`/categories?page=${params.page}&limit=${params.limit}`),
    update: (data)=> request.put(`/category`, data)
}