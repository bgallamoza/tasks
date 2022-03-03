import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditMode(): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(true);
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    function updateName(event: ChangeEvent) {
        setName(event.target.value);
    }

    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }

    function updateEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setEditMode(event.target.checked);
    }

    function studentSwitch(): JSX.Element {
        return (
            <div>
                <Form.Check
                    type="switch"
                    id="student-check"
                    label="Student?"
                    checked={isStudent}
                    onChange={updateStudent}
                />
            </div>
        );
    }

    function studentForm(): JSX.Element {
        return (
            <div>
                <Form.Group controlId="formStudentName">
                    <Form.Label>Enter Name:</Form.Label>
                    <Form.Control value={name} onChange={updateName} />
                </Form.Group>
                <div>{studentSwitch()}</div>
            </div>
        );
    }

    function viewMode(): JSX.Element {
        return (
            <div>
                {name} is{isStudent ? "" : " not"} a student.
            </div>
        );
    }

    return (
        <div>
            <h3>Edit Mode</h3>
            {editMode ? studentForm() : viewMode()}
            <Form.Check
                type="switch"
                id="edit-check"
                label="Edit Mode"
                checked={editMode}
                onChange={updateEditMode}
            />
        </div>
    );
}
