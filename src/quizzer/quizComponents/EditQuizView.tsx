import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";

function ExitEditButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Cancel Edit</Button>;
}

export function EditQuizView({
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
            <h4>Quiz Editor</h4>
            <div>
                <ExitEditButton setMode={setMode} />
            </div>
        </div>
    );
}
