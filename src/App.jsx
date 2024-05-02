import React, { useState } from 'react';

function App() {
  // Initialize an array of counts. Example with 9 buttons initialized to 0.
  const initialCounts = Array(112).fill(0);
  const [counts, setCounts] = useState(initialCounts);

  // Helper function to get the color based on count
  function getColor(count) {
    if (count === 1) {
      return '#D3E298'; // Light green
    } else if (count === -1) {
      return '#DB5461'; // Red
    } else {
      return '#A9A9A9'; // Default color when count is 0
    }
  }

  // Helper function to get the label based on count
  function getLabel(count) {
    if (count === 1) {
      return "";
    } else if (count === -1) {
      return "";
    } else {
      return "";
    }
  }

  // Function to handle left click
  const handleClick = index => {
    setCounts(counts => counts.map((count, idx) => {
      if (idx === index) {
        if (count === 0) {
          return 1;
        } else {
          return count * -1;
        }
      } else {
        return count;
      }
    }));
  };

  // Function to handle right click
  const handleRightClick = (event, index) => {
    event.preventDefault(); // Prevent the context menu
    setCounts(counts => counts.map((count, idx) => idx === index ? 0 : count));
  };

  return (
    <div style={{
      display: 'flex',        // Use flex layout to center the child div
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'         // Take full height of the viewport
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(14, 1fr)',
        gap: '6px'
      }}>
        {counts.map((count, index) => (
          <div key={index} className="card">
            <button onClick={() => handleClick(index)}
              onContextMenu={(e) => handleRightClick(e, index)}
              style={{
                backgroundColor: getColor(count),
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                border: '3px solid white',
                borderRadius: '0',
                cursor: 'pointer'
              }}>
              {getLabel(count)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
