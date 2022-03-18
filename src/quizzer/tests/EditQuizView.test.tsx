import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "../Quizzer";

describe("EditQuizView Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("Test that a quiz can be deleted and is unseen in the MainQuizView", () => {
        const editQuiz = screen.getByTestId("main-edit-button");
        expect(screen.getByTestId("quiz-option-0")).toBeInTheDocument();

        editQuiz.click();

        const exitButton = screen.getByTestId("edit-exit-button");
        const deleteButton = screen.getByTestId("edit-delete-button");

        deleteButton.click();
        exitButton.click();
        expect(screen.queryByTestId("quiz-option-0")).not.toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveLength(1);
    });
});
