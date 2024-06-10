
import request from "../config"

// ----------------> Interface Services Product<-------------------------------------
export interface postData{
    name: string;
    price: number| string;
    category_id:number;
    brand_category_id:number;
    brand_id:number;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface getProduct{
    search?: string;
    page?:number;
    limit?:number;
}

export interface ProductsId {
    [index :string] :unknown |any
}


interface Product{
    get : (data:getProduct)=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
    getId : (id:number)=> any,
}

// ---------> Interface Srore Product<--------------------
export interface StoreProduct{
    isLoader:boolean;
    dataProduct:any[];
    totlCount:number;
    productsId: ProductsId | null
    getProduct: (data:getProduct)=> Promise <any>;
    postProduct: (data:any)=> Promise <any>;
    deleteProduct: (id:number)=> Promise <any>;
    updateProduct: (data:UpdateData)=> Promise <any>;
    getProductId: (id:number)=> Promise <any>;
}




// ----------------> Instance Product <----------------------------
export const product:Product = {
    get: (data)=> request.get(`/products/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/products/create" , data),
    delete: (id)=> request.delete(`/products/delete/${id}`),
    update: (data)=> request.patch(`/products/update/${data.id}`, data.putData),
    getId: (id)=> request.get(`/products/${id}`)
}