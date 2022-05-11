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
            orderStatsDetails: props?.orderStatsDetails,

            rows: 0,
            remainingRows: [],
            chartData: {
                labels: ["Whey Protein", "A", "B", "2nd surge ultra energy gel", "diet"],
                datasets: [
                    {
                        // label: ["Whey Protein", "A", "B", "2nd surge ultra energy gel", "diet"],
                        data: [30, 70, 40, 50, 60],
                        backgroundColor: [
                            "#e60000",
                            // 'rgb(54, 162, 235)',
                            // 'rgb(255, 99, 132)',
                            // 'rgb(255, 162, 132)',
                            // 'rgb(255, 99, 162)',
                            // 'rgb(255, 235, 132)',
                        ],
                        hoverOffset: 4,
                        borderWidth: 1,
                        // borderColor: "#777",
                        hoverBorderWidth: 2,
                        // hoverBorderColor: "#000",
                    }],
            },

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.orderStatsDetails !== nextProps.orderStatsDetails
        ) {
            return {
                orderStatsDetails: nextProps?.orderStatsDetails
            };
        }
        return null;
    }


    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col page-name">Top Search Terms</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        {/* <Link href="/order">
                            <span className='page-name-link'>View All</span>
                        </Link> */}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <Bar
                            data={this.state.chartData}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                            className="barChart"
                        />
                    </div>
                </div>

            </>
        )
    }
}