import React, { useEffect, useState } from 'react';

const TriviaApp = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("https://the-trivia-api.com/v2/questions");
            const resultJson = await result.json();
            setQuestions(resultJson); // The API response is an array of questions
        };
        fetchData();
    }, []);

    const handleAnswerClick = (questionId, answer) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answer,
        }));
    };

    return (
        <>
            <h1>Trivia App</h1>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.question.text}</p>
                        <div>
                            {[question.correctAnswer, ...question.incorrectAnswers].sort().map((answer) => (
                                <button
                                    key={answer}
                                    onClick={() => handleAnswerClick(question.id, answer)}
                                    style={{
                                        backgroundColor: selectedAnswers[question.id] === answer 
                                            ? answer === question.correctAnswer 
                                                ? 'green' 
                                                : 'red' 
                                            : 'initial'
                                    }}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                        {selectedAnswers[question.id] && (
                            <p>
                                {selectedAnswers[question.id] === question.correctAnswer
                                    ? 'Correct!'
                                    : `Incorrect.`}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>Loading questions...</p>
            )}
        </>
    );
};

export default TriviaApp;
