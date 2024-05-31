// --------- Authorization  -------------

export interface Signin{
    username: string;
    password: string|number;
}

export interface Signup extends Signin{
    name: string;
    phone: string;
}

export interface ResetPassword{
    email?: string;
    phone?: string|number;
}


export interface Request{
    signin:(data:Signin)=>any,
    signup:(data:Signup)=>any,
    signout:()=>void,
    reset:(data:ResetPassword)=>void
}




// ------------------------------------