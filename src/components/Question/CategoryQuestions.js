import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from '../Quiz/Quiz.js';

export const ques=React.createContext();

function CategoryQuestion(){
    const [data,setData]=useState([]);

    useEffect(() => {
        (async()=>{
            const response=await fetch("http://localhost:8081/question/category/"+localStorage.getItem("quizName"));
            const temp=await response.json();
            
            setData(temp);
        })();
    }, []);
    
    return(
        <ques.Provider value={data}>
            <Quiz />
         </ques.Provider>
        
    )


}

export const resultInitialState={
    score:0,
    correctAnswers:0,
    wrongAnswers:0
}
export default CategoryQuestion;