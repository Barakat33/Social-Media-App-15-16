import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utlis";

export class Comment{
    userId: ObjectId;
    postId: ObjectId;
    parentId: ObjectId;
    content: string;
    reactions: IReaction[];
    attachments?: IAttachment[];
    mentions?: ObjectId[];

    constructor(params: {
        userId: ObjectId;
        postId: ObjectId;
        parentId: ObjectId;
        content: string;
        reactions?: IReaction[];
        attachments?: IAttachment[];
        mentions?: ObjectId[];
    }){
        this.userId = params.userId;
        this.postId = params.postId;
        this.parentId = params.parentId;
        this.content = params.content;
        this.reactions = params.reactions ?? [];
        this.attachments = params.attachments ?? [];
        this.mentions = params.mentions ?? [];
    }
}
    
