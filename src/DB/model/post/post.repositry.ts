import { IPost } from "../../../utlis";
import { AbstractRepostory } from "../../abstract.repository";
import { Post } from "./post.model";

export class PostRepostory extends AbstractRepostory<IPost>{
    constructor(){
        super(Post);
    }
} 