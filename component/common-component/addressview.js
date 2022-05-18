import React, { Component } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Checkbox from "@mui/material/Checkbox";
import Cookies from "js-cookie";
// import AddressServices from "../../../services/address-services";
import Cookie from "js-cookie";
// import Address from "../../common-components/address-form";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddressForm from "../common-component/address-form";
import DeleteIcon from '@mui/icons-material/Delete';

export default class AddressView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            open: false,
            editOpen: false,
            addressDetails: props?.addressDetails,
            mode: props?.mode,
            id: props?.id,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.addressDetails !== nextProps.addressDetails) {
            return {
                addressDetails: nextProps?.addressDetails,
                mode: nextProps?.mode,
                id: nextProps?.id,
            };
        }
        return null;
    }
    componentDidMount() {
        const token = Cookies.get("access_token");
        this.setState({ token });
        if (token !== undefined) {
        }
    }
    UpdateAddress = (data) => {
        this.setState({
            addressDetails: data,
            editOpen: false
        })
        // this.props?.onUpdate()
    }
    closeAddress = () => {
        this.setState({
            editOpen: false
        })
    }
    deleteAddress = (id) => {
        let data = {}
        AddressServices.deleteAddress(data, id)
            .then((response) => {
                if (response?.data?.httpStatusCode === 200) {
                    this.setState({ open: false })
                    this.props?.onUpdate()
                }
            })
            .catch((error) => {
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime.",
                    {
                        autoClose: 5000,
                    }
                );
            });
    }
    render() {
        return (
            <>
                <div data-component="address-view">
                    <div className="edit-box">
                        <div className="row mb-2">
                            <div className="col-md-12 d-flex justify-content-end">
                                {
                                    this.state.mode === "edit" ?
                                        <div className=" btn-edit" onClick={() => this.setState({ editOpen: true })}><EditOutlinedIcon className="delete-icon mx-2 mt-2" style={{ color: "#f54a00" }} /></div>
                                        :
                                        ""
                                }

                                {/* <div className=" remove-edit" onClick={() => this.setState({ open: true })}><DeleteIcon className="delete-icon" /></div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="complete-address">
                                    <div>
                                        <div className="name two-line-ellipsis" title={this.state?.addressDetails?.recipient_name}>
                                            {this.state?.addressDetails?.recipient_name}
                                        </div>
                                        <div
                                            className="address"
                                            title={`${this.state?.addressDetails?.flat_no} ${this.state?.addressDetails?.locality} ${this.state?.addressDetails?.city} ${this.state?.addressDetails?.pin_code}`}>
                                            {this.state?.addressDetails?.flat_no}{" "}
                                            {this.state?.addressDetails?.locality}
                                            {this.state?.addressDetails?.landmark !== "" ? ", " : " "}
                                            <div>
                                                {this.state?.addressDetails?.landmark !== "" ? "Near " : ""}
                                                {this.state?.addressDetails?.landmark !== "" ? this.state?.addressDetails?.landmark : ""}
                                                {this.state?.addressDetails?.landmark !== "" ? ", " : ""}
                                                {this.state?.addressDetails?.city}{" "}
                                            </div>
                                            <div>
                                                {this.state?.addressDetails?.state}{" - "}
                                                {this.state?.addressDetails?.pin_code}
                                            </div>

                                        </div>
                                        <div className="number">
                                            {this.state?.addressDetails?.recipient_phone_number}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.setState({ open: false })}
                        maxWidth="sm"
                        fullWidth
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle style={{ color: "#012169" }}>
                            Confirm the action
                        </DialogTitle>
                        <Box position="absolute" top={0} right={0}>
                            <IconButton onClick={() => this.setState({ open: false })}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <DialogContent>
                            <Typography style={{ color: "#7e8f99" }}>
                                Are you sure you want to remove this address?
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ marginBottom: "0.5rem" }}>
                            <Button
                                onClick={() => this.setState({ open: false })}
                                style={{
                                    color: "#012169",
                                    borderRadius: "0px",
                                    background: "white",
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Cancel
                            </Button>
                            <Button
                                // onClick={() => this.deleteAddress(this.state.addressDetails?.id)}
                                style={{ background: "#f54a00", borderRadius: "0px" }}
                                color="secondary"
                                variant="contained"
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.editOpen}
                        onClose={() => this.setState({ editOpen: false })}
                        maxWidth="md"
                        fullWidth
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle style={{ color: "#012169" }}>
                            Edit Address
                        </DialogTitle>
                        <Box position="absolute" top={0} right={0}>
                            <IconButton onClick={() => this.setState({ editOpen: false })}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <DialogContent>
                            <AddressForm onClose={this.closeAddress.bind(this)} address={this.state.addressDetails} mode="edit" onUpdateData={this.UpdateAddress.bind(this)} id={this.state.id} />
                        </DialogContent>

                    </Dialog>
                </div>

            </>
        )
    }
}
