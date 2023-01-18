import React, {useState} from 'react';
import {getQuizByName} from "../services/QuizApi";
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (searchValue) => {
        const quiz = await getQuizByName(searchValue);
        if (quiz === null || quiz === undefined) {
            toast.error('Such a quiz does not exist!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.success(`Quiz ${searchValue}!`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate(`/solve/${quiz.id}`);
        }
    }

    return (
        <div className="center-div">
            <div className="d-flex align-items-center justify-content-center m-2">
                <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-lg p-3" placeholder="Search for a quiz..." value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-dark ml-3 form-group btn-lg p-3"
                                onClick={() => handleSearch(searchValue.toString())}>Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;

// <div className="d-flex justify-content-center align-items-center">
//     <div className="input-group mb-3">
//         <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
//                aria-describedby="basic-addon2">
//             <div className="input-group-append">
//                 <button className="btn btn-outline-secondary" type="button">Button</button>
//             </div>
//     </div>
// </div>


// <div className="input-group mb-3">
//     <div className="input-group-prepend">
//         <button className="btn btn-outline-secondary" type="button">Button</button>
//     </div>
//     <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
// </div>

//ten jest na srodku ale button jest pod inputem

// <div className="d-flex align-items-center justify-content-center m-2">
//     <div className="input-group-prepend">
//         <button className="btn btn-dark ml-3 form-group" onClick={() => handleSearch(searchValue.toString())}>Search</button>
//     </div>
//     <input type="text" className="input-group" placeholder="Search for a quiz" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
// </div>

//ten sie rozciaga

// <div className="d-flex align-items-center justify-content-center m-2">
//     <div className="form-group m-100">
//         <input type="text" className="input-group-prepend" placeholder="Search for a quiz" value={searchValue}
//                onChange={(e) => setSearchValue(e.target.value)}/>
//         <button className="btn btn-dark ml-3 form-group" onClick={() => handleSearch(searchValue.toString())}>Search
//         </button>
//     </div>
// </div>

//ten jest git tyle ze input nie jest stylowany