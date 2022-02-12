import Article from "./model.article.mjs";
import Reference from "./model.reference.mjs";

import DB_HANDLER from "./dbHandler.mjs";

const createArticle = async (req, res) => {
  const article = new Article(req.body);
  try {
    // Verify if we already have another article wht the same code:
    const existingArticle = await Article.findOne({ id: article.id });
    if (existingArticle) {
      return res.status(400).json({
        error: "Article with id " + article.id + " already exists!",
      });
    }
    await article.save();
    return res.status(201).json({ message: "Successfully created article!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const findArticleById = async (req, res, next) => {
  try {
    const article = await Article.find({ id: req.params.idA });
    if (!article) {
      return res.status(400).json({
        error: "Article not found",
      });
    }
    req.article = article;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Could not retrieve article!" });
  }
};

const readArticle = (req, res) => {
  // create a JSON object:
  let response = {
    article: req.article,
    references: [],
  };

  // Is the response.reference empty?
  if (response.article.length === 0) {
    return res.status(404).json({
      error:
        "Article with the id " + req.params.idA + " not found in the database!",
    });
  }

  // Find the references for this article:
  Reference.find({ articleID: req.params.idA })
    .then((references) => {
      response.references = references;
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Could not retrieve references!",
      });
    });
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { id: req.params.idA },
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(400).json({
        error: "Article not found",
      });
    }
    return res.status(200).json({ message: "Successfully updated article!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ id: req.params.idA });
    if (!article) {
      return res.status(400).json({
        error: "Article not found",
      });
    }
    return res.status(200).json({ message: "Successfully deleted article!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const listArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    if (!articles) {
      return res.status(400).json({
        error: "Could not retrieve articles!",
      });
    }
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(400).json({ error: "Could not retrieve articles!" });
  }
};

const createReference = async (req, res) => {
  const reference = new Reference(req.body);
  try {
    // Verify if we already have another reference wht the same code:
    const existingReference = await Reference.findOne({ id: reference.id });
    if (existingReference) {
      return res.status(400).json({
        error: "Reference with code " + reference.code + " already exists!",
      });
    }
    await reference.save();
    return res.status(201).json({ message: "Successfully created reference!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const findReferenceById = async (req, res, next) => {
  try {
    const reference = await Reference.find({ id: req.params.idR });
    if (!reference) {
      return res.status(400).json({
        error: "Reference not found",
      });
    }
    req.reference = reference;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Could not retrieve reference!" });
  }
};

const readReference = async (req, res) => {
  // create a JSON object:
  let response = {
    reference: req.reference,
    articles: [],
  };

  // Is the response.reference empty?
  if (response.reference.length === 0) {
    return res.status(404).json({
      error:
        "Reference with the code " +
        req.params.id +
        " not found in the database!",
    });
  }

  // Find the articles for this reference:
  Article.find({ id: req.reference[0].articleID })
    .then((articles) => {
      response.articles = articles;
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Could not retrieve articles!",
      });
    });
};

const updateReference = async (req, res) => {
  try {
    const reference = await Reference.findOneAndUpdate(
      { id: req.params.idR },
      req.body,
      { new: true }
    );
    if (!reference) {
      return res.status(400).json({
        error: "Reference not found",
      });
    }
    return res.status(200).json({ message: "Successfully updated reference!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const deleteReference = async (req, res) => {
  try {
    const reference = await Reference.findOneAndDelete({
      id: req.params.idR,
    });
    if (!reference) {
      return res.status(400).json({
        error: "Reference not found",
      });
    }
    return res.status(200).json({ message: "Successfully deleted reference!" });
  } catch (error) {
    return res.status(400).json({
      error: DB_HANDLER.getErrorMessage(error),
    });
  }
};

const listReferences = async (req, res) => {
  try {
    const references = await Reference.find();
    if (!references) {
      return res.status(400).json({
        error: "Could not retrieve references!",
      });
    }
    return res.status(200).json(references);
  } catch (error) {
    return res.status(400).json({ error: "Could not retrieve references!" });
  }
};

export default {
  createArticle,
  findArticleById,
  readArticle,
  listArticles,
  updateArticle,
  deleteArticle,

  createReference,
  findReferenceById,
  readReference,
  listReferences,
  updateReference,
  deleteReference,
};
