
export interface UserRegistration {
  username: string;
  password: string;
  confirmPassword: string;
  documentType: 'cpf' | 'cnpj';
  documentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
