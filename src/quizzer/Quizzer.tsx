import React, { useState } from "react";
import { NewQuizView } from "./quizComponents/NewQuizView";
import { EditQuizView } from "./quizComponents/EditQuizView";
import { MainQuizView } from "./quizComponents/MainQuizView";
import { TakeQuizView } from "./quizComponents/TakeQuizView";
import { Checklist } from "./quizComponents/Checklist";
import { Quiz } from "../interfaces/quiz";
import { Question, QuestionType } from "../interfaces/question";
import sketch from "./img/task11_sketch.png";
import quizData from "./quizData/quizzes.json";

const QUIZZES: Quiz[] = quizData.map(
    (quiz): Quiz => ({
        ...quiz,
        questions: quiz.questions.map(
            (question): Question => ({
                ...question,
                type: question.type as QuestionType
            })
        )
    })
);

const NEW_QUIZ: Quiz = {
    id: 10,
    title: "New Quiz",
    description: "",
    max_question_id: 0,
    questions: []
};

function CurrentView({
    mode,
    setMode,
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz
}: {
    mode: string;
    setMode: (newMode: string) => void;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
    selectedQuiz: Quiz;
    setSelectedQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    // Wouldn't it be nice if the linter let me use switches? Alas
    if (mode === "edit") {
        return (
            <EditQuizView
                mode={mode}
                setMode={setMode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
        );
    } else if (mode === "new") {
        return (
            <NewQuizView
                mode={mode}
                setMode={setMode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                selectedQuiz={{ ...NEW_QUIZ }}
                setSelectedQuiz={setSelectedQuiz}
            />
        );
    } else if (mode === "take") {
        return <TakeQuizView setMode={setMode} selectedQuiz={selectedQuiz} />;
    }
    return (
        <MainQuizView
            setMode={setMode}
            quizzes={quizzes}
            selectedQuiz={selectedQuiz}
            setSelectedQuiz={setSelectedQuiz}
        />
    );
}

export function Quizzer(): JSX.Element {
    const [mode, setMode] = useState<string>("main");
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(QUIZZES[0]);

    return (
        <div>
            <h3>Quizzer</h3>
            <CurrentView
                mode={mode}
                setMode={setMode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
            <hr></hr>
            <div>
                <Checklist></Checklist>
            </div>
            <img src={sketch} alt="My task 11 sketch" />
        </div>
    );
}
