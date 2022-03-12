import React, { useState } from "react";
import { NewQuizView } from "./quizComponents/NewQuizView";
import { EditQuizView } from "./quizComponents/EditQuizView";
import { MainQuizView } from "./quizComponents/MainQuizView";
import { TakeQuizView } from "./quizComponents/TakeQuizView";
import { Quiz } from "../interfaces/quiz";
import { Question, QuestionType } from "../interfaces/question";
import quizData from "./quizData/quizzes.json";

const NO_SELECTED_QUIZ: Quiz = {
    id: -1,
    title: "None",
    description: "",
    length: 0,
    questions: []
};

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
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
        );
    } else if (mode === "take") {
        return (
            <TakeQuizView
                mode={mode}
                setMode={setMode}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                selectedQuiz={selectedQuiz}
                setSelectedQuiz={setSelectedQuiz}
            />
        );
    }
    return (
        <MainQuizView
            mode={mode}
            setMode={setMode}
            quizzes={quizzes}
            setQuizzes={setQuizzes}
            selectedQuiz={selectedQuiz}
            setSelectedQuiz={setSelectedQuiz}
        />
    );
}

export function Quizzer(): JSX.Element {
    const [mode, setMode] = useState<string>("main");
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(
        quizzes.length > 0 ? QUIZZES[0] : NO_SELECTED_QUIZ
    );

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
        </div>
    );
}
