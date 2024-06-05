import request from "../config"

// ----------------> Instance Services Category<-------------------------------------
export interface postCategory{
    name: string,
    parent_category_id?: number 
}

export interface UpdateCategory {
    id:number;
    updateData : postCategory
}

export interface GetCategory{
    page:number;
    limit:number;
}




interface Category{
    getCatigory : (data:GetCategory)=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,


    // getSubCategoryId: (id:number)=> any,
}

// ---------> Interface Srore Category <--------------------
export interface StoreCategory {
    isLoader:boolean;
    dataCategory:any[];
    dataSubCategory:any[];
    totlCount:number;
    subCategoryCount:number;
    getDataCategory: (data:GetCategory)=> Promise <any>;
    deleteDataCategory: (id:number)=> Promise <any>;
    postDatacategory: (data:postCategory)=> Promise <any>;
    updateDataCategory: (data:UpdateCategory)=> Promise <any>;

    // getDataSubCategoryId: (id:number)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const category:Category = {
    getCatigory: (data)=> request.get(`/category?limit=${data.limit}&page=${data.page}`),
    deleteCategory: (id)=> request.delete(`/category/${id}`),
    postCatigory: (data)=> request.post("/category" , data),
    updateCategory: (data)=> request.patch(`/category/${data.id}`, data.updateData),


    // getSubCategoryId: (id)=> request.get(`/api/category/get-all-subcategory/${id}/q`)
}