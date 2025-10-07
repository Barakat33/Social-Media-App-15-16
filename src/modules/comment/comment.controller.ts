import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import CommentService from "./comment.service";

const router =Router( {mergeParams:true , caseSensitive:true});

router.post("{/:id}",isAuthenticated(),CommentService.create)
router.get("{/:id}",isAuthenticated(),CommentService.getSpecific)
router.delete("{/:id}",isAuthenticated(),CommentService.deletcomment)
router.patch("{/:id}",isAuthenticated(),CommentService.addReaction)
export default router;