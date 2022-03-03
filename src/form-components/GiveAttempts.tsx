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
        if (!isNaN(newRequest) && newRequest >= 0) {
            setRequest(newRequest);
            setAttempts(newRequest);
        }
    }

    function useButton(): JSX.Element {
        return (
            <Button
                disabled={attempts <= 0}
                onClick={() => setAttempts(attempts - 1)}
            >
                use
            </Button>
        );
    }

    function gainButton(): JSX.Element {
        return <Button onClick={() => setAttempts(attempts + 1)}>gain</Button>;
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="formAttempts">
                <Form.Label>Request Attempts:</Form.Label>
                <Form.Control type="number" onChange={checkNewRequest} />
            </Form.Group>
            <p>Requested Attempts: {isNaN(request) ? "" : request}</p>
            <p>Current Attempts: {attempts}</p>
            <div>
                {useButton()}
                {gainButton()}
            </div>
        </div>
    );
}
