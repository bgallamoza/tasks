import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function GiveAttempts(): JSX.Element {
    const [request, setRequest] = useState<number>(NaN);
    const [attempts, setAttempts] = useState<number>(3);

    function checkNewRequest(event: ChangeEvent) {
        const newRequest = parseInt(event.target.value);
        setRequest(newRequest);
    }

    function useButton(): JSX.Element {
        return (
            <Button
                name="use"
                disabled={attempts <= 0}
                onClick={() => setAttempts(attempts - 1)}
            >
                use
            </Button>
        );
    }

    function gainButton(): JSX.Element {
        return (
            <Button
                name="gain"
                onClick={() =>
                    setAttempts(
                        attempts +
                            (!isNaN(request) && request >= 0 ? request : 0)
                    )
                }
            >
                gain
            </Button>
        );
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="formAttempts">
                <Form.Label>Request Attempts:</Form.Label>
                <Form.Control type="number" onChange={checkNewRequest} />
            </Form.Group>
            <div>
                Requested Attempts:{" "}
                {!isNaN(request) && request >= 0
                    ? "Please enter a valid request."
                    : request}
            </div>
            <div>Current Attempts: {attempts}</div>
            <div>
                {useButton()}
                {gainButton()}
            </div>
        </div>
    );
}
