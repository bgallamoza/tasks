import React from "react";
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
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(event.target.value);
        console.log(id);
        console.log(quizzes[id]);
        setSelectedQuiz(quizzes[id]);
    }

    return (
        <div>
            <Form.Group controlId="quizList">
                <Form.Select value={selectedQuiz.id} onChange={updateSelection}>
                    {quizzes.map(
                        (q: Quiz): JSX.Element => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p>{selectedQuiz.description}</p>
        </div>
    );
}

function TakeQuizButton({
    setMode,
    selectedQuiz
}: {
    setMode: (newMode: string) => void;
    selectedQuiz: Quiz;
}): JSX.Element {
    return (
        <Button
            disabled={isNaN(selectedQuiz.id)}
            onClick={() => setMode("take")}
        >
            Take Quiz
        </Button>
    );
}

function EditQuizButton({
    setMode,
    selectedQuiz
}: {
    setMode: (newMode: string) => void;
    selectedQuiz: Quiz;
}): JSX.Element {
    return (
        <Button
            disabled={isNaN(selectedQuiz.id)}
            onClick={() => setMode("edit")}
        >
            Edit Quiz
        </Button>
    );
}

function NewQuizButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("new")}>+ New Quiz</Button>;
}

export function MainQuizView({
    setMode,
    quizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    setMode: (newMode: string) => void;
    quizzes: Quiz[];
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
            <p>{"Don't see your quiz? Make a new one:"}</p>
            <div>
                <NewQuizButton setMode={setMode} />
            </div>
        </div>
    );
}
