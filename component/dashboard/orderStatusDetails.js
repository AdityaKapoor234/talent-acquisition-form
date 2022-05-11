import React, { Component } from 'react'
import Link from "next/link";

export default class orderStatusDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatsDetails: props?.orderStatsDetails,

            rows: 0,
            remainingRows: [],
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




    empRows() {
        for (let i = this.state.rows; i < 15; i++) {
            this.state.remainingRows[i] = i
        }

    }

    render() {
        return (
            <>
                <div className="row mb-2">
                    <div className="col page-name">
                        <Link href="/order">
                            Order Status
                        </Link>
                    </div>
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
                                <div className="tableBody elip rowHeight col elip-text">Status</div>
                                <div className="col elip text-center elip-text">Today</div>
                                <div className="col elip text-center elip-text">This Week</div>
                                <div className="col elip text-center elip-text">This Month</div>
                                <div className="col elip text-center elip-text">This Year</div>
                                <div className="col elip text-center elip-text">All Time</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Pending Payment">Pending Payment</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.payment_pending?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.payment_pending?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.payment_pending?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.payment_pending?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.payment_pending?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.payment_pending?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.payment_pending?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.payment_pending?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.payment_pending?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.payment_pending?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.payment_pending?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.payment_pending?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.payment_pending?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.payment_pending?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.payment_pending?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.payment_pending?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.payment_pending?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.payment_pending?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.payment_pending?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.payment_pending?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Not yet dispatched">Not yet dispatched</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.not_yet_dispatched?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.not_yet_dispatched?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.not_yet_dispatched?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.not_yet_dispatched?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.not_yet_dispatched?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.not_yet_dispatched?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.not_yet_dispatched?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.not_yet_dispatched?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.not_yet_dispatched?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.not_yet_dispatched?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.not_yet_dispatched?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.not_yet_dispatched?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.not_yet_dispatched?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.not_yet_dispatched?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.not_yet_dispatched?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.not_yet_dispatched?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.not_yet_dispatched?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.not_yet_dispatched?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.not_yet_dispatched?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.not_yet_dispatched?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Processing">Processing</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.processing?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.processing?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.processing?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.processing?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.processing?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.processing?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.processing?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.processing?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.processing?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.processing?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.processing?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.processing?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.processing?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.processing?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.processing?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.processing?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.processing?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.processing?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.processing?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.processing?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Shipped">Shipped</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.shipped?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.shipped?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.shipped?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.shipped?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.shipped?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.shipped?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.shipped?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.shipped?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.shipped?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.shipped?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.shipped?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.shipped?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.shipped?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.shipped?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.shipped?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.shipped?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.shipped?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.shipped?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.shipped?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.shipped?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Delivered">Delivered</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.delivered?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.delivered?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.delivered?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.delivered?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.delivered?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.delivered?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.delivered?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.delivered?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.delivered?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.delivered?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.delivered?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.delivered?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.delivered?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.delivered?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.delivered?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.delivered?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.delivered?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.delivered?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.delivered?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.delivered?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableCell">
                                <div className="tableBody elip rowHeight col elip-text" title="Cancelled">Cancelled</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.cancelled?.today === null ? "₹ 0.00" : this.state.orderStatsDetails?.cancelled?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.cancelled?.today === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.cancelled?.today?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.cancelled?.this_week === null ? "₹ 0.00" : this.state.orderStatsDetails?.cancelled?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.cancelled?.this_week === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.cancelled?.this_week?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.cancelled?.this_month === null ? "₹ 0.00" : this.state.orderStatsDetails?.cancelled?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.cancelled?.this_month === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.cancelled?.this_month?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.cancelled?.this_year === null ? "₹ 0.00" : this.state.orderStatsDetails?.cancelled?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.cancelled?.this_year === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.cancelled?.this_year?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                                <div className="col elip text-center elip-text" title={this.state.orderStatsDetails?.cancelled?.all_time === null ? "₹ 0.00" : this.state.orderStatsDetails?.cancelled?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>{this.state.orderStatsDetails?.cancelled?.all_time === null ? "₹ 0.00" : <>₹ {this.state.orderStatsDetails?.cancelled?.all_time?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</>}</div>
                            </div>
                        </div>
                    </div>


                </div>

            </>
        )
    }
}

