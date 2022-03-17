import React, { useState } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Question } from "../../interfaces/question";
import { Button, Form } from "react-bootstrap";
import { ModifyQuestionList } from "./ModifyQuestionList";

function SaveChangesButton({
    mode,
    quizzes,
    setQuizzes,
    setSelectedQuiz,
    newQuestions,
    quizInfo
}: {
    mode: string;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    setSelectedQuiz: (newQuiz: Quiz) => void;
    newQuestions: Question[];
    quizInfo: Quiz;
}): JSX.Element {
    function saveChanges() {
        if (mode === "edit") {
            const editedQuiz: Quiz = {
                ...quizInfo,
                questions: newQuestions
            };
            setQuizzes(
                quizzes.map(
                    (q: Quiz): Quiz => (q.id === quizInfo.id ? editedQuiz : q)
                )
            );
            setSelectedQuiz(editedQuiz);
        }
    }

    return <Button onClick={() => saveChanges()}>Save Changes</Button>;
}

export function ModifyQuizViewHelper({
    mode,
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    mode: string;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    const [quizInfo, setQuizInfo] = useState<Quiz>({
        ...selectedQuiz,
        questions: []
    });
    const [questions, setQuestions] = useState<Question[]>(
        selectedQuiz.questions.map((q: Question): Question => ({ ...q }))
    );

    return (
        <div>
            <Form.Label>QUIZ NAME</Form.Label>
            <Form.Control
                value={quizInfo.title}
                onChange={(e) =>
                    setQuizInfo({ ...selectedQuiz, title: e.target.value })
                }
            />
            <ModifyQuestionList
                questions={questions}
                // dispatch={dispatch}
                setQuestions={setQuestions}
                quizInfo={quizInfo}
                setQuizInfo={setQuizInfo}
            />
            <br></br>
            <div>
                <SaveChangesButton
                    mode={mode}
                    quizzes={quizzes}
                    setQuizzes={setQuizzes}
                    setSelectedQuiz={setSelectedQuiz}
                    newQuestions={questions}
                    quizInfo={quizInfo}
                />
            </div>
        </div>
    );
}
