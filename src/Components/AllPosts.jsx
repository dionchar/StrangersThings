/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { fetchWithHeaders } from '../Helpers/api';
import CreatePostForm from './CreatePostForm';

function AllPosts({ BASE_URL, token }) {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    fetch(`${BASE_URL}/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };



  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <><li key={post._id}>{post.title}</li><h3 className="post-title">{post.title}</h3>
          <p className="post-description">{post.description}</p>
            <p className="post-price">Price: {post.price}</p>
            <p className="post-location">Location: {post.location}</p>
            {post.isAuthor && <p>You are the author of this post.</p>}
          </>
        ))}
      </ul>
      <CreatePostForm BASE_URL={BASE_URL} token={token} fetchPosts={fetchPosts} />
    </div>
  );
}

export default AllPosts;
