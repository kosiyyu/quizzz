import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SolveQuiz from "./components/SolveQuiz";
import { Route, Routes } from 'react-router-dom';
import CreateQuiz from "./components/CreateQuiz";
import NavBar from './components/NavBar';
import CreateQuizPage from "./pages/CreateQuizPage";
import SolveQuizPage from "./pages/SolveQuizPage";
import SearchPage from "./pages/SearchPage";
//       <!--<CreateQuiz />-->
//<Route path="/" element={<SolveQuiz/>}/>
//<ToastContainer/>
function App() {
    return (
        <div className="App">
            <NavBar/>
            <ToastContainer/>
            <div>
                <Routes>
                    <Route path="/" element={<SearchPage/>}/>
                    <Route path="/create" element={<CreateQuizPage/>}/>
                    <Route path="/solve/:id" element={<SolveQuizPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
