import React, {useEffect, useState} from 'react'
import LineChart from './LineChart';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

export const initialData = [
    {
      id: 1,
      day: 1,
      newWords: 1
    },
    {
      id: 2,
      day: 2,
      newWords: 2,
    },
    {
      id: 3,
      day: 3,
      newWords: 3,
    },
    {
      id: 4,
      day: 4,
      newWords: 4,
    },
    {
      id: 5,
      day: 5,
      newWords: 5,
    }
  ];

const Statistic = () => {  

    const [Data, setData] = useState(initialData);

    console.log('--->',Data)

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.day), 
        datasets: [
          {
            label: " new words",
            data: Data.map((data) => data.newWords),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "&quot;#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

      useEffect(() => {
          let d = localStorage.getItem('numNewWords')
          d = JSON.parse(d)
  
          if (d && d.length > 0) {
              let newData = []
              for(let i = 1; i< d.length; i++) {
                newData.push({
                    id: i,
                    day: i,
                    newWords: d[i]
                })
              }
              newData.push( {
                id: 2,
                day: 2,
                newWords: 2,
              },)
              newData.push(
                {
                  id: 3,
                  day: 3,
                  newWords: 3,
                },)
              setData(newData)
          }
  
      }, []);  

      useEffect(() => {
        setChartData({
            labels: Data.map((data) => data.day), 
            datasets: [
              {
                label: " new words",
                data: Data.map((data) => data.newWords),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "&quot;#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          })
      },[Data]);

  return (
    <>
        <LineChart chartData={chartData}/>
        <Link id='char-back-home' to='/'>
            <Fab variant="extended" color="primary">
                Back Home
            </Fab>
        </Link>   
    </>
  )
}

export default Statistic