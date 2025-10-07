import { NotFoundException } from "../../error";
import { CommentRepository, PostRepostory } from "../../../DB";

export const addReactionProvider = async(
    repo: CommentRepository|PostRepostory,
    id:string,
    userId: string,
    reaction?:string,
)=>{
     // check post exist
        const postExist = await repo.exist({ _id: id });
        if (!postExist) throw new NotFoundException("Post not found");
    
        let userReactedIndex = postExist.reactions.findIndex((reaction) => {
          return reaction.userId.toString() === userId;
        });
    
        if (userReactedIndex === -1) {
          // no previous reaction from this user → push if provided
          if (reaction !== undefined && reaction !== null) {
            await repo.update(
              { _id: id },
              {
                $push: {
                  reactions: {
                    reaction: reaction,
                    userId: userId,
                  },
                },
              }
            );
          }
        } else if ([undefined, null, ""].includes(reaction)) {
          // user wants to remove their reaction
          await repo.update(
            { _id: id },
            { $pull: { reactions: { userId: userId } } }
          );
        } else {
          // user updates their existing reaction
          await repo.update(
            { _id: id, "reactions.userId": userId },
            { $set: { "reactions.$.reaction": reaction } }
          );
        }
};
