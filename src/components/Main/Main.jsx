// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Main.css'

const Main = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true); 

    const fetchQuote = async () => {
        try {
        setLoading(true);
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        // console.log(data.content)
        } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Error fetching quote. Please try again.");
        setAuthor("");
        } finally {
            setLoading(false); 
        }
    };
    useEffect(() => {
        fetchQuote();
    }, []);

  return (
    <div className="container">
        <div id="quote-box" className='quote-box'>
        <p className='title-box'>RANDOM QUOTES</p>
        {loading ? (
            <div className="loading">Loading...</div> 
        ) : (
            <>
                <p id="text" className="text">{quote}</p>
                <p id="author" className='author'>- {author}</p>
            </>
        )}
        <div className="button">
            <button id="new-quote" className='new-quote' onClick={fetchQuote}>
                New Quote
            </button>
            <a
                id="tweet-quote" className='tweet-quote'
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                Tweet
            </a>
        </div>
        </div>
    </div>
  )
}

export default Main