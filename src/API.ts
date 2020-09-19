import {randomArray} from './ultils'


export type QuestionResponse = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  difficulty: string;
  type: string;
}

export type QuestionState = QuestionResponse & {answers: string[]}

export enum Difficulty{
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export const getQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
  const urlEndpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const response = await fetch(urlEndpoint);
  const data = await response.json();
  return data.results.map((question: QuestionResponse) => {
    return {
      ...question,
      answers: randomArray([...question.incorrect_answers, question.correct_answer])
    }
  });
}