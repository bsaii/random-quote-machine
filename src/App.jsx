import React, { useEffect, useState } from 'react';
import axios from 'axios'

const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const colors = ["1F0318", "E5F2C9", "7F534B", "8C705F", "1E1A1D", "1B4079", "4D7C8A", "7F9C96", "8FAD88", "CBDF90"]

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    axios.get(URL).
      then(response => setQuotes(response.data.quotes)).
      // eslint-disable-next-line no-console
      catch(error => console.log(error))
  }, [])

  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

  const getQuote = () => {
    const randomQuote = getRandomQuote()
    setCurrentAuthor(randomQuote?.author)
    setCurrentQuote(randomQuote?.quote)
  }

  useEffect(() => {
    getQuote()
    getRandomColor()
  }, [quotes])


  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: `#${getRandomColor()}` }}>
      <div className="card" id='wrapper'>
        <div className="card-body" id="quote-box">
          <blockquote className="blockquote mb-0 text-center" id='quote-text'>
            <p id='text'>{currentQuote}</p>
            <footer className="blockquote-footer" id='author'>
              {currentAuthor}
            </footer>
          </blockquote>
          <div className="d-flex my-4">
            <a href={`https://twitter.com/intent/tweet?text="${currentQuote}" - ${currentAuthor}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" id='tweet-quote'>Twitter</a>
            <a href="https://instagram.com" target="_blank" className="btn btn-primary ms-3" rel="noreferrer">Instagram</a>
            <button type="button" className="btn btn-primary ms-auto" id='new-quote'
              onClick={() => getQuote()}
            >New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
