import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard'
import { getQuestions, Difficulty, QuestionState } from './API'

// Styles 
import { GlobalStyle, Wrapper } from './App.styles'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;


function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    // startQuiz()
  }, [])

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await getQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user Answers
      const answer = e.currentTarget.value;
      //Check answer against correct answer;
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      //Save answer in array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(prev => prev + 1);
    }
  }

  return (
    <>
      <GlobalStyle/>
        <Wrapper>
          <h1>TypeScript Quiz App</h1>
          {
            gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className="start" onClick={startQuiz}>Start</button>) : null
          }

          {!gameOver ? <p className="score">Score: {score}</p> : null}
          {loading ? <p>Loading questions...</p> : null}

          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}

          {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS ?
            (<button className="next" onClick={nextQuestion}>Next Question</button>)
            :
            null
          }

        </Wrapper>
    </>
  );
}

export default App;
