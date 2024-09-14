// src/types.ts

export interface ICategory {
  _id: string;
  name: string;
  description?: string; // Optional description field
}

export interface IMessage {
  _id: string;
  text: string;
  category: ICategory; // Changed from string to ICategory
  author: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}
// export interface IMessage {
//   _id: string;
//   text: string;
//   category: {
//     _id: string;
//     name: string;
//   };
//   author?: string; // Optional field
//   likes?: number;  // Optional field
// }

export interface IUser {
  id: string;
  name: string;
  email: string;
  // Add other user properties here
}
