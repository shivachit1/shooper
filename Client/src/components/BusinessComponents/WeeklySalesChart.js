import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const WeeklySalesChart = (props) => {

    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Sales in Euro',
                    data: [32, 45, 12, 77, 32, 45, 12],
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
                        text: 'Weekly Sales Report',
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

export default WeeklySalesChart;
