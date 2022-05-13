import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class CustomerSupportInformationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerSupportInformation: props?.customerSupportInformation,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          prevState.customerSupportInformation !== nextProps.customerSupportInformation
        ) {
          return {
            customerSupportInformation: nextProps?.customerSupportInformation
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
                            <div className="col text-center">Email</div>
                            <div className="col px-2 text-center">Purpose</div>
                            <div className="col-1 text-end">View</div>
                        </div>
                    </div>
                </div>
                {
                this.state.customerSupportInformation && this.state.customerSupportInformation.length === 0 ? <div className="not-found">No Data Found</div> :
                    this.state.customerSupportInformation?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody pe-1 col-4 elip-text" title={p?.name}>{p?.name}</div>
                                    <div className="col px-2 text-center elip-text" title={p?.email}>{p?.email}</div>
                                    <div className="col px-2 text-center elip-text" title={p?.purpose}>{p?.purpose}</div>
                                    <div className="col-1 text-end">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/customer-support-information/${p?.id}/view`);
                                            }}
                                        />
                                    </div>
                                    {/* <div className="col-1 text-end">
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/customer-support-information/${p?.id}/edit`);
                                            }}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
