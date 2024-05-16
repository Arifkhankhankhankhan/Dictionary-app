import React from 'react'
import { useState } from 'react';

const Dictionary   = () => {
    const [inputValue, setInputValue] = useState('');
    const [meaning, setMeaning] = useState('Meaning will be displayed here...');
  
    const handleSearch = async () => {
      if (inputValue.trim() === '') {
        alert('Please enter a word');
      } else {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const firstMeaning = data[0]?.meanings[0]?.definitions[0]?.definition || 'Meaning not found';
          setMeaning(firstMeaning);
        } catch (error) {
          console.error('Error fetching data:', error);
          setMeaning('Failed to fetch meaning');
        }
      }
    };
  
    return (
      <div style={{ padding: 0, margin: 0, boxSizing: 'border-box', backgroundColor: 'antiquewhite', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: 'white', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)', width: 450, textAlign: 'center', borderRadius: 10, padding: 15, position: 'relative' }}>
          <h1 style={{ position: 'absolute', top: '-50%', color: '#892BE2', fontSize: '3rem', left: '25%', }}>Dictionary</h1>
          <input
            type="text"
            placeholder="Enter a word and get a meaning..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 5, marginBottom: 10, fontSize: '1rem', outline: 'none', borderColor: inputValue === '' ? '#ccc' : '#892BE2' }}
          />
          <button
            onClick={handleSearch}
            style={{ backgroundColor: '#892BE2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 5, fontSize: '1rem', cursor: 'pointer', marginBottom: 10 }}
          >
            Search
          </button>
          <div style={{ padding: 0, margin: 0 }}>{meaning}</div>
        </div>
      </div>
    );
  };

export default Dictionary
