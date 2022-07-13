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

export default class orderPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatsDetails: props?.orderStatsDetails,
            orderStatsValues: [],
            
            open: false,
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
                    <div className="col point-text" onClick={() => this.setState({ open: true })}>
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
                                {"Order Payment Status"}
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