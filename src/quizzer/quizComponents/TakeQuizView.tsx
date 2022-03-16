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
    const [questions, setQuestions] = useState<Question[]>(quiz.questions);
    const [isOnlyPublished, setIsOnlyPublished] = useState<boolean>(false);

    function updatePublished(event: React.ChangeEvent<HTMLInputElement>) {
        const onlyPublished: boolean = event.target.checked;
        setIsOnlyPublished(onlyPublished);
        if (onlyPublished) {
            setQuestions(
                quiz.questions.filter((q: Question): boolean => q.published)
            );
        } else {
            setQuestions(quiz.questions);
        }
    }

    return (
        <div>
            <div>
                <Form.Check
                    type="checkbox"
                    id="is-published-check"
                    label="Only show published questions"
                    checked={isOnlyPublished}
                    onChange={updatePublished}
                />
            </div>
            <ol>
                {questions.map(
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
    setMode,
    selectedQuiz
}: {
    setMode: (newMode: string) => void;
    selectedQuiz: Quiz;
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
