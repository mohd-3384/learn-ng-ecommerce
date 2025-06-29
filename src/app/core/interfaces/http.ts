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

export interface IProducts {
  id: number,
  title: string,
  image: string,
  price: number,
  description: string,
  brand: string,
  model: string,
  color: string,
  category: string,
  discount: number,
  popular?: boolean,
  isAddedToCart: boolean;
}
