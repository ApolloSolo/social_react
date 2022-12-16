import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () => {
    axios
      .get("/api/posts", {
        withCredentials: true
      })
      .then((res) => {
        return res.data;
      });
  });

  /* return (
    <div className="posts">
      {data.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  ); */
};

export default Posts;
