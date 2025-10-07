import { IPost, IUser } from "../../../utlis";
import { CreatePostDTO } from "../post.dto";
import { Document } from "mongoose";

export class PostFactoryService {
  createPost = (createPostDTO: CreatePostDTO, user: IUser & Document): IPost => {
    const newPost: IPost = {
      userId: user._id,
      content: createPostDTO.content,
      reactions: [],
      attachments: createPostDTO.attachments || [],
    };

    return newPost;
  };
}
