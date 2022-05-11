import React, { Component } from 'react'
import Link from "next/link";
import * as ChartJs from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
Chart.register(ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));


export default class topSoldProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatsDetails: props?.orderStatsDetails,

            rows: 0,
            remainingRows: [],
            chartData: {
                labels: ["Kinetica Whey Protein (1Kg)", "Jim Stoppani's Encyclopedia of Muscle & Strength 2", "Thermobol (90 Tablets)", "Kinetica BCAA Hydrofuel (450gm)"],
                datasets: [
                    {
                        // label: ["Kinetica Whey Protein (1Kg)", "Jim Stoppani's Encyclopedia of Muscle & Strength 2", "Thermobol (90 Tablets)", "Kinetica BCAA Hydrofuel (450gm)"],
                        data: [30, 70, 40, 50],
                        backgroundColor: [
                            "#7ca950",
                            // 'rgb(54, 162, 235)',
                            // 'rgb(255, 99, 132)',
                            // 'rgb(255, 162, 132)',
                            // 'rgb(255, 99, 162)',
                        ],
                        hoverOffset: 4,
                        borderWidth: 3,
                        borderColor: "#67874c",
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
                    <div className="col page-name">Top Sold Products</div>
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