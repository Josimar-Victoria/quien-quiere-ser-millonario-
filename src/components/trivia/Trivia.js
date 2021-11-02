import { useEffect, useState } from "react";
import "./styles.css";
import useSound from "use-sound";
import play from "../../assets/play.waw";
import correct from "../../assets/correct.waw";
import wrong from "../../assets/wrong.waw";
export default function Trivia({
  data,
  setStop,
  setQuestionNumber,
  questionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, SetClassName] = useState("answer");

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    SetClassName("answer active");
    delay(3000, () =>
      SetClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(6000, () => {
      if (a.correct) {
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers?.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
