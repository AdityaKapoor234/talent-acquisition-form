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
            salesTrend: props?.salesTrend,
            salesTrendLabel: [],
            salesTrendValues: [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.salesTrend !== nextProps.salesTrend
        ) {
            return {
                salesTrend: nextProps?.salesTrend
            };
        }
        return null;
    }


    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col-12 page-name">Sales Trend</div>
                </div>

                <div className='noVisi'>
                    {this.state.salesTrendLabel = []}
                    {this.state.salesTrendValues = []}
                </div>

                {
                    this.state.salesTrend?.map(elem => {
                        return (
                            <>
                                <div className='noVisi'>
                                    {this.state.salesTrendLabel.push(elem?.per_month_sale?.month)}
                                    {this.state.salesTrendValues.push(elem?.per_month_sale?.amount === null ? 0 : elem?.per_month_sale?.amount)}
                                </div>
                            </>
                        )
                    })
                }

                <div className="row mb-2">
                    <div className="col">
                        <Line
                            data={{
                                labels: this.state.salesTrendLabel,
                                datasets: [
                                    {
                                        data: this.state.salesTrendValues,
                                        fill: true,
                                        backgroundColor: [
                                            "#b2dafd",
                                        ],
                                        hoverOffset: 4,
                                        borderWidth: 3,
                                        borderColor: "#4ba6f2",
                                        hoverBorderWidth: 3,
                                    }],
                            }}
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