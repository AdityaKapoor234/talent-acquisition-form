import React, { Component } from 'react'
import Link from "next/link";

export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: props?.orders,
            rows: props?.orders?.length || null,
            remainingRows: [],
        };
    }




    render() {
        for (let i = this.state.rows; i < 10; i++) {
            this.state.remainingRows[i] = i
        }
        return (
            <>

                <div className="row mb-2">
                    <div className="col page-name">New Orders</div>
                    <div className="col d-flex justify-content-end align-self-end">
                        {/* <Link href=""> */}
                        <span className='page-name-link'>View All</span>
                        {/* </Link> */}
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

                    {
                        this.state.orders?.map((p, index, elem) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody elip rowHeight col-4 elip-text" title={p?.order}>{p?.order}</div>
                                            <div className="col-4 elip text-center elip-text" title={p?.custName}>{p?.custName}</div>
                                            <div className="col-4 elip text-center elip-text" title={p?.grandTotal}>{p?.grandTotal}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

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