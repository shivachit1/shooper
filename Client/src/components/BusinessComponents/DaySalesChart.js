import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const DaySalesChart = (props) => {

    const [chartData, setChartData] = useState({});
    console.log(props.orders)

    const chart = () => {
        setChartData({
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','06:00', '07:00', '08:00','09:00', '10:00', '11:00','12:00',
             '13:00', '14:00','15:00', '16:00', '17:00','18:00', '19:00', '20:00','21:00', '22:00', '23:00'],
            datasets: [
                {
                    label: 'Sales in Euro',
                    data: [100, 300, 40, 10, 90, 70,10, 24, 23,12, 15,2,28,
                    7, 9,0, 60, 80,22, 15, 17,33, 13, 12],
                    backgroundColor: [
                        'rgb(171, 231, 171, 0.3)'
                    ],
                    borderWidth: 2,
                    borderJoinStyle: 'miter',
                    hoverBorderColor: "rgba(248, 8, 8, 1)",
                    hoverBackgroundColor: "rgba(248, 8, 8, 1)",
                    pointBackgroundColor: "rgba(248, 8, 8, 0)",
                    pointBorderColor:"rgba(248, 8, 8, 1)",
                    pointBorderWidth:1,
                    borderColor: [
                        'rgb(171, 231, 171, 1)'
                    ],
                }
            ]

        })
    }

    useEffect(() => {
        chart()
    }, []);

    return (
       
       
            <Line data={chartData}
                options={{
                    responsive:true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Daily Sales Report (24hr)',
                        fontSize: 18
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10
                        }
                    },
                    scales: {
                      yAxes: [
                        {
                            gridLines: {
                            // Remove vertical lines
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            beginAtZero: true,
                            fontColor:['green']
                          },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            // Remove vertical lines
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            beginAtZero: true,
                            fontColor:['blue']
                          }
                        },
                      ],
                    }
                    
                }} />
       
    )
}

export default DaySalesChart;
