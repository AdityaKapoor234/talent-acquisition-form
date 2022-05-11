import React, { Component } from 'react'
import Link from "next/link";
import * as ChartJs from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
Chart.register(ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));


export default class salesTrend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatsDetails: props?.orderStatsDetails,

            rows: 0,
            remainingRows: [],
            chartData: {
                labels: ["Feb 2019", "Mar 2020", "Oct 2021", "Dec 2021", "Jan 2022", "Feb 2022"],
                datasets: [
                    {
                        // label: ["Feb 2019", "Mar 2020", "Oct 2021", "Dec 2021", "Jan 2022", "Feb 2022"],
                        data: [30, 70, 40, 50, 60, 55, 10],
                        fill: true,
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 162, 132)',
                            'rgb(255, 99, 162)',
                            'rgb(255, 235, 132)',
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
                    <div className="col page-name">Sales Trend</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        {/* <Link href="/order">
                            <span className='page-name-link'>View All</span>
                        </Link> */}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <Line
                            data={this.state.chartData}
                            options={{
                                // indexAxis: 'y',
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