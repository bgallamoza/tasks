import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Answer } from "../../interfaces/answer";
import { Question } from "../../interfaces/question";
import { Button, Form } from "react-bootstrap";

function ExitQuizButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("main")}>Exit Quiz</Button>;
}

function ClearAnswersButton({
    quiz,
    setResetAnswer
}: {
    quiz: Quiz;
    setResetAnswer: (newAnswers: Answer[]) => void;
}): JSX.Element {
    return (
        <Button
            onClick={() =>
                setResetAnswer(
                    quiz.questions.map(
                        (q: Question): Answer => ({
                            questionId: q.id,
                            text: "",
                            submitted: false,
                            correct: false,
                            pointsEarned: 0
                        })
                    )
                )
            }
        >
            Reset Answers
        </Button>
    );
}

function QuestionOptions({
    question,
    answers,
    setAnswers,
    totalPoints,
    setTotalPoints
}: {
    question: Question;
    answers: Answer[];
    setAnswers: (newAnswers: Answer[]) => void;
    totalPoints: number;
    setTotalPoints: (newPoints: number) => void;
}): JSX.Element {
    const currentAnswer: Answer = answers.filter(
        (a: Answer): boolean => question.id === a.questionId
    )[0];

    function updateAnswers(event: React.ChangeEvent<HTMLInputElement>) {
        function updateCurrentAnswer(
            ans: Answer,
            event: React.ChangeEvent<HTMLInputElement>
        ): Answer {
            const isCorrect: boolean = event.target.value === question.expected;
            return {
                ...ans,
                submitted: true,
                correct: isCorrect,
                text: event.target.value,
                pointsEarned: question.points * (isCorrect ? 1 : 0)
            };
        }

        const newAnswers: Answer[] = answers.map(
            (a: Answer): Answer =>
                a.questionId === question.id ? updateCurrentAnswer(a, event) : a
        );
        setAnswers(newAnswers);
        setTotalPoints(
            newAnswers
                .map((a: Answer): number => a.pointsEarned)
                .reduce((a, b): number => a + b, 0)
        );
    }

    function feedback(): string {
        if (!currentAnswer.submitted) {
            return "Unanswered";
        }
        return currentAnswer.correct ? "CORRECT ✔️" : "WRONG ❌";
    }

    if (question.type === "short_answer_question") {
        return (
            <div>
                {" "}
                <Form.Control
                    value={currentAnswer.text}
                    onChange={updateAnswers}
                />
                {feedback()}
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
                            checked={choice === currentAnswer.text}
                            onChange={updateAnswers}
                        />
                    )
                )}
                {feedback()}
            </div>
        );
    }
}

function QuizQuestionList({ quiz }: { quiz: Quiz }): JSX.Element {
    const [questions, setQuestions] = useState<Question[]>(quiz.questions);
    const [isOnlyPublished, setIsOnlyPublished] = useState<boolean>(false);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer[]>(
        quiz.questions.map(
            (q: Question): Answer => ({
                questionId: q.id,
                text: "",
                submitted: false,
                correct: false,
                pointsEarned: 0
            })
        )
    );

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
                                <QuestionOptions
                                    question={q}
                                    answers={answers}
                                    setAnswers={setAnswers}
                                    totalPoints={totalPoints}
                                    setTotalPoints={setTotalPoints}
                                />
                            </div>
                            <p>{q.points} Points</p>
                            <hr></hr>
                        </li>
                    )
                )}
            </ol>
            <p>Total points earned: {totalPoints}</p>
            <ClearAnswersButton quiz={quiz} setResetAnswer={setAnswers} />
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
