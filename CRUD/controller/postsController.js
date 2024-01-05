import Post from "../model/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
    });

    await newPost.save();

    res.status(201).json({ message: "post created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const { title, content } = req.body;

    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log("Deleting post with ID:", postId);

    // Add this line to log the postId
    console.log("Received postId:", postId);

    const deletedPost = await Post.findByIdAndDelete(postId);
    console.log("Deleted post:", deletedPost);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
