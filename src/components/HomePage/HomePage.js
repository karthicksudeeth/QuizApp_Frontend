// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./homepage.scss";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, TextField, Button } from "@mui/material";
import Header from "../../Header/Header";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import Question from "../Question/CategoryQuestions";

const categories = [
  {
    name: "Java",
    path: "/quiz/java",
    description: "Test your Java knowledge.",
    image: "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg",
  },
  {
    name: "Python",
    path: "/quiz/python",
    description: "Test your Python skills.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
  },
  {
    name: "JavaScript",
    path: "/quiz/javascript",
    description: "Test your JavaScript knowledge.",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  },
  // {
  //   name: 'Create Your Own Quiz',
  //   path: '/create-quiz',
  //   description: 'Create your own custom quiz.',
  //   image: 'https://img.freepik.com/premium-vector/quiz-vector-pop-style-illustration-with-megaphone-yellow-background_194782-902.jpg',
  // },
];


const HomePage = () => {
  const navigate = useNavigate();
  const [id,setId]=useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleQuizIdSubmit = (e) => {
    if(localStorage.getItem("username")){
      localStorage.setItem("quizId",id);
      navigate("/customquizquestion")
      }
      else{
        enqueueSnackbar("Please login to play quiz", {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });   
      } 
   
  };

  const handleCreateQuiz=()=>{
    if(localStorage.getItem("username")){
    navigate("/createquiz");
    }
    else{
      enqueueSnackbar("Please login to play quiz", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });   
    }  
  }
  
  const handlePlayQuiz = (name) => {
    console.log(name);
    console.log(localStorage.getItem("username"))
    if(localStorage.getItem("username")){
      localStorage.setItem("quizName",name)
      navigate("/categoryquestion")
    }
    else{
      enqueueSnackbar("Please login to play quiz", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });   
    }   
  };

  return (
    <div className="home-page">
      <Header />
      <div className="category">
        <Grid container spacing={5}>
          <Grid className="parentGrid" item xs={12} sm={6}>
            <div className="inputgrid">
              <TextField
                className="input"
                label="Enter Quiz ID"
                variant="outlined"
                fullWidth
                onChange={(e)=>setId(e.target.value)}
              />
              <button
                variant="contained"
                color="primary"
                onClick={handleQuizIdSubmit}
              >
                Start Quiz
              </button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="category-card">
              <CardMedia
                component="img"
                alt="createQuiz"
                height="20"
                maxWidth="100%"
                objectFit="contain"
                image="https://img.freepik.com/premium-vector/quiz-vector-pop-style-illustration-with-megaphone-yellow-background_194782-902.jpg"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Create Quiz
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Create your own custom quiz
                </Typography>
                <button className="play-button" onClick={()=>handleCreateQuiz()}>Create Quiz</button>
              </CardContent>
            </Card>
          </Grid>

          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="category-card">
                <CardMedia
                  component="img"
                  alt={category.name}
                  height="20"
                  maxWidth="100%"
                  objectFit="contain"
                  image={category.image}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.description}
                  </Typography>
                  <button className="play-button" onClick={()=>handlePlayQuiz(category.name)}>
                    Play Quiz
                  </button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
