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


export default class topSearchTerms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topSearchTerms: props?.topSearchTerms,
            topSearchLabel: [],
            topSearchValues: [],

            open: false,
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
                    <div className="col point-text" onClick={() => this.setState({ open: true })}>
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
                                indexAxis: 'x',
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
                                {"Top Search Terms"}
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
                                    indexAxis: 'x',
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