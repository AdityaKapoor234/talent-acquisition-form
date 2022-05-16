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
            topSoldProduct: props?.topSoldProduct,
            topSoldProductLabel: [],
            topSoldProductValues: [],

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.topSoldProduct !== nextProps.topSoldProduct
        ) {
            return {
                topSoldProduct: nextProps?.topSoldProduct
            };
        }
        return null;
    }


    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col-12 page-name">Top Sold Products</div>
                </div>

                <div className='noVisi'>
                    {this.state.topSoldProductLabel = []}
                    {this.state.topSoldProductValues = []}
                </div>

                {
                    this.state.topSoldProduct?.map(elem => {
                        return (
                            <>
                                <div className='noVisi'>
                                    {this.state.topSoldProductLabel.push(elem?.product_name)}
                                    {this.state.topSoldProductValues.push(elem?.count === null ? 0 : elem?.count)}

                                </div>
                            </>
                        )
                    })
                }


                <div className="row mb-2">
                    <div className="col">
                        <Bar
                            data={{
                                labels: this.state.topSoldProductLabel,
                                datasets: [
                                    {
                                        data: this.state.topSoldProductValues,
                                        backgroundColor: [
                                            "#7ca950",
                                        ],
                                        hoverOffset: 4,
                                        borderWidth: 3,
                                        borderColor: "#67874c",
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