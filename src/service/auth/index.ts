import  request  from "../config";
import { Request } from "@interface";

const auth:Request={
    signin: (data)=> request.post("/api/admin/login",data),
    signup: (data)=> request.post("/api/admin/create",data),
    logout: ()=> request.post("/api/admin/logout"),
}


export { auth }