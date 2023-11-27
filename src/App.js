import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Paper, Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './App.css';



function App() {
  const codeString = `
    /**
   * Shuffles an array in place using the Fisher-Yates shuffle algorithm.
   * @param {Array} array - The array to be shuffled.
   */
  function shuffleArray(array) {
    // Loop backwards through the array
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index before the current element
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the randomly chosen element
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
  * Generates a list of unique numbers from 1 to 10000 in random order.
  * @returns {Array} An array containing numbers from 1 to 10000 in random order.
  */
  function generateRandomList() {
    let numbers = [];

    // Fill the array with numbers from 1 to 10000
    for (let i = 1; i <= 10000; i++) {
      numbers.push(i);
    }

    // Shuffle the array to randomize the order of numbers
    shuffleArray(numbers);

    return numbers;
  }

  // Generate the random list and log it to the console
  let randomList = generateRandomList();
  console.log(randomList);
  `;
  const [numberList, setNumberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 500; // You can adjust this number

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    let numbers = [];
    for (let i = 1; i <= 10000; i++) {
      numbers.push(i);
    }

    shuffleArray(numbers);
    setNumberList(numbers);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNumbers = numberList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  const totalPages = Math.ceil(numberList.length / itemsPerPage);

  return (
    <div className="App">
      <div className="header-information">
        <h1>Peter Li | Full Stack developer</h1>
        <span className="contect-info">Phone: 403-6162689</span>
        <span className="contect-info"> | </span>
        <span className="contect-info">Email: Peter.xli@outlook.com</span>
      </div>
      <Paper elevation={3} className="number-list-container">
        {currentNumbers.map((number, index) => (
          <span key={number}>{number}{index < currentNumbers.length - 1 ? ', ' : ''}</span>
        ))}
      </Paper>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="pagination"
        siblingCount={10}
        boundaryCount={1}
        sx={{ display: "flex", justifyContent: "center" }}
      />
      <Paper elevation={3} sx={{
        backgroundColor: '#f5f5f5',
        fontFamily: "'Courier New', monospace",
        padding: '20px',
        margin: '20px 0',
        borderRadius: '4px',
        overflowX: 'auto',
        width: "100%"
      }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: '#e0e0e0',
              borderRadius: '4px 4px 0 0'
            }}
          >
            <Typography>Programming Solution For Random Number List --- Click to Expend</Typography>
          </AccordionSummary>
          <Typography style={{ whiteSpace: 'pre-wrap', marginLeft:"20px" }}>
            {codeString}
          </Typography>
        </Accordion>
      </Paper>
    </div>
  );
}

export default App;
