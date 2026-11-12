export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'user';
  country: string;
  status: 'active' | 'inactive';
};
