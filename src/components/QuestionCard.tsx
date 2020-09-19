import React from 'react'
import {AnswerObject} from '../App'
import {Wrapper, ButtomWrapper} from './QuestionCard.styles'

export type QuestionCardProps = {
  question: string;
  answers: string[];
  callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined ;
  questionNumber: number;
  totalQuestions: number; 
}


const QuestionCard: React.FC<QuestionCardProps> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) =>{
  return (
    <>
    <Wrapper>
    <div>
      <p className="number">Question: {questionNumber} / {totalQuestions}</p>
      <p dangerouslySetInnerHTML={{__html: question}} />
      <div>
        {answers.map(answer => (
          <ButtomWrapper 
            correct={userAnswer?.correctAnswer === answer} 
            userClicked={userAnswer?.answer === answer} 
            key={answer}
          >
            <button disabled={!!userAnswer} onClick={callback} value={answer}>
              <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
          </ButtomWrapper>
        ))}
      </div>
    </div>
    </Wrapper>
    </>
  )
}


export default QuestionCard;