import { Question } from "./question";

/***
 * A representation of a students' answer in a quizzing game
 */
export interface Quiz {
    id: number;
    title: string;
    description: string;
    length: number;
    questions: Question[];
}
