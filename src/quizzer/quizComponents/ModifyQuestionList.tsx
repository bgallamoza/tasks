import React, { Dispatch } from "react";
import { Question, QuestionType } from "../../interfaces/question";
import { Quiz } from "../../interfaces/quiz";
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

export function ModifyQuestionList({
    questions,
    dispatch,
    quizInfo,
    setQuizInfo
}: {
    questions: Question[];
    dispatch: Dispatch<reduceAction>;
    quizInfo: Quiz;
    setQuizInfo: (newQuizInfo: Quiz) => void;
}): JSX.Element {
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
        </div>
    );
}
