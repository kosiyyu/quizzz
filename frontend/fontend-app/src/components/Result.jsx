import React, {useEffect, useState} from 'react';
import {getResultById} from "../services/ResultApi";

const Result = ({id}) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        getResultById(id)
            .then(data => {
                setResult(data);
            });
    }, [])
    //console.log(result)
    return result === null || result === undefined ? <p>Loading the result...</p> : (<div>
            Your score is: {result.score} / 100
            <br/>
            Your mark
            is: {result.score >= 90 ? '5.0' : result.score >= 80 ? '4.5' : result.score >= 70 ? '4.0' : result.score >= 60 ? '3.5' : result.score >= 50 ? '3.0' : '2.0'
        }
        </div>)
}

export default Result;