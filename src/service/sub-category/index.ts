import request from "../config"

// ----------------> Instance Services Sub Category<-------------------------------------
export interface postCategory{
    name: string, 
    parent_category_id:number,
}

export interface UpdateCategory {
    id:number;
    updateData : postCategory
}

export interface GetCategory{
    id?:number;
    search?: string,
    page?:number;
    limit?:number;
}




interface SubCategory{
    getSubCatigory : (data:GetCategory)=> any,
    postSubCatigory : (data:postCategory)=> any,
    deleteSubCatigory : (id:number)=> any,
    updateSubCatigory : (data:UpdateCategory)=> any,
}

// ---------> Interface Srore Sub Category <--------------------
export interface StoreSubCategory {
    isLoader:boolean;
    dataSubCatigory:any[];
    totlCount:number;
    getDataSubCatigory: (data:GetCategory)=> Promise <any>;
    postDataSubCatigory: (data:postCategory)=> Promise <any>;
    deleteDataSubCatigory: (id:number)=> Promise <any>;
    updateDataSubCatigory: (data:UpdateCategory)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const subCategory:SubCategory = {
    getSubCatigory: (data)=> request.get(`/sub-category/search/${data?.id}?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    deleteSubCatigory: (id)=> request.delete(`/sub-category/delete/${id}`),
    postSubCatigory: (data)=> request.post("/sub-category/create" , data),
    updateSubCatigory: (data)=> request.patch(`/sub-category/update/${data.id}`, data.updateData),
}