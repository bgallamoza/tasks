import React, { useReducer } from "react";
import { Quiz } from "../../interfaces/quiz";
import { Question, QuestionType } from "../../interfaces/question";
import { Button, Form } from "react-bootstrap";

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
    selectedQuiz,
    setSelectedQuiz,
    newQuestions
}: {
    mode: string;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
    newQuestions: Question[];
}): JSX.Element {
    function saveChanges() {
        if (mode === "edit") {
            const editedQuiz: Quiz = {
                ...selectedQuiz,
                questions: newQuestions
            };
            setQuizzes(
                quizzes.map(
                    (q: Quiz): Quiz =>
                        q.id === selectedQuiz.id ? editedQuiz : q
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
    const [questions, dispatch] = useReducer(
        quizReducer,
        selectedQuiz.questions.map((q: Question): Question => ({ ...q }))
    );

    function handleQuestions(q: Question, type: string, data: string): void {
        dispatch({ id: q.id, type: type, data: data });
    }

    return (
        <div>
            <ol>
                {questions.map(
                    (q: Question): JSX.Element => (
                        <li key={q.id}>
                            <Form.Label>Question Name:</Form.Label>
                            <Form.Control
                                value={q.name}
                                onChange={(e) =>
                                    handleQuestions(q, "name", e.target.value)
                                }
                            />
                            <Form.Label>Question Body:</Form.Label>
                            <Form.Control
                                value={q.body}
                                onChange={(e) =>
                                    handleQuestions(q, "body", e.target.value)
                                }
                            />
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                value={q.type.toString()}
                                onChange={(e) =>
                                    handleQuestions(q, "type", e.target.value)
                                }
                            >
                                <option value="multiple_choice_question">
                                    Multiple Choice Question
                                </option>
                                <option value="short_answer_question">
                                    Short Answer Question
                                </option>
                            </Form.Select>
                            {q.type.toString() ===
                                "multiple_choice_question" && (
                                <>
                                    <Form.Label>
                                        Question Options (newline separated):
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={q.options.length + 2}
                                        value={q.options.join("\n")}
                                        onChange={(e) =>
                                            handleQuestions(
                                                q,
                                                "options",
                                                e.target.value
                                            )
                                        }
                                    />
                                </>
                            )}
                            <Form.Label>Expected Answer</Form.Label>
                            <Form.Control
                                value={q.expected}
                                onChange={(e) =>
                                    handleQuestions(
                                        q,
                                        "expected",
                                        e.target.value
                                    )
                                }
                            />
                            <Form.Label>Question Points</Form.Label>
                            <Form.Control
                                value={q.points}
                                onChange={(e) =>
                                    handleQuestions(q, "value", e.target.value)
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="edit-published-check"
                                label="Publish Question"
                                checked={q.published}
                                onChange={(e) =>
                                    handleQuestions(
                                        q,
                                        "expected",
                                        String(e.target.value)
                                    )
                                }
                            />
                            <Button
                                onClick={() => handleQuestions(q, "delete", "")}
                            >
                                Delete Question
                            </Button>
                        </li>
                    )
                )}
            </ol>
            <div>
                <Button
                    onClick={() => handleQuestions(DUMMY_QUESTION, "add", "")}
                >
                    Add New Question
                </Button>
            </div>
            <br></br>
            <div>
                <SaveChangesButton
                    mode={mode}
                    quizzes={quizzes}
                    setQuizzes={setQuizzes}
                    selectedQuiz={selectedQuiz}
                    setSelectedQuiz={setSelectedQuiz}
                    newQuestions={questions}
                />
            </div>
        </div>
    );
}
