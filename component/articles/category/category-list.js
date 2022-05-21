import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props?.category,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          prevState.category !== nextProps.category
        ) {
          return {
            category: nextProps?.category
          };
        }
        return null;
      }

    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col pe-1">Name</div>
                            <div className="col text-center">Active</div>
                            <div className="col-2 text-end">Edit</div>
                        </div>
                    </div>
                </div>
                {
                this.state.category && this.state.category.length === 0 ? <div className="not-found">No Data Found</div> :
                    this.state.category?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                                    <div className="col text-center">
                                        {p?.is_active === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col-2 text-end">
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/article-category/${p?.id}/edit`);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
