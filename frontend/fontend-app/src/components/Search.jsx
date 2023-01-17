import React, { useState } from 'react';
import { getQuizByName} from "../services/QuizApi";
import { useNavigate } from 'react-router-dom';
const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (searchValue) => {
        const quiz = await getQuizByName(searchValue);
        if (quiz) {
            navigate(`/solve/${quiz.id}`);
        } else {
            alert('Quiz not found');
        }
    }

    return (
        <div>
            <input type="text" placeholder="Search for a quiz" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={() => handleSearch(searchValue)}>Search</button>
        </div>
    );
}

export default Search;