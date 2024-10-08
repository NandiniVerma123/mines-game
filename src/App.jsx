import React, { useState } from 'react';
import './App.css';
import Square from './Square/Square';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random bomb locations based on the difficulty level
function generateBombs(difficulty) {
  let numBombs;
  switch (difficulty) {
    case 'Easy':
      numBombs = 2;
      break;
    case 'Medium':
      numBombs = 3;
      break;
    case 'Hard':
      numBombs = 4;
      break;
    case 'Very Hard':
      numBombs = 5;
      break;
    case 'Expert':
      numBombs = 6;
      break;
    default:
      numBombs = 3; // Default to Medium difficulty
  }

  let randomNumbers = [];
  while (randomNumbers.length < numBombs) {
    let randomNumber = getRandomInt(1, 25);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium'); // State for difficulty level
  const [bombLocations, setBombLocations] = useState([]);

  // Generate the game items (squares)
  let items = [];
  for (let index = 1; index <= 25; index++) {
    if (bombLocations.includes(index)) {
      items.push(
        <Square
          setScore={setScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
          mine={true}
          key={index}
          gameStarted={gameStarted}
        />
      );
    } else {
      items.push(
        <Square
          setScore={setScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
          key={index}
          gameStarted={gameStarted}
        />
      );
    }
  }

  // Handle game start
  const startGame = () => {
    setBombLocations(generateBombs(difficulty)); // Set bombs based on selected difficulty
    setGameStarted(true); // Start the game
  };

  return (
    <>
      <div className="bg-gradient-to-b from-yellow-100 to-pink-300 min-h-screen">
        <div className="text-center pt-10 pb-10 text-6xl">Mines Game</div>

        {/* Difficulty Dropdown */}
        <div className="flex justify-center mb-10 items-center">
          <label className="text-2xl mr-4">Select Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)} // Update the difficulty
            className="border border-gray-400 p-2 text-2xl"
          >
            <option value="Easy">Easy (2 bombs)</option>
            <option value="Medium">Medium (3 bombs)</option>
            <option value="Hard">Hard (4 bombs)</option>
            <option value="Very Hard">Very Hard (5 bombs)</option>
            <option value="Expert">Expert (6 bombs)</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          {!gameStarted && (
            <button
              onClick={startGame}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-2xl mb-10"
            >
            Bet Now
            </button>
          )}

          <div className="flex gap-x-[800px] p-10 h-full">
            <div>
              <p className="text-[40px] text-[#dc2626] text-center mt-52">Total Score</p>
              <p className="m-0 text-[40px] text-[#dc2626] text-center">{score} pts</p>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-5 gap-2">{items}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
