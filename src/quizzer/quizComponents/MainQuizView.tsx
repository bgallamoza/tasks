import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";

function QuizList({
    quizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    quizzes: Quiz[];
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    // function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    //     setSelectedQuiz(event.target.value);
    // }

    return (
        <div>
            {/* <Form.Group controlId="quizList">
                <Form.Label>Please choose a Quiz</Form.Label>
                <Form.Select value={selectedQuiz} onChange={updateSelection}>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                </Form.Select>
            </Form.Group> */}
        </div>
    );
}

function TakeQuizButton({
    selectedQuiz,
    setMode
}: {
    selectedQuiz: Quiz;
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("take")}>Take Quiz</Button>;
}

function EditQuizButton({
    selectedQuiz,
    setMode
}: {
    selectedQuiz: Quiz;
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("edit")}>Edit Quiz</Button>;
}

function NewQuizButton({
    selectedQuiz,
    setMode
}: {
    selectedQuiz: Quiz;
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("new")}>+ New Quiz</Button>;
}

export function MainQuizView({
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
            <h4>Please select a quiz</h4>
            <QuizList
                quizzes={quizzes}
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
            <div>
                <TakeQuizButton selectedQuiz={selectedQuiz} setMode={setMode} />
                {"   "}
                <EditQuizButton selectedQuiz={selectedQuiz} setMode={setMode} />
            </div>
            <br></br>
            <div>
                <NewQuizButton selectedQuiz={selectedQuiz} setMode={setMode} />
            </div>
        </div>
    );
}
