import React, { Component } from 'react'

export default class orderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: props?.orderStatus,
        };
    }
    render() {
        return (
            <>
                <div className="page-name mb-2">Order Status</div>
                <div data-component="DashboardComponent">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableRow">
                                <div className="col-2">Status</div>
                                <div className="col-2 text-center">Today</div>
                                <div className="col-2 text-center">This Week</div>
                                <div className="col-2 text-center">This Month</div>
                                <div className="col-2 text-center">This Year</div>
                                <div className="col-2 text-center">All Time</div>
                            </div>
                        </div>
                    </div>
                    {this.state.orderStatus?.map((p, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-12">
                                    <div className="tableCell">
                                        <div className="tableBody col-2">{p?.status}</div>
                                        <div className=" col-2 text-center">{p?.today}</div>
                                        <div className="col-2 text-center">{p?.thisWeek}</div>
                                        <div className="col-2 text-center">{p?.thisMonth}</div>
                                        <div className="col-2 text-center">{p?.thisYear}</div>
                                        <div className="col-2 text-center">{p?.allTime}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </>
        )
    }
}
