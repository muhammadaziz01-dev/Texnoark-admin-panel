import  request  from "../config";
import { Request } from "@interface";


const auth:Request={
    signin: (data)=> request.post("/auth/sign-in",data),
    signup: (data)=> request.post("/auth/admin/sign-up",data),
    
    getAdminId: (id)=> request.get(`/admin/${id}`),
    deleteAdminId: (id)=> request.delete(`/admin/${id}`),
    updateAdminId: (data)=> request.patch(`/admin/${data.id}`, data.updateData),

    logout: ()=> request.post("/api/admin/logout"),
}


export { auth }