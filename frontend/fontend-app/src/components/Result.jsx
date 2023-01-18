import React, {useEffect, useState} from 'react';
import {getResultById} from "../services/ResultApi";
import 'bootstrap/dist/css/bootstrap.min.css';

const Result = ({id}) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        getResultById(id)
            .then(data => {
                setResult(data);
            });
    }, [])
    //console.log(result)
    return result === null || result === undefined ? <p className="text-center">Loading the result...</p> : (
        <div className="container">
            <h1 className="display-4">Solve quiz</h1>
            <div className="center-div">
                <h3 className="card-title">Your score is: {result.score} / 100</h3>
                <h3 className="card-text">Your mark
                    is: {result.score >= 90 ? '5.0' : result.score >= 80 ? '4.5' : result.score >= 70 ? '4.0' : result.score >= 60 ? '3.5' : result.score >= 50 ? '3.0' : '2.0'}
                </h3>
            </div>
        </div>)

}

export default Result;