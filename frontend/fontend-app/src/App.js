import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateQuizPage from "./pages/CreateQuizPage";
import SolveQuizPage from "./pages/SolveQuizPage";
import SearchPage from "./pages/SearchPage";
import ResultPage from "./pages/ResultPage";

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
                    <Route path="/result/:id" element={<ResultPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
