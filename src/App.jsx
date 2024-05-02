import React, { useState, useEffect } from 'react';

function App() {
  // Initialize state with local storage or default to initial counts
  const initialCounts = Array(112).fill(0);
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem('counts');
    return savedCounts ? JSON.parse(savedCounts) : initialCounts;
  });

  function getColor(count) {
    if (count === 1) {
      return '#D3E298'; // Light green
    } else if (count === -1) {
      return '#DB5461'; // Red
    } else {
      return '#A8A8A8'; // Light gray or default color
    }
  }

  function getLabel(count) {
    if (count === 1) {
      return "";
    } else if (count === -1) {
      return "";
    } else {
      return "";
    }
  }

  const handleClick = index => {
    setCounts(counts => {
      const newCounts = counts.map((count, idx) => {
        if (idx === index) {
          if (count === 0) {
            return 1;
          } else {
            return count * -1;
          }
        } else {
          return count;
        }
      });
      // Update local storage after state update
      localStorage.setItem('counts', JSON.stringify(newCounts));
      return newCounts;
    });
  };

  const handleRightClick = (event, index) => {
    event.preventDefault();
    setCounts(counts => {
      const newCounts = counts.map((count, idx) => idx === index ? 0 : count);
      // Update local storage after state update
      localStorage.setItem('counts', JSON.stringify(newCounts));
      return newCounts;
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(14, 1fr)',
        gap: '10px'
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
