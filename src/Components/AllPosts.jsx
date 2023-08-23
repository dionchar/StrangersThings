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
  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

      setMessages(result.data.messages);

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

  const postMatches = (post, text) => {
    // Return true if any of the fields you want to check against include the text
    // For example, check if title or description includes the text
    return post.title.toLowerCase().includes(text) || post.description.toLowerCase().includes(text);
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm.toLowerCase()));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <header className="allPost-header">
      
        <div className="allPost-logo">
          <img src="allPost-logo.png" alt="allPost Logo" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items, brands, and more"
          />
          <button className="search-button">Search</button>
        </div>
        
       
      </header>
      <h2>All Posts</h2>
      {/* ... */}
      <ul className="post-container">
        
        {postsToDisplay.map((post) => (
          <div key={post._id} className="post-card">
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
      <div>
        <h2>Your Messages</h2>
        <ul>
          {messages.map((message) => (
            <div key={message._id} className="message-card">
              <p>From: {message.fromUser.username}</p>
              <p>Content: {message.content}</p>
              {/* ... */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
          }
export default AllPosts;
