// frontend/src/types.ts

// src/types.ts

export interface ICategory {
  _id: string;
  name: string;
  description?: string; // Add this if the description is optional
}


// frontend/src/types.ts
export interface IMessage {
    _id: string;  // Add _id if it exists in the data
    text: string;
    category: string;
    author: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // frontend/src/types.ts

export interface IUser {
    id: string;
    name: string;
    email: string;
    // Add other user properties here
  }
  