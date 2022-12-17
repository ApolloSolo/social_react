const pg = require("../db/connection");

const getPosts = async (req, res) => {
  try {
    const posts = await pg.query(
      "SELECT posts.*, users.id AS user_id, users.username, users.name, users.profile_img FROM posts INNER JOIN users ON users.id = posts.user_id"
    );
    res.json(posts.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllUserPosts = async (req, res) => {
  try {
    const { user_id } = req.params;
    const queryStr =
      "SELECT posts.*, users.id AS user_id, users.username, users.name, users.profile_img FROM posts INNER JOIN users ON users.id = posts.user_id WHERE users.id = $1";
    const values = [user_id];

    const posts = await pg.query(queryStr, values);

    if (posts.rowCount === 0) {
      throw new Error("Post could not be found!");
    }

    res.json(posts.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOnePostById = async (req, res) => {
  try {
    const { post_id } = req.params;
    const queryStr =
      "SELECT posts.*, users.id AS user_id, users.username, users.name, users.profile_img FROM posts INNER JOIN users ON users.id = posts.user_id WHERE posts.id = $1";
    const values = [post_id];

    const post = await pg.query(queryStr, values);

    if (post.rowCount === 0) {
      throw new Error("Post could not be found!");
    }

    res.json(post.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { description, img, user_id } = req.body;
    const created_at = new Date();
    const queryStr =
      "INSERT INTO posts(description, img, user_id, created_at) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [description, img, user_id, created_at];
    const newPost = await pg.query(queryStr, values);

    res.json(newPost.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { post_id, user_id } = req.params;
    const { description, img } = req.body;
    const queryString =
      "UPDATE posts SET description = $1, img = $2 WHERE id = $3 AND user_id = $4  RETURNING *";
    const values = [description, img, post_id, user_id];
    const updatedPost = await pg.query(queryString, values);
    res.json(updatedPost.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id, user_id } = req.params;

    const queryStr =
      "DELETE from posts WHERE id = $1 AND user_id = $2 RETURNING id";
    const values = [post_id, user_id];

    const deletedPosts = await pg.query(queryStr, values);

    if (deletedPosts.rowCount === 0) {
      throw new Error("Could not delete post");
    }

    res.json(deletedPosts.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost,
  getOnePostById,
  getAllUserPosts
};
