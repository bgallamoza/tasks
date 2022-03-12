import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";

function ExitNewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Cancel Creation</Button>;
}

export function NewQuizView({
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
            <h4>Quiz Creator</h4>
            <div>
                <ExitNewButton setMode={setMode} />
            </div>
        </div>
    );
}
