import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";
import { ModifyQuizViewHelper } from "./ModifyQuizViewHelper";

function ExitNewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Exit Quiz Creator</Button>;
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
            <ModifyQuizViewHelper
                mode={mode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                setSelectedQuiz={setSelectedQuiz}
                selectedQuiz={selectedQuiz}
            />
            <div>
                <ExitNewButton setMode={setMode} />
            </div>
        </div>
    );
}
