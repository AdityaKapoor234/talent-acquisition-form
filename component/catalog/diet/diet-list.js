import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class DietList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diet: props?.diet,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          prevState.diet !== nextProps.diet
        ) {
          return {
            diet: nextProps?.diet
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
                            <div className="col-4 pe-1">Name</div>
                            <div className="col text-center">Active</div>
                            <div className="col px-2 text-center">Visiblility on Main Menu</div>
                            <div className="col px-2 text-center">Display Order</div>
                            <div className="col-1 text-center">View</div>
                            <div className="col-1 text-end">Edit</div>
                        </div>
                    </div>
                </div>
                {
                this.state.diet && this.state.diet.length === 0 ? <div className="not-found">No Data Found</div> :
                    this.state.diet?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody pe-1 col-4 elip-text" title={p?.name}>{p?.name}</div>
                                    <div className="col text-center">
                                        {p?.is_active === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col text-center">
                                        {p?.show_in_main_menu === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col px-2 text-center elip-text" title={p?.sort_order}>{p?.sort_order}</div>
                                    <div className="col-1 text-center">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/diet/${p?.id}/view`);
                                            }}
                                        />
                                    </div>
                                    <div className="col-1 text-end">
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/diet/${p?.id}/edit`);
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
