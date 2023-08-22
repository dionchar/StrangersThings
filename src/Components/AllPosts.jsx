/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { fetchWithHeaders } from '../Helpers/api';
import CreatePostForm from './CreatePostForm';

function AllPosts({ BASE_URL, token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [BASE_URL]);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
      <CreatePostForm BASE_URL={BASE_URL} token={token} fetchPosts={fetchPosts} />
    </div>
  );
}

export default AllPosts;
