import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("NewQuizView tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const newQuiz = screen.getByTestId("main-new-button");
        newQuiz.click();
    });
    test("Test that a new quiz can be created, saved, and viewed back in the MainQuizView", () => {
        const exitButton = screen.getByTestId("new-exit-button");
        const saveButton = screen.getByTestId("modify-save-button");

        saveButton.click();
        exitButton.click();
        expect(screen.getByText("Please select a quiz")).toBeInTheDocument();

        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "New Quiz");
        expect(screen.getByText("Sample Description")).toBeInTheDocument();
    });
});
