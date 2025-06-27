export interface IRegister {
    name: string;
    email: string;
    password: string;
    repassword: string;
}

export interface ILogin {
    email: string;
    password: string;
}