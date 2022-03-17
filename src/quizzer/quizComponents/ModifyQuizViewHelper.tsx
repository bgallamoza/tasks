import React, { useState, useReducer } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Question, QuestionType } from "../../interfaces/question";
import { Button, Form } from "react-bootstrap";
import { ModifyQuestionList } from "./ModifyQuestionList";

interface reduceAction {
    id: number;
    type: string;
    data: string;
}

const DUMMY_QUESTION: Question = {
    id: 0,
    name: "New Question",
    body: "",
    type: "short_answer_question" as QuestionType,
    options: [],
    expected: "",
    points: 0,
    published: false
};

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

function quizReducer(state: Question[], action: reduceAction): Question[] {
    if (action.type === "name") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id ? { ...q, name: action.data } : q
        );
    } else if (action.type == "body") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id ? { ...q, body: action.data } : q
        );
    } else if (action.type == "options") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id
                    ? { ...q, options: action.data.split("\n") }
                    : q
        );
    } else if (action.type == "expected") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id ? { ...q, expected: action.data } : q
        );
    } else if (action.type == "points") {
        if (!isNaN(parseInt(action.data))) {
            return state.map(
                (q: Question): Question =>
                    q.id === action.id
                        ? { ...q, points: parseInt(action.data) }
                        : q
            );
        }
    } else if (action.type == "published") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id
                    ? { ...q, published: "true" === action.data }
                    : q
        );
    } else if (action.type == "type") {
        return state.map(
            (q: Question): Question =>
                q.id === action.id
                    ? { ...q, type: action.data as QuestionType }
                    : q
        );
    } else if (action.type == "delete") {
        return state.filter((q: Question): boolean => q.id !== action.id);
    } else if (action.type == "add") {
        return [...state, { ...DUMMY_QUESTION }];
    }
    return [];
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
    const [questions, dispatch] = useReducer(
        quizReducer,
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
                dispatch={dispatch}
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
