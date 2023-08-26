/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchWithHeaders, deletePost, postMessage } from "../Helpers/api";
import CreatePostForm from "./CreatePostForm";

function AllPosts({ BASE_URL, token }) {
  // State to store fetched posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchUser();
    fetchPosts();
    setMessages([]);
  }, [token]);

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

  // function to fetch users data
  const fetchUser = async () => {
    if (!token) {
      setUser(null); 
    }
    
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log(result);
      setUser(result.data);
      setMessages(result.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle deletion of a post
  const handleDeletePost = async (postId) => {
    const response = await deletePost(token, postId);
    setPosts((posts) => posts.filter((post) => post._id !== postId));
  };

  const handleMessageSubmit = async (event, postId) => {
    event.preventDefault();
    try {
      const response = await postMessage(token, postId, messageInput);
      if (response.success) {
        setMessageInput(""); // Clear the message input
        fetchPosts(); // fetch updated posts
      } else {
        setErrorMessage("Failed to send message");
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the message");
    }
  };

  // Function for matching text in searh bar
  const postMatches = (post, text) => {
    return (
      post.title.toLowerCase().includes(text) ||
      post.description.toLowerCase().includes(text)
    );
  };
  const filteredPosts = posts.filter((post) =>
    postMatches(post, searchTerm.toLowerCase())
  );
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div className="all-posts-container">
      <header className="allPost-header">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search to your hearts desire."
          />
          <button className="search-button">Search</button>
        </div>
      </header>
      <h2 className="things">Check out all these things!</h2>
      <ul className="post-container">
        {postsToDisplay.map((post) => (
          <div key={post._id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-price">Price: {post.price}</p>
            <p className="post-location">Location: {post.location}</p>
            {token && post?.author?._id === user?._id && (
              <>
                <p>You are the author of this post.</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete Post
                </button>
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
                <button className="send-message" type="submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        ))}
      </ul>
      <CreatePostForm
        BASE_URL={BASE_URL}
        token={token}
        fetchPosts={fetchPosts}
      />
      <div>
        <h2>Your Messages</h2>
        <ul>
          {messages.map((message) => (
            <div key={message._id} className="message-card">
              <p className="message-author">
                From: {message.fromUser.username}
              </p>
              <p className="message-content">Content: {message.content}</p>
              {/* ... */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AllPosts;
