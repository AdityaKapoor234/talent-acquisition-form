import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import Review from "./review-list"

export default class ReviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            id: props?.id,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.id !== nextProps.id
        ) {
            return {
                id: nextProps?.id,
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

    render() {
        return (
            <div data-component="edit-category">
                <div className="row ">
                    <div className="col-md-12">
                        <div className="tab">
                            <div
                                className={
                                    this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                                }
                                onClick={() => {
                                    this.setState({ tab: 1 });
                                }}
                            >
                                Review Info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        <Review id={this.state.id} />
                    </>
                )}
            </div>
        );
    }
}

