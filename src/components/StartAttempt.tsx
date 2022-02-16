import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const changeAttempt = (action: string): void => {
        if (action === "add") setAttempts(attempts + 1);
        else if (action === "sub") {
            if (attempts > 0) setAttempts(attempts - 1);
        }
    };
    return (
        <div>
            <h3>StartAttempt</h3>
            <p>Quiz Attempts: {attempts}</p>
            <Button
                disabled={inProgress || attempts === 0}
                onClick={() => {
                    changeAttempt("sub");
                    setInProgress(true);
                }}
            >
                Start Quiz
            </Button>
            <Button disabled={!inProgress} onClick={() => setInProgress(false)}>
                Stop Quiz
            </Button>
            <Button
                disabled={inProgress}
                onClick={() => {
                    changeAttempt("add");
                }}
            >
                Mulligan
            </Button>
        </div>
    );
}
