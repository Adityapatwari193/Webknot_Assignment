import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestComponent = () => {
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/test'); // Adjust URL if necessary
        setTestData(response.data);
      } catch (err) {
        console.error('Error fetching test data:', err);
        setError('Failed to fetch test data');
      }
    };

    fetchTestData();
  }, []);

  return (
    <div>
      <h2>Test Data</h2>
      {error && <p>{error}</p>}
      {testData ? (
        <pre>{JSON.stringify(testData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestComponent;
