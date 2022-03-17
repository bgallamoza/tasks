import React from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button } from "react-bootstrap";
import { ModifyQuizViewHelper } from "./ModifyQuizViewHelper";

function ExitEditButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Exit Editor</Button>;
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
            <h5>
                NOW EDITING:<br></br>
                {selectedQuiz.title}
            </h5>
            <ModifyQuizViewHelper
                mode={mode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                setSelectedQuiz={setSelectedQuiz}
                selectedQuiz={selectedQuiz}
            />
            <br></br>
            <ExitEditButton setMode={setMode} />
        </div>
    );
}
