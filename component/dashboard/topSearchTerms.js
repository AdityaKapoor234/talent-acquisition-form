import React, { Component } from 'react'
import Link from "next/link";
import * as ChartJs from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
Chart.register(ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));


export default class topSearchTerms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topSearchTerms: props?.topSearchTerms,
            topSearchLabel: [],
            topSearchValues: [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.topSearchTerms !== nextProps.topSearchTerms
        ) {
            return {
                topSearchTerms: nextProps?.topSearchTerms
            };
        }
        return null;
    }


    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col-12 page-name">Top Search Terms</div>
                </div>

                <div className='noVisi'>
                    {this.state.topSearchLabel = []}
                    {this.state.topSearchValues = []}
                </div>

                {
                    this.state.topSearchTerms?.map(elem => {
                        return (
                            <>
                                <div className='noVisi'>
                                    {this.state.topSearchLabel.push(elem?.term)}
                                    {this.state.topSearchValues.push(elem?.count === null ? 0 : elem?.count)}

                                </div>
                            </>
                        )
                    })
                }


                <div className="row mb-2">
                    <div className="col">
                        <Bar
                            data={{
                                labels: this.state.topSearchLabel,
                                datasets: [
                                    {
                                        data: this.state.topSearchValues,
                                        backgroundColor: [
                                            "#ff7e80"
                                        ],
                                        hoverOffset: 4,
                                        borderWidth: 3,
                                        borderColor: "#ce6964",
                                        hoverBorderWidth: 2,
                                        barThickness: 20,
                                    }],
                            }}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        display: true,        // show/ hide x-axis
                                        grid: {
                                            display: true      // show/hide grid line in x-axis
                                        },
                                    },
                                    y: {
                                        display: true,      // same as x-axis
                                        grid: {
                                            display: false
                                        }
                                    }
                                }
                            }}
                            className="barChart"
                        />
                    </div>
                </div>

            </>
        )
    }
}