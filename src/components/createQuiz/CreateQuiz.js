import React, { useState } from 'react';
import './CreateQuiz.scss';
import Header from '../../Header/Header';
import { SnackbarProvider, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [],
  });

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          text: '',
          options: ['', '', '', ''], 
          correctAnswer: '',
        },
      ],
    });
  };


  const handleAddOption = (questionIndex) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q, index) =>
        index === questionIndex
          ? {
              ...q,
              options: [...q.options, ''], 
            }
          : q
      ),
    });
  };


   const handleSubmit = async () => {
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( quizData)
  };
  (async()=>{
    const response=await fetch("http://localhost:8081/quiz",requestOptions);
    const data=await response.json();
            console.log(data.id);
            if( response.ok == true){

              enqueueSnackbar("Quiz created successfully ", { variant: "success",
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
              } });
              localStorage.setItem("quizId",data.id);
              setQuizData({
                title: '',
                questions: [],
              });
              navigate('/quiziddisplay')

             }
             else{
              enqueueSnackbar("Quiz is not created", { variant: "warning",
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
              } });
            
             }
}
)();
  }

return (
  <div className='createquiz'>
    <Header/>
    <div className='body'>
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />
      <div className='question'>
      {quizData.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder={`Question ${questionIndex + 1}`}
            value={question.text}
            onChange={(e) =>
              setQuizData({
                ...quizData,
                questions: quizData.questions.map((q, index) =>
                  index === questionIndex ? { ...q, text: e.target.value } : q
                ),
              })
            }
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    questions: quizData.questions.map((q, qIndex) =>
                      qIndex === questionIndex
                        ? {
                            ...q,
                            options: q.options.map((o, oIndex) =>
                              oIndex === optionIndex
                                ? e.target.value
                                : o
                            ),
                          }
                        : q
                    ),
                  })
                }
              />
            </div>
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) =>
              setQuizData({
                ...quizData,
                questions: quizData.questions.map((q, index) =>
                  index === questionIndex
                    ? { ...q, correctAnswer: e.target.value }
                    : q
                ),
              })
            }
          />
          <div className='addoption'>
          <button onClick={() => handleAddOption(questionIndex)}>Add Option</button>
          </div>
          
        </div>
      ))}
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Create Quiz</button>
    </div>
    </div>
  );
}




export default CreateQuiz;
