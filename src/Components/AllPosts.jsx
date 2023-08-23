/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { deletePost, postMessage } from "../Helpers/api"; // Assuming you have a postMessage function in your Helpers/api.js
import CreatePostForm from "./CreatePostForm";

function AllPosts({ BASE_URL, token }) {
  // State to store fetched posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchUser();
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

  
  const handleMessageSubmit = async (event, postId) => {
    event.preventDefault();

    try {
      const response = await postMessage(token, postId, messageInput);

      if (response.success) {
        // Clear the message input and fetch updated posts
        setMessageInput("");
        fetchPosts();
      } else {
        setErrorMessage("Failed to send message");
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the message");
    }
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
            {token && user._id !== post.author._id && (
              <form onSubmit={(event) => handleMessageSubmit(event, post._id)}>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Enter your message"
                />
                <button type="submit">Send Message</button>
              </form>
            )}
          </div>
        ))}
      </ul>
      <CreatePostForm BASE_URL={BASE_URL} token={token} fetchPosts={fetchPosts} />
    </div>
  );
}

export default AllPosts;
