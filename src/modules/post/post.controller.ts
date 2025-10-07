import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import postService from "./post.service";
import commentRouter from "../comment/comment.controller";

const router = Router();
router.use("/:postId/comment",commentRouter);
router.post("/",isAuthenticated(),postService.create);

router.patch("/:id",isAuthenticated(),postService.addReaction);

//public
router.get("/:id",postService.getSpecific);
router.delete("/:id",isAuthenticated(),postService.deletePost);


export default router;