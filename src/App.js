import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('something went wrong');
      })
      .then((data) => {
        // Select a random quote from the array
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuote = data[randomIndex];

        // Extract author name efficiently using string methods
        // const authorName = selectedQuote.author.split(',')[0].trim();
        const authorName = selectedQuote.author.slice(0,selectedQuote.author.indexOf(','))

        setQuote({
          text: selectedQuote.text,
          author: authorName,
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="App h-[100vh] flex justify-center items-center  magicpattern ">
   <button onClick={getQuote} className="rounded-2xl gap-y-1 items-center grid border-4 h-36 border-dashed border-black bg-white px-6 py-5 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[8px_8px_0px_gray] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
      <h1 className="text-center text-2xl">{quote.text}</h1>
        <i>- {quote.author}</i>
    </button>
  
    </div>
  );
}

export default App;
