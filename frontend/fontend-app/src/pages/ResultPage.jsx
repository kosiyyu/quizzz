import { useParams } from 'react-router-dom';
import Result from "../components/Result";

export default function ResultPage(){
    const { id } = useParams();
    return(<Result id={id}/>)
}