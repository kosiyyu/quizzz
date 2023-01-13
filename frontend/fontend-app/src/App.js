import logo from './logo.svg';
import './App.css';
import AnswersList from "./components/AnswersList";
import CreateQuiz from "./components/CreateQuiz";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <CreateQuiz />
    </div>
  );
}

export default App;
