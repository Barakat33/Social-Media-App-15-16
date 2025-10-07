import { CreatePostDTO } from "./post.dto";
import { Request, Response, RequestHandler } from "express";
import { PostFactoryService } from "./factory";
import { PostRepostory } from "../../DB";
import { IAuthUser, NotAuthorizedException, NotFoundException, REACTION } from "../../utlis";
import { addReactionProvider } from "../../utlis/common/providers/react.provider";

class PostService {
  private readonly postFactoryService = new PostFactoryService();
  private readonly postRepository = new PostRepostory();

  public create = async (req: Request, res: Response) => {
    // get data from req
    const createPostDTO: CreatePostDTO = req.body;

    // factory → prepare post object
    const post = this.postFactoryService.createPost(createPostDTO, (req as IAuthUser).user);

    // repository → save in DB
    const createdPost = await this.postRepository.create(post);

    // send response
    res.status(201).json({
      message: "Post created successfully",
      success: true,
      data: createdPost,
    });
  };

  public addReaction = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const { reaction } = req.body;
    console.log({ reaction });

    // ensure id is a defined string
    if (typeof id !== "string" || !id) {
      throw new NotFoundException("post id is required");
    }

    const userId = req.user._id.toString();
    await addReactionProvider(this.postRepository, id, userId, reaction);

    // send response
    res.sendStatus(204);
  };

  public getSpecific= async (req:Request,res:Response) => {
    // get data from req
    const { id } = req.params;
    const post = await this.postRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: "userId", select: "fullName" },
          { path: "reactions.userId", select: "fullName fristName lastName" },
          { path: "comments.userId",match:{parentIds:[]}},
        ],
      }
    );
    if (!post) throw new NotFoundException("post not found");
    res
      .status(200)
      .json({ message: "done", success: true, data: { post } });
   };

   public deletePost=   async(req:Request,res:Response)=>{
    //get data from req
    const {id} = req.params;
    //check post exist
    const postExist = await this.postRepository.exist({_id:id});
    if(!postExist) throw new NotFoundException("post not found");
    //check 
    if(postExist.userId.toString() !== (req as IAuthUser).user._id.toString())
       throw new NotAuthorizedException("You are not authorized to delete this post");
    //delete post
    await this.postRepository.delete({ _id: id });
    //send response
    res.status(200).json({
        message:"post deleted successfully",
        success:true,
        data:{postExist}
    })
}
}

export default new PostService();
