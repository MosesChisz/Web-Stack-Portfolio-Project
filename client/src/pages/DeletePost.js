import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const DeletePost = ({ onDelete }) => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);

      // Call onDelete callback if provided
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (success) {
    return (
      <div>
        <p>You have successfully deleted the post.</p>
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div>
      <h2>Delete Post</h2>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => window.location.href = `/post/${id}-`}>Cancel</button>
    </div>
  );
};

export default DeletePost;

