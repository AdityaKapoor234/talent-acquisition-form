import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Router from "next/router";

export default class ContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props?.content,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.content !== nextProps.content
        ) {
            return {
                content: nextProps?.content
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
                            <div className="col pe-1">Title</div>
                            <div className="col text-center">Type</div>
                            <div className="col text-center">Category</div>
                            <div className="col text-center">Status</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.content && this.state.content.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.content?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col elip-text" title={p?.title}>{p?.title}</div>
                                            <div className="col text-center" title={p?.type}>{p?.type}</div>
                                            <div className="col text-center" title={p?.category}>{p?.category}</div>
                                            <div className="col text-center">
                                                {p?.status === "draft" && (
                                                    <BlockOutlinedIcon className="draft" />
                                                )}
                                                {p?.status === "published" && (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                )}
                                                {p?.status === "out_of_stock" && (
                                                    <ProductionQuantityLimitsIcon className="out" />
                                                )}
                                                {p?.status === "archived" && (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="view-icon"
                                                    onClick={() => {
                                                        Router.push(`/article-content/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/article-content/${p?.id}/edit`);
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
