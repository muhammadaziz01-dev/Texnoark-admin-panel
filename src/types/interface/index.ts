// --------- Authorization  -------------

export interface Signin{
    email: string;
    password: string;
}

export interface Signup extends Signin{
    first_name: string;
    last_name: string;
    phone_number: string;
}


export interface Request{
    signin:(data:Signin)=>any,
    signup:(data:Signup)=>any,
    logout: () => void;
}

// ------------------------------------