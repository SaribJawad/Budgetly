export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  walletCreatedOnce: boolean;
}

export interface Wallet {
  walletName: string;
  type: string;
  balance: number;
  currency: string;
  walletOwner: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
