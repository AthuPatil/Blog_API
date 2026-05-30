const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const search = req.query.search || "";

    const query = {
      title: {
        $regex: search,
        $options: "i"
      }
    };

    const posts = await Post.find(query)
      .populate("author", "name email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      posts
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSinglePost = async (req, res) => {
  try {

    const post = await Post.findById(
      req.params.id
    ).populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (
      post.author.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    post.title =
      req.body.title || post.title;

    post.content =
      req.body.content || post.content;

    await post.save();

    res.json(post);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (
      post.author.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};