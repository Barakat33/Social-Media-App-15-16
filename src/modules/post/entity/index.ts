import { Types } from "mongoose";
import { IAttachment, IReaction } from "../../../utlis";

export class Post {
  userId: Types.ObjectId;
  content: string;
  reactions: IReaction[] = [];
  attachments?: IAttachment[];

  constructor(params: {
    userId: Types.ObjectId;
    content: string;
    reactions?: IReaction[];
    attachments?: IAttachment[];
  }) {
    this.userId = params.userId;
    this.content = params.content;
    this.reactions = params.reactions ?? [];
    if (params.attachments !== undefined) {
      this.attachments = params.attachments;
    }
  }
}
