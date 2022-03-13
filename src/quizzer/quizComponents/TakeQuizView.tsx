import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Question } from "../../interfaces/question";
import { Button, Form } from "react-bootstrap";

function ExitQuizButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Exit Quiz</Button>;
}

function QuestionOptions({ question }: { question: Question }): JSX.Element {
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(event.target.value);
    }

    if (question.type === "short_answer_question") {
        return (
            <div>
                {" "}
                <Form.Control value={answer} onChange={updateAnswer} />
                {question.expected === answer ? "CORRECT ✔️" : "WRONG ❌"}
            </div>
        );
    } else {
        return (
            <div>
                {question.options.map(
                    (choice: string): JSX.Element => (
                        <Form.Check
                            key={`${question.id}-${choice}`}
                            type="radio"
                            name="choice"
                            id={`${question.id}-${choice}`}
                            label={choice}
                            value={choice}
                            checked={choice === answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    )
                )}
                {question.expected === answer ? "CORRECT ✔️" : "WRONG ❌"}
            </div>
        );
    }
}

function QuizQuestionList({ quiz }: { quiz: Quiz }): JSX.Element {
    return (
        <div>
            <ol>
                {quiz.questions.map(
                    (q: Question): JSX.Element => (
                        <li key={q.id}>
                            <p>
                                <b>{q.name}</b>
                            </p>
                            <p>{q.body}</p>
                            <div>
                                <QuestionOptions question={q} />
                            </div>
                            <p>{q.points} Points</p>
                            <hr></hr>
                        </li>
                    )
                )}
            </ol>
        </div>
    );
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
            <QuizQuestionList quiz={selectedQuiz} />
            <div>
                <ExitQuizButton setMode={setMode} />
            </div>
        </div>
    );
}
