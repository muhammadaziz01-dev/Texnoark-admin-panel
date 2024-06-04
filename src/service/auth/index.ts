import  request  from "../config";
import { Request } from "@interface";

const auth:Request={
    signin: (data)=> request.post("/api/admin/login",data),
    signup: (data)=> request.post("/api/admin/create",data),
    logout: ()=> request.post("/api/admin/logout"),
    getAdminId: (id)=> request.get(`/api/admin/${id}`),
    deleteAdminId: (id)=> request.delete(`/api/admin/${id}`),
    updateAdminId: (data)=> request.put(`/api/admin/${data.id}`, data.updateData),
}


export { auth }