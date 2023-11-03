import { useContext, useState } from "react";
import { ques } from "../Question/CategoryQuestions.js";
import { resultInitialState } from "../Question/CategoryQuestions.js";
import './quiz.scss';
import AnswerTimer from "../AnswerTimer/AnswerTimer.js";
import Header from "../../Header/Header";

const Quiz = () => {
  // const temp=useContext(ques);
  let data = useContext(ques);
  
  // console.log(data);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // console.log(data[currentQuestion]);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result,setResult]=useState(resultInitialState);
  const [showResult,setShowResult]=useState(false);
  const [showAnswerTimer,setShowAnswwerTimer]=useState(true);

  const {
    answer,
    category,
    difficulty,
    id,
    option1,
    option2,
    option3,
    option4,
    question,
  } = data[currentQuestion] || {};

  

  const onAnswerClick = (answerClicked, index) => {

    setAnswerIdx(index);
    if(answerClicked== answer){
      console.log("yess");
        setSelectedAnswer(true);
    }
    else{
      console.log("noo");
      setSelectedAnswer(false);
      
    }
  };

  const onClickNext=(finalAnswer)=>{
    setAnswerIdx(null);
    setShowAnswwerTimer(false);
    setResult((prev)=>
      finalAnswer?{
        ...prev,
        score:prev.score+1,
        correctAnswers:prev.correctAnswers+1
      }:{
        ...prev,
        wrongAnswers:prev.wrongAnswers+1
      }
    );

    if(currentQuestion!==data.length-1){
      setCurrentQuestion((prev)=>prev+1);
    }
    else{
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setTimeout(() => {
      setShowAnswwerTimer(true);
    });
  }

  const onTryAgain=()=>{
    setResult(resultInitialState);
    setShowResult(false);
  }

  const handleTimeup=()=>{
   setSelectedAnswer(false);
   onClickNext(false);
  }

  return (
    
       
    
    <div className="body">
      <Header/>
  
     <div className="container">
    <div className="quiz-container">
     {!showResult? (
      <>
      {showAnswerTimer && <AnswerTimer duration={15} onTimeup={handleTimeup}/>}
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-question">/{data.length}</span>
        <h2>{question}</h2>
        <ul>
          <li
            onClick={() => {
              onAnswerClick(option1 , 1);
            }}
            className={answerIdx === 1 ? "selected-ans" : null}
          >
            {" "}
            {option1}
          </li>
          <li
            onClick={() => {
              onAnswerClick( option2 , 2);
            }}
            className={answerIdx === 2 ? "selected-ans" : null}
          >
            {option2}
          </li>
          <li
            onClick={() => {
              onAnswerClick( option3 , 3);
            }}
            className={answerIdx === 3 ? "selected-ans" : null}
          >
            {option3}
          </li>
          <li
            onClick={() => {
              onAnswerClick(option4 , 4);
            }}
            className={answerIdx === 4 ? "selected-ans" : null}
          >
            {option4}
          </li>
        </ul>
        <div className="footer">
          <button onClick={()=>onClickNext(selectedAnswer)} disabled={answerIdx===null}>
            {currentQuestion===data.length-1?"Finish":"Next"}
          </button>
        </div>
        </>
     ): <div className="result">
      <h3>Result</h3> 
      <p>
        Total Questions: <span>{data.length}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={onTryAgain}>Try Again</button>
      </div> }
    </div>
    </div>
    </div>
    
  );
};

export default Quiz;
