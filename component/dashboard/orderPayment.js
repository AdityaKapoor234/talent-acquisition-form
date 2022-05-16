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
            orderStatsValues: [],
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
                    <div className="col-12 page-name">Order Payment Status</div>
                </div>

                <div className='noVisi'>
                    {this.state.orderStatsValues = []}
                    {this.state.orderStatsValues.push(this.state?.orderStatsDetails?.online?.all_time_payment_received === null ? 0 : this.state?.orderStatsDetails?.online?.all_time_payment_received)}
                    {this.state.orderStatsValues.push(this.state?.orderStatsDetails?.online?.all_time_payment_pending === null ? 0 : this.state?.orderStatsDetails?.online?.all_time_payment_pending)}
                    {this.state.orderStatsValues.push(this.state?.orderStatsDetails?.cod?.all_time_payment_received === null ? 0 : this.state?.orderStatsDetails?.cod?.all_time_payment_received)}
                    {this.state.orderStatsValues.push(this.state?.orderStatsDetails?.cod?.all_time_payment_pending === null ? 0 : this.state?.orderStatsDetails?.cod?.all_time_payment_pending)}
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <Pie
                            data={{
                                labels: ["Payment Received (Online)", "Payment Not Received (Online)", "Payment Received (COD)", "Payment Not Received (COD)"],
                                datasets: [
                                    {
                                        data: this.state.orderStatsValues,
                                        backgroundColor: [
                                            "#faba3c",
                                            "#76c547",
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 99, 132)',
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