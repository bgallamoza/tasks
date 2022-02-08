import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import pfp from "./pfp.jpg";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <h1>Brennan Gallamoza</h1>
            <img src={pfp} alt="A picture of me" />
            <p>Computer Science BS, Minor in Biology and Mathematics</p>
            <p>Hello World! Nice to meet you!</p>

            <Button
                className="button"
                onClick={() => console.log("Hello World!")}
            >
                Log Hello World
            </Button>

            <Container>
                <Row>
                    <Col>
                        <div className="red-rect"></div>
                        <ul>
                            <li>Dog</li>
                            <li>Cat</li>
                            <li>Fish</li>
                        </ul>
                    </Col>
                    <Col>
                        <div className="red-rect"></div>
                        <p>
                            You can also learn more about me on my{" "}
                            <a
                                href="https://github.com/bgallamoza"
                                rel="noreferrer"
                            >
                                Github
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
