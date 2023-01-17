import { useParams } from 'react-router-dom';
import SolveQuiz from "../components/SolveQuiz";

export default function SolveQuizPage(){
    const { id } = useParams();
    return(<SolveQuiz id={id}/>)
}