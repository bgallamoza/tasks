import React from "react";
import { Question, QuestionType } from "../../interfaces/question";
import { Quiz } from "../../interfaces/quiz";
import { Button, Form } from "react-bootstrap";

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
    setQuestions,
    quizInfo,
    setQuizInfo
}: {
    questions: Question[];
    setQuestions: (newQuestions: Question[]) => void;
    quizInfo: Quiz;
    setQuizInfo: (newQuizInfo: Quiz) => void;
}): JSX.Element {
    function deleteQuestion(id: number) {
        setQuestions(questions.filter((q: Question): boolean => q.id !== id));
    }

    function addQuestion(id: number) {
        setQuestions([...questions, { ...DUMMY_QUESTION, id: id + 1 }]);
        setQuizInfo({
            ...quizInfo,
            max_question_id: id + 1
        });
    }

    function updateQuestion(newQuestion: Question) {
        setQuestions(
            questions.map(
                (q: Question): Question =>
                    q.id === newQuestion.id ? newQuestion : q
            )
        );
    }

    function updatePoints(id: number, value: string) {
        if (!isNaN(parseInt(value))) {
            setQuestions(
                questions.map(
                    (q: Question): Question =>
                        q.id === id ? { ...q, points: parseInt(value) } : q
                )
            );
        }
    }

    function updateOrder(currentIdx: number, action: string) {
        const reorderedQuestions: Question[] = [...questions];
        if (action === "up") {
            if (currentIdx > 0) {
                const tmp: Question = reorderedQuestions[currentIdx];
                reorderedQuestions[currentIdx] =
                    reorderedQuestions[currentIdx - 1];
                reorderedQuestions[currentIdx - 1] = tmp;
                setQuestions(reorderedQuestions);
            }
        } else {
            if (currentIdx < questions.length - 1) {
                const tmp: Question = reorderedQuestions[currentIdx];
                reorderedQuestions[currentIdx] =
                    reorderedQuestions[currentIdx + 1];
                reorderedQuestions[currentIdx + 1] = tmp;
                setQuestions(reorderedQuestions);
            }
        }
    }

    return (
        <div>
            <ol>
                {questions.map(
                    (q: Question, idx: number): JSX.Element => (
                        <li key={q.id}>
                            <Form.Label>Question Name:</Form.Label>
                            <Form.Control
                                value={q.name}
                                onChange={(e) =>
                                    // handleQuestions(q, "name", e.target.value)
                                    updateQuestion({
                                        ...q,
                                        name: e.target.value
                                    })
                                }
                            />
                            <Form.Label>Question Body:</Form.Label>
                            <Form.Control
                                value={q.body}
                                onChange={(e) =>
                                    updateQuestion({
                                        ...q,
                                        body: e.target.value
                                    })
                                }
                            />
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                value={q.type.toString()}
                                onChange={(e) =>
                                    updateQuestion({
                                        ...q,
                                        type: e.target.value as QuestionType
                                    })
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
                                            updateQuestion({
                                                ...q,
                                                options:
                                                    e.target.value.split("\n")
                                            })
                                        }
                                    />
                                </>
                            )}
                            <Form.Label>Expected Answer</Form.Label>
                            <Form.Control
                                value={q.expected}
                                onChange={(e) =>
                                    updateQuestion({
                                        ...q,
                                        expected: e.target.value
                                    })
                                }
                            />
                            <Form.Label>Question Points</Form.Label>
                            <Form.Control
                                value={q.points}
                                onChange={(e) =>
                                    updatePoints(q.id, e.target.value)
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="edit-published-check"
                                label="Publish Question"
                                checked={q.published}
                                onChange={(e) =>
                                    updateQuestion({
                                        ...q,
                                        published: e.target.checked
                                    })
                                }
                            />
                            <div>
                                <Button
                                    disabled={idx === 0}
                                    onClick={() => updateOrder(idx, "up")}
                                >
                                    Move Up
                                </Button>
                                <Button
                                    disabled={idx === questions.length - 1}
                                    onClick={() => updateOrder(idx, "down")}
                                >
                                    Move Down
                                </Button>
                            </div>
                            <br></br>
                            <div>
                                <Button onClick={() => deleteQuestion(q.id)}>
                                    Delete Question
                                </Button>
                            </div>
                            <br></br>
                        </li>
                    )
                )}
            </ol>
            <div>
                <Button onClick={() => addQuestion(quizInfo.max_question_id)}>
                    Add New Question
                </Button>
            </div>
        </div>
    );
}
