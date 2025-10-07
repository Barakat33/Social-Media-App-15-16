import { AbstractRepostory } from "../../abstract.repository";
import { IComment } from "../../../utlis";
import { Comment } from "./comment.model";
 
export class CommentRepository extends AbstractRepostory<IComment> {
    constructor() {
        super(Comment)
    }
}
    
