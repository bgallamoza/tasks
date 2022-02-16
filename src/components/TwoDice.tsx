import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [D1, setD1] = useState<number>(1);
    const [D2, setD2] = useState<number>(6);

    const getResult = (): string => {
        // handles the printed result of the TwoDice component
        if (D1 === D2) {
            if (D1 === 1) return "You Lose";
            return "You Win!";
        }
        return "In Progress...";
    };

    return (
        <div>
            <h3>TwoDice</h3>
            <Container>
                <Row>
                    <Col>
                        <span data-testid="left-die">
                            Left Die Value: {D1}
                            <div>
                                <Button onClick={() => setD1(d6())}>
                                    Roll Left
                                </Button>
                            </div>
                        </span>
                    </Col>
                    <Col>
                        <span data-testid="right-die">
                            Right Die Value: {D2}
                            <div>
                                <Button onClick={() => setD2(d6())}>
                                    Roll Right
                                </Button>
                            </div>
                        </span>
                    </Col>
                </Row>
            </Container>
            <p>Game Result: {getResult()}</p>
        </div>
    );
}
