import React, { Component } from 'react'
import Link from "next/link";
import * as ChartJs from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
Chart.register(ArcElement, BarController, DoughnutController, LineController, PieController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default class salesTrend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salesTrend: props?.salesTrend,
            salesTrendLabel: [],
            salesTrendValues: [],

            open: false,
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
                    <div className="col point-text" onClick={() => this.setState({ open: true })}>
                        <Line
                            data={{
                                labels: this.state.salesTrendLabel.reverse(),
                                datasets: [
                                    {
                                        data: this.state.salesTrendValues.reverse(),
                                        fill: true,
                                        backgroundColor: [
                                            "#b2dafd",
                                        ],
                                        hoverOffset: 4,
                                        borderWidth: 3,
                                        borderColor: "#4ba6f2",
                                        hoverBorderWidth: 3,
                                        label: " ₹",
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
                                scales: {
                                    y: {
                                        ticks: {
                                            // Include a rupees sign in the ticks
                                            callback: function (value, index, ticks) {
                                                return '₹ ' + value;
                                            }
                                        }
                                    }
                                },
                            }}
                            className="barChart"
                        />
                    </div>
                </div>



                <Dialog
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    maxWidth="lg"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div className="d-flex justify-content-between">
                            <span style={{ color: "#012169" }}>
                                {"Sales Trend"}
                            </span>
                            <Box position="absolute" right={0}>
                                <Button style={{ cursor: "pointer", color: "#012169" }} onClick={() => this.setState({ open: false })}>
                                    {<CloseIcon />}
                                </Button>
                            </Box></div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            sx={{ color: "#012169" }} >

                            <Line
                                data={{
                                    labels: this.state.salesTrendLabel.reverse(),
                                    datasets: [
                                        {
                                            data: this.state.salesTrendValues.reverse(),
                                            fill: true,
                                            backgroundColor: [
                                                "#b2dafd",
                                            ],
                                            hoverOffset: 4,
                                            borderWidth: 3,
                                            borderColor: "#4ba6f2",
                                            hoverBorderWidth: 3,
                                            label: " ₹",
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
                                    scales: {
                                        y: {
                                            ticks: {
                                                // Include a rupees sign in the ticks
                                                callback: function (value, index, ticks) {
                                                    return '₹ ' + value;
                                                }
                                            }
                                        }
                                    },
                                }}
                                className="barChart"
                            />


                        </DialogContentText>
                    </DialogContent>
                    {/* <DialogActions>
                        <div className="login-form ">
                            <Button
                                style={{ background: "#f54a00", borderRadius: "0px", color: "#ffffff", border: "1.5px solid #f54a00" }}
                                color="secondary"
                                variant="contained"

                                onClick={this.handleClickSubmitClose}
                                autoFocus
                            >
                                Submit
                            </Button>
                        </div>
                    </DialogActions> */}
                </Dialog>

            </>
        )
    }
}