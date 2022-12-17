import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getAllPosts = async () => {
      const res = await axios.get("/api/posts");
      console.log(res.data);
      setPosts(res.data);
      setIsLoading(false);
    };
    getAllPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="posts">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
