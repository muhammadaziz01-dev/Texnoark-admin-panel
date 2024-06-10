
import request from "../config"

// ----------------> Interface Services Stock<-------------------------------------
export interface postData{
    quantity: number| string;
    category_id:number;
    product_id:number;
    brand_id:number;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}



export interface ProductsId {
    [index :string] :unknown |any
}


interface Stock{
    get : ()=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,

}

// ---------> Interface Srore Stock<--------------------
export interface StoreStock{
    isLoader:boolean;
    dataStock:any[];
    totlCount:number;
    getStock: ()=> Promise <any>;
    postStock: (data:any)=> Promise <any>;
    deleteStock: (id:number)=> Promise <any>;
    updateStock: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance stock <----------------------------
export const stock:Stock = {
    get: ()=> request.get(`/stock`),
    post: (data)=> request.post("/stock/create" , data),
    delete: (id)=> request.delete(`/stock/delete/${id}`),
    update: (data)=> request.patch(`/stock/update/${data.id}`, data.putData),

}