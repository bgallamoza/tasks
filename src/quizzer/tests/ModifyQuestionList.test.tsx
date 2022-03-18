import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("ModifyQuestionList Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const editQuiz = screen.getByTestId("main-edit-button");
        editQuiz.click();
    });
    test("Test that all fields of a quiz/questions are displayed correctly in edtior", () => {
        expect(screen.queryByTestId("0-name")).toBeInTheDocument();
        expect(screen.queryByTestId("0-body")).toBeInTheDocument();
        expect(screen.queryByTestId("0-type")).toBeInTheDocument();
        expect(screen.queryByTestId("0-options")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-expected")).toBeInTheDocument();
        expect(screen.queryByTestId("0-points")).toBeInTheDocument();
        expect(screen.queryByTestId("0-published")).toBeInTheDocument();

        expect(screen.queryByTestId("1-name")).toBeInTheDocument();
        expect(screen.queryByTestId("1-body")).toBeInTheDocument();
        expect(screen.queryByTestId("1-type")).toBeInTheDocument();
        expect(screen.queryByTestId("1-options")).toBeInTheDocument();
        expect(screen.queryByTestId("1-expected")).toBeInTheDocument();
        expect(screen.queryByTestId("1-points")).toBeInTheDocument();
        expect(screen.queryByTestId("1-published")).toBeInTheDocument();

        expect(screen.queryByTestId("2-name")).toBeInTheDocument();
        expect(screen.queryByTestId("2-body")).toBeInTheDocument();
        expect(screen.queryByTestId("2-type")).toBeInTheDocument();
        expect(screen.queryByTestId("2-options")).not.toBeInTheDocument();
        expect(screen.queryByTestId("2-expected")).toBeInTheDocument();
        expect(screen.queryByTestId("2-points")).toBeInTheDocument();
        expect(screen.queryByTestId("2-published")).toBeInTheDocument();
    });
    test("Test that all fields of a question can be successfully edited", () => {
        const nameField = screen.getByTestId("0-name");
        const bodyField = screen.getByTestId("0-body");
        const typeField = screen.getByTestId("0-type");
        const expectedField = screen.getByTestId("0-expected");
        const pointsField = screen.getByTestId("0-points");
        const publishedField = screen.getByTestId("0-published");

        userEvent.type(nameField, "{selectall}{del}Adding");
        userEvent.type(bodyField, "{selectall}{del}What is 10 + 15?");
        userEvent.selectOptions(typeField, "Multiple Choice Question");
        const optionsField = screen.getByTestId("0-options");
        userEvent.type(optionsField, "{selectall}{del}6\n50\n12\n25");
        userEvent.type(expectedField, "{selectall}{del}25");
        userEvent.type(pointsField, "{selectall}67");
        publishedField.click();

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();

        screen.getByTestId("main-take-button").click();

        expect(screen.getByText("Adding")).toBeInTheDocument();
        expect(screen.getByText("What is 10 + 15?")).toBeInTheDocument();
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(7); // including the next question
        radios[3].click();
        expect(screen.getByText("67 Points")).toBeInTheDocument();
        expect(screen.getByText("CORRECT ✔️")).toBeInTheDocument();

        screen.getByTestId("take-published-check").click();

        expect(screen.queryByText("Adding")).not.toBeInTheDocument();
    });
    test("Show points field can only take in numerical values", () => {
        const pointsField = screen.getByTestId("0-points");

        // attempt to insert 'a' into points field
        userEvent.type(pointsField, "{selectall}a");

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();

        screen.getByTestId("main-take-button").click();

        // show that points field is actually still 5 points
        expect(
            within(screen.getByTestId("question-container-0")).getByText(
                "5 Points"
            )
        ).toBeInTheDocument();
    });
    test("Test to show that Move Up and Down buttons are disabled for first and last questions, respectively works", () => {
        const upButton = screen.getByTestId("0-up-button");
        const downButton = screen.getByTestId("2-down-button");
        expect(upButton).toBeDisabled();
        expect(downButton).toBeDisabled();
        // const questions = screen.getAllByRole("listitem");
        // expect(questions[0]).toHaveTextContent();
    });
    test("Test to show that Move Up button works", () => {
        const upButton = screen.getByTestId("1-up-button");
        upButton.click();
        expect(upButton).toBeDisabled();

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();
        screen.getByTestId("main-take-button").click();

        const questions = screen.getAllByRole("listitem");
        expect(
            within(questions[0]).getByText("Subtraction")
        ).toBeInTheDocument();
        expect(within(questions[1]).getByText("Addition")).toBeInTheDocument();
    });
    test("Test to show that Move Down button works", () => {
        const downButton = screen.getByTestId("1-down-button");
        downButton.click();
        expect(downButton).toBeDisabled();

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();
        screen.getByTestId("main-take-button").click();

        const questions = screen.getAllByRole("listitem");
        expect(
            within(questions[2]).getByText("Subtraction")
        ).toBeInTheDocument();
        expect(
            within(questions[1]).getByText("Multiple Operations")
        ).toBeInTheDocument();
    });
    test("Test that a question can be created and viewed in TakeQuiz", () => {
        const addButton = screen.getByTestId("modify-add-button");

        addButton.click();

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();
        expect(screen.getByText("4 Questions")).toBeInTheDocument();

        screen.getByTestId("main-take-button").click();

        const newQuestion = screen.getByTestId("question-container-3");
        expect(
            within(newQuestion).getByText("New Question")
        ).toBeInTheDocument();
        expect(
            within(newQuestion).getByText("Sample Body")
        ).toBeInTheDocument();
        expect(
            within(newQuestion).getByTestId("3-textbox")
        ).toBeInTheDocument();
        expect(within(newQuestion).getByText("0 Points")).toBeInTheDocument();
    });
    test("Test that a question can be removed and is absent from TakeQuiz", () => {
        const removeButton = screen.getByTestId("0-delete-button");

        removeButton.click();

        screen.getByTestId("modify-save-button").click();
        screen.getByTestId("edit-exit-button").click();
        expect(screen.getByText("2 Questions")).toBeInTheDocument();

        screen.getByTestId("main-take-button").click();

        expect(screen.queryByTestId("0-name")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-body")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-type")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-options")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-expected")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-points")).not.toBeInTheDocument();
        expect(screen.queryByTestId("0-published")).not.toBeInTheDocument();
    });
});
