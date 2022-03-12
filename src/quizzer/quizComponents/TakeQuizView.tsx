import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";

function ExitQuizButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Exit Quiz</Button>;
}

export function TakeQuizView({
    mode,
    setMode,
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    mode: string;
    setMode: (newMode: string) => void;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    return (
        <div>
            <h4>{selectedQuiz.title}</h4>
            <div>
                <ExitQuizButton setMode={setMode} />
            </div>
        </div>
    );
}
