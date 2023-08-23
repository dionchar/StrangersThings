/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { deletePost } from "../Helpers/api";
import CreatePostForm from "./CreatePostForm";

function AllPosts({ BASE_URL, token }) {
  // State to store fetched posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({})
  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchUser()
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    fetch(`${BASE_URL}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const fetchUser = async () => {

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);

      setUser (result.data)
    } catch (err) {
      console.error(err);
    }
  }

  const handleDeletePost = async (postId) => {
   
      const response = await deletePost(token, postId);

setPosts(posts => posts.filter(post => post._id !== postId)) 
  };

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <div key={post._id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-price">Price: {post.price}</p> 
            <p className="post-location">Location: {post.location}</p>
            {post?.author?._id === user?._id && (
              <>
                <p>You are the author of this post.</p>
                <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
              </>
            )}
          </div>
        ))}
      </ul>
      <CreatePostForm BASE_URL={BASE_URL} token={token} fetchPosts={fetchPosts} />
    </div>
  );
}

export default AllPosts;
