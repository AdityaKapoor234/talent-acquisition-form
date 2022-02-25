import React, { Component } from 'react'

export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: props?.orders,
        };
    }
    render() {

        return (
            <>
            <div className="page-name mb-2">New Orders</div>
            <div data-component="DashboardComponent">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableRow">
                                <div className="col">Order</div>
                                <div className="col text-center">Customer Name</div>
                                <div className="col text-center">Grand Total</div>
                            </div>
                        </div>
                    </div>
                    {this.state.orders?.map((p, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-12">
                                    <div className="tableCell">
                                        <div className="tableBody col">{p?.order}</div>
                                        <div className="col text-center">{p?.custName}</div>
                                        <div className="col text-center">{p?.grandTotal}</div>
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
