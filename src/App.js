import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

const cardImages = [
  { src: "/img/angel.jpg", matched: false },
  //{ src: "/img/moulin.jpg", matched: false },
  { src: "/img/children.jpg", matched: false },
  // { src: "/img/arbore.jpg", matched: false },
  { src: "/img/cassatt.jpg", matched: false },
  //{ src: "/img/forest.jpg", matched: false },
  // { src: "/img/gauguin.jpg", matched: false },
  { src: "/img/gwen.jpg", matched: false },
  // { src: "/img/kisling.jpg", matched: false },
  { src: "/img/maurice.jpg", matched: false },
  { src: "/img/monet.jpg", matched: false },
  { src: "/img/morrisot.jpg", matched: false },
  //{ src: "/img/players.jpg", matched: false },
  { src: "/img/starry.jpg", matched: false },
  { src: "/img/sun.jpg", matched: false },
  { src: "/img/sunflowers.jpg", matched: false },
  { src: "/img/suzanne.jpg", matched: false },
  { src: "/img/van-gogh.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (choiceOne && choiceOne.id !== card.id) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    // const isGameOver =  cards.length !== 0 && cards.every((card) => card.matched === true);
    // if (isGameOver) {
    const userScore = 1200 - 15 * (turns * 2 - 24);
    if (userScore > 0) setScore(userScore);
    // }
  }, [cards, turns]);

  return (
    <div className="App">
      <nav className="nav nav-pills flex-column flex-sm-row">
        <h1 className="flex-sm-fill text-sm-center fs-3 fw-bold">Memory Art</h1>
        <h5 className="flex-sm-fill text-sm-center fw-4">
          Your Score: {score}
        </h5>
        <h5 className="flex-sm-fill text-sm-center fw-4">Turns: {turns}</h5>
        <button
          className="flex-sm-fill text-sm-center btn btn-light"
          onClick={shuffleCards}
        >
          New Game
        </button>
      </nav>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p style={{ textAlign: "center" }} className="mt-3">
        Created by Tuba Polat
      </p>
    </div>
  );
}

export default App;
