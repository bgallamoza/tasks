import React from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button } from "react-bootstrap";
import { ModifyQuizViewHelper } from "./ModifyQuizViewHelper";

const PLACEHOLDER_QUIZ: Quiz = {
    id: NaN,
    title: "",
    description: "",
    max_question_id: 0,
    questions: []
};

function ExitEditButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <Button data-testid="edit-exit-button" onClick={() => setMode("main")}>
            Exit Editor
        </Button>
    );
}

function DeleteQuizButton({
    setMode,
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    setMode: (newMode: string) => void;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newSelection: Quiz) => void;
}): JSX.Element {
    function handleDelete() {
        const newQuizzes: Quiz[] = quizzes.filter(
            (q: Quiz): boolean => q.id !== selectedQuiz.id
        );
        setQuizzes(newQuizzes);
        newQuizzes.length === 0
            ? setSelectedQuiz(PLACEHOLDER_QUIZ)
            : setSelectedQuiz(newQuizzes[0]);
        setMode("main");
    }
    return (
        <Button data-testid="edit-delete-button" onClick={() => handleDelete()}>
            Delete Quiz
        </Button>
    );
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
                newQuizId={NaN} // dummy val; unusued by edit
                setNewQuizId={(n: number) => n} // dummy function; unusued by edit
            />
            <br></br>
            <DeleteQuizButton
                setMode={setMode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
            <br></br>
            <ExitEditButton setMode={setMode} />
        </div>
    );
}
