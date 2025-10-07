import { Schema } from "mongoose";
import { IReaction, REACTION } from "../../../utlis";

export const reactionSchema = new Schema<IReaction>(
    {
  reaction: {
    type: Number,          
    enum: REACTION,
    set: (value: number | string): number => Number(value),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{timestamps:true}
);