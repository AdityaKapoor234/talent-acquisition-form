import React, { Component } from 'react'
import Link from "next/link";

export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: props?.orders,
            order: props?.order,

            rows: 0,
            remainingRows: [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.order !== nextProps.order
        ) {
            return {
                order: nextProps?.order
            };
        }
        return null;
    }



    empRows() {
        console.log(this.state.rows, "rows")
        console.log(this.state.remainingRows, "rem Rows")
        for (let i = this.state.rows; i < 10; i++) {
            console.log(i, "i")
            this.state.remainingRows[i] = i
        }

    }

    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col page-name">New Orders</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        <Link href="/order">
                            <span className='page-name-link'>View All</span>
                        </Link>
                    </div>
                </div>
                <div data-component="DashboardComponent">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableRow">
                                <div className="col-4 elip-text">Order</div>
                                <div className="col-4 text-center elip-text">Customer Name</div>
                                <div className="col-4 text-center elip-text">Grand Total</div>
                            </div>
                        </div>
                    </div>
                    <div className="noVisi">
                        {this.state.rows = 0}
                        {this.state.remainingRows = []}
                    </div>
                    {
                        this.state.order?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody elip rowHeight col-4 elip-text" title={p?.order_number}>{p?.order_number}</div>
                                            <div className="col-4 elip text-center elip-text" title={p?.customer}>{p?.customer}</div>
                                            <div className="col-4 elip text-center elip-text" title={p?.total}>{p?.total}</div>

                                            <div className="noVisi">{this.state.rows = this.state.rows + 1}</div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

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
