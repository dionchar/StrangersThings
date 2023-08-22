/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { fetchWithHeaders } from '../Helpers/api';

function CreatePostForm({ BASE_URL, token, fetchPosts }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const data = await fetchWithHeaders(`${BASE_URL}/posts`, 'POST', {
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }, token);

      if (data.success) {
        // Fetch the updated list of posts
        fetchPosts();
        // Reset the form fields
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setWillDeliver(false);
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.log('An error occurred while creating a post');
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="willDeliver">Will Deliver</label>
          <input
            type="checkbox"
            id="willDeliver"
            checked={willDeliver}
            onChange={e => setWillDeliver(e.target.checked)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;