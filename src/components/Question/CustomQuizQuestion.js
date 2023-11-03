
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CustomQuiz from '../CustomQuiz/CustomQuiz';

export const ques=React.createContext();

function CustomQuizQuestion(){

    const [data,setData]=useState([]);


    useEffect(() => {
        (async()=>{
            console.log(localStorage.getItem("quizId"));
            const response=await fetch("http://localhost:8081/quiz/"+localStorage.getItem("quizId"));
            const temp=await response.json();
            
            setData(temp);
            // console.log(temp);
        })();
    }, []);
    

    return(
        <ques.Provider value={data}>
        <CustomQuiz/>
     </ques.Provider>
    );
}
export const resultInitialState={
    score:0,
    correctAnswers:0,
    wrongAnswers:0
}
export default CustomQuizQuestion;
