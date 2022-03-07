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

function ColoredText({ textColor }: { textColor: string }): JSX.Element {
    return (
        <div>
            You have chosen{" "}
            <a data-testid="colored-box" style={{ backgroundColor: textColor }}>
                {textColor}
            </a>
        </div>
    );
}

function ColorOptions({
    textColor,
    setTextColor
}: {
    textColor: string;
    setTextColor: (color: string) => void;
}): JSX.Element {
    return (
        <div>
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
        </div>
    );
}

export function ChangeColor(): JSX.Element {
    const [textColor, setTextColor] = useState<string>(colors[0]);

    return (
        <div>
            <h3>Change Color</h3>
            <ColorOptions textColor={textColor} setTextColor={setTextColor} />
            <ColoredText textColor={textColor} />
        </div>
    );
}
