import { User } from "@/app/comments/comment";

export interface Comment {
    id?: number;
    postId: number;
    content: string;
    author: User;
    avatarUrl?:string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Post {
    id?: number;
    title: string;
    content: string;
    urlImg: string;       
    comments?: Comment[];
    creatorId?: number;
    updaterId?: number;
    createdAt?: string; 
    updatedAt?: string; 
  }