import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }

    function getResult() {
        return answer === expectedAnswer
            ? "✔️ Your answer is correct!"
            : "❌ Your answer is incorrect.";
    }

    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="formAnswerName">
                <Form.Label>Your Answer:</Form.Label>
                <Form.Control
                    value={answer}
                    onChange={updateAnswer}
                ></Form.Control>
            </Form.Group>
            <div>{getResult()}</div>
        </div>
    );
}
