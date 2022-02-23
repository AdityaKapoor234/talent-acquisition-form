import React, { Component } from 'react'

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signups: props?.signups,
        };
    }
    render() {
        return (
            <>
            <div className="page-name mb-2">New Sign Ups</div>
            <div data-component="DashboardComponent">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tableRow">
                                <div className="col-2">Name</div>
                                <div className="col text-center">Email</div>
                                <div className="col-3 text-end">Registration Date</div>
                            </div>
                        </div>
                    </div>
                    {this.state.signups?.map((p, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-12">
                                    <div className="tableCell">
                                        <div className="tableBody col-2">{p?.name}</div>
                                        <div className="col text-center">{p?.email}</div>
                                        <div className="col-3 text-center">{p?.regDate}</div>
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
