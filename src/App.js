import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [codeReviewResult, setCodeReviewResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming the API key file is accessible from the public URL
      const response = await axios.get('C:/Users/rutus/Desktop/codereview/src/path_to_key.txt');
      const OPENAI_API_KEY = response.data.trim();

      // Send request to the server-side API for code review
      const reviewResponse = await axios.post('/api/code_review', { code }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      });

      setCodeReviewResult(reviewResponse.data);
    } catch (error) {
      console.error('Error:', error);
      setCodeReviewResult('Error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>🤖 Gen AI App - AI Code Reviewer 🚀</h1>
      <hr />
      <h2>Code Reviewer</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={handleChange}
          rows="10"
          cols="50"
          placeholder="Enter your code here..."
        ></textarea>
        <br />
        {/* Remove the backslash (\) after <br /> */}
        <button type="submit" disabled={loading}>
          Find Bugs
        </button>
      </form>
      <hr />
      <h3>Code Review Result:</h3>
      <div>{loading ? 'Analyzing your code...' : codeReviewResult}</div>
    </div>
  );
}

export default App;