import React, { useEffect, useState } from 'react';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';

const Square = ({ mine, setGameOver, gameOver, setScore, gameStarted }) => {
  let [image, setImage] = useState(null);

  useEffect(() => {
    if (gameOver) {
      if (mine) {
        setImage(bombIcon);
      } else {
        setImage(goldIcon);
      }
    }
  }, [gameOver, mine]);

  function mouseEnterHandle() {
    if (!gameStarted || image) return; // Prevent hover effects if the game hasn't started
    const sound = new Audio(hoverEffect);
    sound.play();
  }

  function clickHandler() {
    if (!gameStarted || image) return; // Prevent clicks if the game hasn't started

    if (!mine) {
      setScore((prevValue) => prevValue * 2);
      setImage(goldIcon);
      const sound = new Audio(DiamondEffect);
      sound.play();
    } else {
      alert('You Lose the Game');
      setGameOver(true);
    }
  }

  return (
    <div
      className="w-[100px] h-[100px] bg-zinc-600 cursor-pointer"
      onMouseEnter={mouseEnterHandle}
      onClick={clickHandler}
    >
      {image && <img style={{ height: '90px', width: '90px' }} src={image} alt="Image description" />}
    </div>
  );
};

export default Square;
