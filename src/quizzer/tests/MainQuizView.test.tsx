import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("Test # of buttons in MainQuizView", () => {
        expect(screen.queryAllByRole("button")).toHaveLength(3);
    });
    test("There is a select box", () => {
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveLength(2);
    });
    test("You can select the test data and the quiz title/body displays", () => {
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "Addition/Subtraction Problems");
        expect(
            screen.getByText("Addition/Subtraction Problems")
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Basic elementary addition and subtraction problems."
            )
        ).toBeInTheDocument();

        userEvent.selectOptions(select, "Multiplication/Division Problems");
        expect(
            screen.getByText("Multiplication/Division Problems")
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Basic elementary multiplication and division problems."
            )
        ).toBeInTheDocument();
    });
    test("Test Take Quiz button", () => {
        const takeQuiz = screen.getByTestId("main-take-button");
        expect(takeQuiz).toBeInTheDocument();
        expect(screen.getByText("Please select a quiz")).toBeInTheDocument();
        takeQuiz.click();
        expect(
            screen.queryByText("Please select a quiz")
        ).not.toBeInTheDocument();
    });
    test("Test New Quiz button", () => {
        const newQuiz = screen.getByTestId("main-new-button");
        expect(newQuiz).toBeInTheDocument();
        expect(screen.getByText("Please select a quiz")).toBeInTheDocument();
        newQuiz.click();
        expect(
            screen.queryByText("Please select a quiz")
        ).not.toBeInTheDocument();
    });
    test("Test Edit Quiz button", () => {
        const editQuiz = screen.getByTestId("main-edit-button");
        expect(editQuiz).toBeInTheDocument();
        expect(screen.getByText("Please select a quiz")).toBeInTheDocument();
        editQuiz.click();
        expect(
            screen.queryByText("Please select a quiz")
        ).not.toBeInTheDocument();
    });
});
