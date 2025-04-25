import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [productId, setProductId] = useState('1'); // Default product
  const [text, setText] = useState('');
  const [starRating, setStarRating] = useState(5);

  // Fetch reviews for a product
  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:5001/api/reviews/${productId}`);
    setReviews(res.data);
  };

  // Submit a new review
  const submitReview = async () => {
    await axios.post('http://localhost:5001/api/reviews', {
      productId,
      userId: 'user123', // Hardcoded for demo
      text,
      starRating,
    });
    fetchReviews(); // Refresh reviews
    setText(''); // Clear input
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Reviews</h1>
      <div>
        <h3>Submit a Review</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <select value={starRating} onChange={(e) => setStarRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} ★</option>
          ))}
        </select>
        <button onClick={submitReview}>Submit</button>
      </div>
      <div>
        <h3>All Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>Rating:</strong> {review.starRating} ★</p>
            <p><strong>Review:</strong> {review.text}</p>
            <p><strong>Sentiment:</strong> {review.sentiment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;