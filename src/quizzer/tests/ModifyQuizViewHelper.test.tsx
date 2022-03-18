import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("ModifyQuizViewHelper Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const editQuiz = screen.getByTestId("main-edit-button");
        editQuiz.click();
    });
    test("Test that all fields of a quiz/questions are displayed correctly in edtior", () => {
        const quizNameField = screen.getByTestId("modify-quiz-name");
        userEvent.type(quizNameField, "{selectall}Cool New Quiz Name");

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();

        screen.getByTestId("main-take-button").click();

        expect(screen.getByText("Cool New Quiz Name")).toBeInTheDocument();
    });
});
