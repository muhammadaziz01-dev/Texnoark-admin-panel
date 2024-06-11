
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

////produc detels ---------------

export interface ProductDetels{
    quantity: number| string;
    colors:number;
    description:string;
    discount: number| string;
    product_id: number;
}

export interface UpdateProductDetels{
    id:number|undefined;
    putDataDetels: ProductDetels;
}



interface Product{
    get : (data:getProduct)=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
    getId : (id:number)=> any,

    deleteProducDetels : (id:number)=> any,
    updateProductDetels : (data:UpdateProductDetels)=> any,

    getProductsBrandId :(id:number)=> any,
}

// ---------> Interface Srore Product<--------------------
export interface StoreProduct{
    isLoader:boolean;
    dataProduct:any[];
    dataProductsBrandId:any[];
    totlCount:number;
    productsId: ProductsId | null
    getProduct: (data:getProduct)=> Promise <any>;
    postProduct: (data:any)=> Promise <any>;
    deleteProduct: (id:number)=> Promise <any>;
    updateProduct: (data:UpdateData)=> Promise <any>;
    getProductId: (id:number)=> Promise <any>;

    deleteProductDetels: (id:number)=> Promise <any>;
    updateProductDetels : (data:UpdateProductDetels)=> Promise <any>;

    getProductsBrandId: (id:number)=> Promise <any>;

}




// ----------------> Instance Product <----------------------------
export const product:Product = {
    get: (data)=> request.get(`/products/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/products/create" , data),
    delete: (id)=> request.delete(`/products/delete/${id}`),
    update: (data)=> request.patch(`/products/update/${data.id}`, data.putData),
    getId: (id)=> request.get(`/products/${id}`),

    deleteProducDetels: (id)=> request.delete(`/product-detail/delete/${id}`),
    updateProductDetels : (data)=> request.patch(`/product-detail/update/${data.id}`, data.putDataDetels),

    getProductsBrandId: (id)=> request.get(`/products/brand/${id}`)

}