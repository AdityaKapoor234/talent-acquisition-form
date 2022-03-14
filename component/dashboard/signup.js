import React, { Component } from 'react'
import Link from "next/link";

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: props?.customer,
            rows: 0,
            remainingRows: [],

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.customer !== nextProps.customer
        ) {
            return {
                customer: nextProps?.customer
            };
        }
        return null;
    }

    convertDateStringToDate = (dateStr) => {
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        let date = new Date(dateStr);
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };

    empRows() {
        for (let i = this.state.rows; i < 10; i++) {
            this.state.remainingRows[i] = i
        }

    }

    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col page-name">New Sign Ups</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        <Link href="/customer">
                            <span className='page-name-link'>View All</span>
                        </Link>
                    </div>
                </div>

                <div data-component="DashboardComponent">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableRow">
                                <div className="col-4 elip-text">Name</div>
                                <div className="col-4 text-center elip-text">Email</div>
                                <div className="col-4 text-center elip-text">Registration Date</div>
                            </div>
                        </div>
                    </div>
                    <div className="noVisi">
                        {this.state.rows = 0}
                        {this.state.remainingRows = []}
                    </div>
                    {this.state.customer?.map((p, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-12">
                                    <div className="tableCell">
                                        <div className="tableBody elip col-4 elip-text" title={p?.name}>{p?.name}</div>
                                        <div className="col-4 elip text-center elip-text" title={p?.email}>{p?.email}</div>
                                        <div className="col-4 elip text-center elip-text" title={this.convertDateStringToDate(p?.created_at)}>{this.convertDateStringToDate(p?.created_at)}</div>

                                        <div className="noVisi">{this.state.rows = this.state.rows + 1}</div>


                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {this.empRows()}
                    {
                        this.state.remainingRows?.map(() => {
                            return (
                                <div data-component="DashboardComponent">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="tableCell">
                                                <div className="tableBody col">&nbsp;</div>
                                                <div className="col text-center"></div>
                                                <div className="col text-center"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </>
        )
    }
}