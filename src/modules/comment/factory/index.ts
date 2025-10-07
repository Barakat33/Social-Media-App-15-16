import { Types, Document } from "mongoose";
import { IAttachment, IReaction, IComment, IUser } from "../../../utlis";

export class Comment {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentIds: Types.ObjectId[];
  content: string;
  reactions: IReaction[];
  attachments: IAttachment[];
  mentions: Types.ObjectId[];
    static postId: Types.ObjectId;

  constructor(params: {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    parentIds: Types.ObjectId[];
    content: string;
    reactions: IReaction[];
    attachments: IAttachment[];
    mentions: Types.ObjectId[];
  }) {
    this.userId = params.userId;
    this.postId = params.postId;
    this.parentIds = params.parentIds;
    this.content = params.content;
    this.reactions = params.reactions;
    this.attachments = params.attachments;
    this.mentions = params.mentions;
  }
}

export class CommentFactoryService {

    
  createComment = (
    createCommentDTO: { content: string; attachments?: any },
    user: IUser & Document,
    post: { _id: Types.ObjectId },
    parentComment?: { _id: Types.ObjectId } | null
    ):
    IComment => {

    const newComment: IComment = {
    content: createCommentDTO.content,
    userId: user._id,
    postId: post._id || Comment.postId,
    parentId: parentComment?._id || null,
    reactions: [],
    attachments: [],
    mentions: [],
    };
    return newComment;
    };
}

