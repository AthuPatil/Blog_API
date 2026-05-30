const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (
  req,
  res
) => {
  try {

    const post = await Post.findById(
      req.params.postId
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const comment =
      await Comment.create({
        text: req.body.text,
        user: req.user.id,
        post: req.params.postId
      });

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getComments = async (
  req,
  res
) => {
  try {

    const comments =
      await Comment.find({
        post: req.params.postId
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteComment = async (
  req,
  res
) => {
  try {

    const comment =
      await Comment.findById(
        req.params.id
      );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (
      comment.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};