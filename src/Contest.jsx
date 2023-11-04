import React, { useState, useEffect } from 'react';
import './Contest.css'
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import { DataGrid} from '@mui/x-data-grid';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


const getRandomQuestions = (words) =>{
    let questions = [];
    let idList = [];
    let que = words.map((word)=>(word))

    let i = 0;
    while( i < 3){
        let randomNum = getRandomInt(1, que.length)
        if(!idList.includes(randomNum)){
            questions.push({
                questionText: `${que[randomNum - 1].word}`,
                answerOptions: shuffle([
                    { answerText: que[(randomNum)%que.length]?.meaning, isCorrect: false },
                    { answerText: que[(randomNum + 1)%que.length]?.meaning, isCorrect: false },
                    { answerText: que[randomNum - 1]?.meaning, isCorrect: true },
                    { answerText: que[(randomNum + 2)%que.length]?.meaning, isCorrect: false },
                ])
            },)
            idList.push(randomNum)
            que = que.filter((d)=>(
                d.id != randomNum
            ))
            ++i;
        }
    }

    return questions
}

const ques = [
    {
        questionText: 'Apple',
        answerOptions: [
            { answerText: 'Đức', isCorrect: false },
            { answerText: 'Hà Lan ', isCorrect: false },
            { answerText: 'Táo', isCorrect: true },
            { answerText: 'Nga', isCorrect: false },
        ],
    },
    {
        questionText: 'Book',
        answerOptions: [
            { answerText: ' Phê duyệt ', isCorrect: false },
            { answerText: 'Sách', isCorrect: true },
            { answerText: ' Ra mắt ', isCorrect: false },
            { answerText: ' Nghỉ ngơi ', isCorrect: false },
        ],
    },
    {
        questionText: 'Car',
        answerOptions: [
            { answerText: ' Xe oto ', isCorrect: true },
            { answerText: ' Nhà báo ', isCorrect: false },
            { answerText: ' Người báo cáo ', isCorrect: false },
            { answerText: ' Nhà tư vấn ', isCorrect: false },
        ],
    },
    {
        questionText: 'Dog',
        answerOptions: [
            { answerText: ' Người quản lý dự án ', isCorrect: false },
            { answerText: ' Báo cáo dự án ', isCorrect: false },
            { answerText: ' Dự án ', isCorrect: false },
            { answerText: ' Con chó  ', isCorrect: true },
        ],
    },
];

const originalRankList = {'Apple': 0,'Book': 0,'Car': 0,'Dog': 0,'Elephant': 0}

const originalRows = [
    { id: 1, good: 'dog', bad: 'worth' },
];

const columns = [
    { field: 'id', headerName: 'Order', width: 130 },
    { field: 'good', headerName: 'Good', width: 160 },
    {
      field: 'bad',
      headerName: 'Bad',
      width: 90,
    },
  ];

const Contest = () => {

    const [questions,setQuestions] = useState(ques)
    const [rankList,setRankList] = useState(originalRankList)
    const [rows, setRows] = useState(originalRows);

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect, word) => {
        if(!rankList[word]) {
            rankList[word] = 0;
        }

		if (isCorrect) {
			setScore(score + 1);
            rankList[word] += 1;
		}else{
            rankList[word] -= 1
        }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
            console.log(rankList)
            localStorage.setItem('rank', JSON.stringify(rankList))
		}
	};

    useEffect(()=>{
        let data = localStorage.getItem('words');
        data = JSON.parse(data);

        let rank = localStorage.getItem('rank');
        rank = JSON.parse(rank);

        if (data && data.length > 0) {
            let x = getRandomQuestions(data)
            setQuestions(x)
        }

        if (rank && Object.keys(rank).length > 0) {
            setRankList(rank)
        }


    },[])


    useEffect(()=>{
        const entries = Object.entries(rankList);

        entries.sort((a,b)=>{
           return a[1] > b[1] ? -1 : 1;
        })

        let newRows = []


        for(let i = 0; i < 5; i++) {
            newRows.push({
                id: i,
                good: entries[i][0],
                bad: entries[entries.length - i -1][0]
            })
        }

        setRows(newRows)

    },[rankList]);

  return ( 
    <div className='contest-container'>
        <div className='quiz'>
            <div className='quiz-block'>
                <div className='app'>
                    {showScore ? (
                        <div className='score-section'>
                            You scored {score} out of {questions.length}
                        </div>
                    ) : (
                        <>
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className='question-text'>{'What is the meaning of ' + questions[currentQuestion].questionText +' ?' }</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect, questions[currentQuestion].questionText)}>{answerOption.answerText}</button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <Link to='/'>
                    <Fab variant="extended" color="primary">
                        Back Home
                    </Fab>
                </Link>     
            </div>
        </div>
        <div className='statistic'>
            <div className='table'>
            <DataGrid
                rows={rows}
                columns={columns}
            />
            </div> 
        </div> 
    </div>
  )
}

export default Contest