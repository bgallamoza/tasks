import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [type, setType] = useState<QuestionType>("short_answer_question");
    const toggleType = (): void => {
        setType(
            type === "short_answer_question"
                ? "multiple_choice_question"
                : "short_answer_question"
        );
    };
    return (
        <div>
            <h3>ChangeType</h3>
            <Button onClick={toggleType}>Change Type</Button>
            {
                <div>
                    {type === "short_answer_question"
                        ? "Short Answer"
                        : "Multiple Choice"}
                </div>
            }
        </div>
    );
}
