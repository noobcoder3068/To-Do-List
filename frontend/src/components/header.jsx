import React, { useState, useEffect } from "react";
import axios from 'axios';
import './header.css';
import AssignmentIcon from '@mui/icons-material/Assignment';

function Header() {
  const [quote, setQuote] = useState({
    author: "",
    quote:"",
  });

  console.log(quote);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/SingleQuote');
        setQuote(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log("Error in connecting to backend");
      }
    };
    fetchData();
  }, []);

  return (
    <header className="header">
      <h1><AssignmentIcon className="icon"/> To Do List</h1>
      <p className="tagline">" Hello Sim :) "</p>
      {/* <p className="author">-{quote.author}</p> */}

    </header>
  );
}

export default Header;
