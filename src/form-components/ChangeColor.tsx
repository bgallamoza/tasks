import React, { useState } from "react";
import { Form } from "react-bootstrap";

const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "white",
    "black"
];

export function ChangeColor(): JSX.Element {
    const [textColor, setTextColor] = useState<string>(colors[0]);

    return (
        <div>
            <h3>Change Color</h3>
            {colors.map(
                (color: string): JSX.Element => (
                    <Form.Check
                        key={color}
                        inline
                        type="radio"
                        name="color"
                        onChange={(e) => setTextColor(e.target.value)}
                        id={color}
                        label={color}
                        value={color}
                        checked={textColor === color}
                        style={{ backgroundColor: color }}
                    />
                )
            )}
            <div>
                You have chosen{" "}
                <a
                    data-testid="colored-box"
                    style={{ backgroundColor: textColor }}
                >
                    {textColor}
                </a>
            </div>
        </div>
    );
}
