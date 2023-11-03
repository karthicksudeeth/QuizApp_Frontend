import Question from './components/Question/CategoryQuestions';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateQuiz from './components/createQuiz/CreateQuiz';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useSnackbar,SnackbarProvider } from 'notistack';
import HomePage from './components/HomePage/HomePage';
import QuizIdDisplay from './components/QuizIdDisplay/QuizIdDisplay';
import CategoryQuestion from './components/Question/CategoryQuestions';
import CustomQuizQuestion from './components/Question/CustomQuizQuestion';
function App() {
  return (
    <SnackbarProvider >
    <Router>
      <Routes>
        <Route exact path="/login"  element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/categoryquestion" element={<CategoryQuestion/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/createquiz" element={<CreateQuiz/>}/>
        <Route exact path="/quiziddisplay" element={<QuizIdDisplay/>}/>
        <Route exact path="/customquizquestion" element={<CustomQuizQuestion/>}/>
        
        </Routes>

    </Router>
    </SnackbarProvider>
  );
}

export default App;
