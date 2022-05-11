import React, { Component } from 'react'
import Link from "next/link";
import * as ChartJs from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
Chart.register(ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

export default class orderPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatsDetails: props?.orderStatsDetails,
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
                    <div className="col page-name">Order Payment Status</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        {/* <Link href="/order">
                            <span className='page-name-link'>View All</span>
                        </Link> */}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <Pie
                            data={{
                                labels: ["Payment Received", "Payment Not Received"],
                                datasets: [
                                    {
                                        // label: ["Payment Received", "Payment Not Recieved"],
                                        data: [
                                            parseInt(this.state?.orderStatsDetails?.shipped?.all_time) === null ? 0 : parseInt(this.state?.orderStatsDetails?.shipped?.all_time),
                                            parseInt(this.state?.orderStatsDetails?.payment_pending?.all_time) === null ? 0 : parseInt(this.state?.orderStatsDetails?.payment_pending?.all_time),
                                        ],
                                        backgroundColor: [
                                            "#faba3c",
                                            "#76c547",
                                            // 'rgb(54, 162, 235)',
                                            // 'rgb(255, 99, 132)',
                                        ],
                                        hoverOffset: 4,
                                        borderWidth: 1,
                                        borderColor: "#ffffff",
                                        hoverBorderWidth: 1,
                                        hoverBorderColor: "#ffffff",
                                    }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "bottom",
                                    },
                                },
                            }}
                            height="250%"
                            // className="pieChart"
                        />
                    </div>
                </div>

            </>
        )
    }
}