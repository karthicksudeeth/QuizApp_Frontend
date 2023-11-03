import './quiziddisplay.scss';
import Header from '../../Header/Header';
const QuizIdDisplay = () => {
  return (
    <div className="body">
        <Header/>
      <div className='content'>
        <div>
        <h1>
          Your new quiz is successfully created with the quiz Id :{" "}
          {localStorage.getItem("quizId")}
        </h1>
        </div>
      </div>
    </div>
  );
};
export default QuizIdDisplay;
