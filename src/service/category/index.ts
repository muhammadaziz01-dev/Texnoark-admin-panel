import request from "../config"

// ----------------> Instance Services Category<-------------------------------------
export interface postCategory{
    name: string,
    parent_category_id?:number ;
}

export interface UpdateCategory {
    id:number;
    updateData : postCategory
}

export interface GetCategory{
    search?: string,
    page?:number;
    limit?:number;
}




interface Category{
    getCatigory : (data:GetCategory)=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,
}

// ---------> Interface Srore Category <--------------------
export interface StoreCategory {
    isLoader:boolean;
    dataCategory:any[];
    totlCount:number;
    getDataCategory: (data:GetCategory)=> Promise <any>;
    deleteDataCategory: (id:number)=> Promise <any>;
    postDatacategory: (data:postCategory)=> Promise <any>;
    updateDataCategory: (data:UpdateCategory)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const category:Category = {
    getCatigory: (data)=> request.get(`/category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    deleteCategory: (id)=> request.delete(`/category/delete/${id}`),
    postCatigory: (data)=> request.post("/category/create" , data),
    updateCategory: (data)=> request.patch(`/category/update/${data.id}`, data.updateData),
}