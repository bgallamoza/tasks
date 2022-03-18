import React from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button } from "react-bootstrap";
import { ModifyQuizViewHelper } from "./ModifyQuizViewHelper";

function ExitNewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <Button data-testid="new-exit-button" onClick={() => setMode("main")}>
            Exit Quiz Creator
        </Button>
    );
}

export function NewQuizView({
    mode,
    setMode,
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz,
    newQuizId,
    setNewQuizId
}: {
    mode: string;
    setMode: (newMode: string) => void;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
    newQuizId: number;
    setNewQuizId: (newId: number) => void;
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
                newQuizId={newQuizId}
                setNewQuizId={setNewQuizId}
            />
            <div>
                <ExitNewButton setMode={setMode} />
            </div>
        </div>
    );
}
