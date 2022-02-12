import express from "express";
import controller from "./controller.mjs";

const router = express.Router();

//* @route   GET + POST
// for the route : api/articles
router
  .route("/api/articles")
  .get(controller.listArticles)
  .post(controller.createArticle);

//* @route   GET + POST
// for the route : api/references
router
  .route("/api/references")
  .get(controller.listReferences)
  .post(controller.createReference);

//* @route   GET + PUT + POST + DELETE  api/articles/:id
router
  .route("/api/articles/:idA")
  .get(controller.readArticle)
  .post(controller.createArticle)
  .put(controller.updateArticle)
  .delete(controller.deleteArticle);

//* @route GET + PUT + POST + DELETE api/references/:id
router
  .route("/api/references/:idR")
  .get(controller.readReference)
  .post(controller.createReference)
  .put(controller.updateReference)
  .delete(controller.deleteReference);

router.param("idA", controller.findArticleById);
router.param("idR", controller.findReferenceById);

export default router;
