import { useState, useEffect, useMemo } from "react";
import "./app.css";
import Timer from "./components/timer/Timer";
import Trivia from "./components/trivia/Trivia";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () => [
      { id: 15, amount: "$ 1500" },
      { id: 14, amount: "$ 1400" },
      { id: 13, amount: "$ 1300" },
      { id: 12, amount: "$ 1200" },
      { id: 11, amount: "$ 1100" },
      { id: 10, amount: "$ 1000" },
      { id: 9, amount: "$ 900" },
      { id: 8, amount: "$ 800" },
      { id: 7, amount: "$ 700" },
      { id: 6, amount: "$ 600" },
      { id: 5, amount: "$ 500" },
      { id: 4, amount: "$ 400" },
      { id: 3, amount: "$ 300" },
      { id: 2, amount: "$ 200" },
      { id: 1, amount: "$ 100" },
    ],
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">Ganaste: {earned}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} questionNumber={questionNumber} />
              </div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
              key={m.id}
            >
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">$ {m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
