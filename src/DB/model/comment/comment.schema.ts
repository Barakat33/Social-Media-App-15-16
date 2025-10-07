import { Schema } from "mongoose";
import { IComment } from "../../../utlis";
import { reactionSchema } from "../common";

export const commentSchema = new Schema<IComment>(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        postId:{
            type: Schema.Types.ObjectId,
            ref:"Post",
            required:true
        },
        parentId:{
            type:Schema.Types.ObjectId,
            ref:"Comment",
            required:false,
            default: null
            },
        content :{type:String},
        reactions:[reactionSchema],
    },
    {timestamps:true , toJSON:{virtuals:true},toObject:{virtuals:true}}
);

commentSchema.virtual("replies", {
    ref:"Comment",
    localField:"_id",
    foreignField:"parentId"
    });

    commentSchema.pre("deleteOne",async function(next){
        const filter =typeof this.getFilter() === "function"? this.getFilter() : {};
        const repiles =await this.model.find({parentId:filter._id})
        if(repiles.length){
            for (const reply of repiles){
                await reply.deleteOne({_id:reply._id });
            }
        }
        next(); //basecase
    })
    