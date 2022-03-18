import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("TakeQuizView Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const takeQuiz = screen.getByTestId("main-take-button");
        takeQuiz.click();
    });
    test("Check that Quiz and Question names are present", () => {
        expect(
            screen.getByText("Addition/Subtraction Problems")
        ).toBeInTheDocument();
        expect(screen.getByText("Addition")).toBeInTheDocument();
        expect(screen.getByText("Subtraction")).toBeInTheDocument();
        expect(screen.getByText("Multiple Operations")).toBeInTheDocument();
    });
    test("Check that 2 textboxes and 3 radio buttons are present", () => {
        expect(screen.queryAllByRole("textbox")).toHaveLength(2);
        expect(screen.queryAllByRole("radio")).toHaveLength(3);
    });
    test("Check that quiz starts with unanswered questions and no points", () => {
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();
        expect(screen.queryAllByText("Unanswered")).toHaveLength(3);
    });
    test("Check that quiz correctness and points update correctly for short answers", () => {
        const additionTextBox = screen.getByTestId("0-textbox");
        const operationTextBox = screen.getByTestId("2-textbox");
        userEvent.type(additionTextBox, "5");
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(1);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(0);
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();

        userEvent.type(operationTextBox, "9");
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(1);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(1);
        expect(screen.getByText("Total points earned: 10")).toBeInTheDocument();

        userEvent.type(operationTextBox, "12");
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(2);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(0);
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();
    });
    test("Test that quiz correctness and points update correctly for radio buttons", () => {
        const radios = screen.getAllByRole("radio");
        radios[0].click();
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(1);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(0);
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();

        radios[1].click();
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(1);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(0);
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();

        radios[2].click();
        expect(screen.queryAllByText(/WRONG ❌/i)).toHaveLength(0);
        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(1);
        expect(screen.getByText("Total points earned: 5")).toBeInTheDocument();
    });
    test("Check that Reset Answers button works", () => {
        const resetButton = screen.getByTestId("take-clear-button");
        const additionTextBox = screen.getByTestId("0-textbox");
        const operationTextBox = screen.getByTestId("2-textbox");
        const subtractRadio = screen.getByTestId("1-0");

        userEvent.type(additionTextBox, "10");
        subtractRadio.click();
        userEvent.type(operationTextBox, "9");

        expect(screen.queryAllByText(/CORRECT ✔️/i)).toHaveLength(3);
        expect(screen.getByText("Total points earned: 20")).toBeInTheDocument();

        resetButton.click();

        expect(screen.queryAllByText("Unanswered")).toHaveLength(3);
        expect(screen.getByText("Total points earned: 0")).toBeInTheDocument();
    });
    test("Test that Exit Quiz button works", () => {
        const exitButton = screen.getByTestId("take-exit-button");
        exitButton.click();
        expect(screen.getByText("Please select a quiz")).toBeInTheDocument();
    });
    test("Test that the show publish questions checkbox works", () => {
        const checkbox = screen.getByTestId("take-published-check");

        checkbox.click();
        expect(
            screen.queryByText("Multiple Operations")
        ).not.toBeInTheDocument();

        checkbox.click();
        expect(screen.getByText("Multiple Operations")).toBeInTheDocument();
    });
});
