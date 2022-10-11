import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Component, useState, useEffect } from "react";
import AddressService from "../../../../services/address-services";
import CustomerApi from "../../../../services/customer";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import Router from "next/router";
import SellerApi from "../../../../services/seller";

export default function addressform(props) {

    const [warehouse, setWarehouse] = useState(
        props?.warehouse?.warehouse ? props?.warehouse?.warehouse : ""
    );
    const [pin, setPin] = useState(
        props?.warehouse?.pin ? props?.warehouse?.pin : ""
    );
    const [stateId, setStateId] = useState(
        props?.warehouse?.state ? props?.warehouse?.state : "select"
    );
    const [city, setCity] = useState(
        props?.warehouse?.city ? props?.warehouse?.city : ""
    );
    const [landmark, setLandmark] = useState(
        props?.warehouse?.landmark ? props?.warehouse?.landmark : ""
    );
    const [address, setAddress] = useState(
        props?.warehouse?.address ? props?.warehouse?.address : ""
    );

    const [state, setState] = useState([]);


    const [mode, setMode] = useState(props?.mode ? props?.mode : "create");
    const [id, setId] = useState(props?.id ? props?.id : "");


    const handleChange = (event) => {
        setStateId(event.target.value);
    };

    const validateData = () => {

        if (!warehouse || warehouse === "" || warehouse === null || warehouse.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the Warehouse Name");
            return false;
        }
        if (!landmark || landmark === "" || landmark === null || landmark.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the landmark");
            return false;
        }
        if (!pin || pin === "" || pin === null || !pin.match(/^[0-9]{6}$/)) {
            toast.error("please enter valid pincode");
            return false;
        }
        if (!city || city === "" || city === null || city.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the city");
            return false;
        }
        if (!stateId || stateId === "" || stateId === "select" || stateId === null || stateId.replace(/\s/g, "").length <= 0) {
            toast.error("Please pick the state");
            return false;
        }
        if (!address || address === "" || address === null || address.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the address");
            return false;
        }



        return true;
    };
    const onSubmit = (id) => {
        if (validateData()) {
            let data = {
                warehouse: warehouse,
                pin: pin,
                state: stateId,
                city: city,
                landmark: landmark,
                address: address,
            };
            SellerApi.sellerAddressCreate(id, data)
                .then((response) => {
                    if (response?.data?.httpStatusCode === 200) {
                        toast.success(response?.data?.message);
                        setWarehouse("");
                        setPin("");
                        setStateId("select");
                        setCity("");
                        setLandmark("");
                        setAddress("");
                        props.onClose();
                        window.location.reload(false);
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
    };
    const onSubmitEdit = (id) => {
        if (validateData()) {
            let data = {
                warehouse: warehouse,
                pin: pin,
                state: stateId,
                city: city,
                landmark: landmark,
                address: address,
            };
            SellerApi.sellerAddressListEDIT(id, data)
                .then((response) => {
                    if (response?.data?.httpStatusCode === 200) {
                        toast.success(response?.data?.message);
                        setWarehouse("");
                        setPin("");
                        setStateId("select");
                        setCity("");
                        setLandmark("");
                        setAddress("");
                        // props?.closeAddress();
                        props?.onUpdateData(response?.data?.data?.seller_address);
                        window.location.reload(false);
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
    };

    const getState = () => {
        CustomerApi.getState()
            .then((response) => {
                if (response?.data?.httpStatusCode === 200) {
                    setState(response?.data.data?.list);
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
    };
    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token !== undefined) {
            getState();
        }
        setWarehouse(props?.warehouse?.warehouse ? props?.warehouse?.warehouse : "");
        setPin(props?.warehouse?.pin ? props?.warehouse?.pin : "");
        setStateId(props?.warehouse?.state ? props?.warehouse?.state : "select");
        setCity(props?.warehouse?.city ? props?.warehouse?.city : "");
        setLandmark(props?.warehouse?.landmark ? props?.warehouse?.landmark : "");
        setAddress(props?.warehouse?.address ? props?.warehouse?.address : "");
        setMode(props?.mode ? props?.mode : "create");
        setId(props?.id ? props?.id : "");
    }, [props]);

    return (
        <div data-component="address-component">
            <div className="container ">
                <div className="card">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Warehouse Name<span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength="80"
                                    placeholder=" Enter Your Warehouse Address"
                                    name="warehouse"
                                    onChange={(e) => {
                                        setWarehouse(e.target.value);
                                    }}
                                    value={warehouse}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    PIN Code<span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="number"
                                    maxLength="6"
                                    placeholder=" Enter Your PIN Code"
                                    name="pincode"
                                    onChange={(e) => {
                                        setPin(e.target.value.replace(/[^\d]/, ""));
                                    }}
                                    value={pin}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    City<span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your City"
                                    name="city"
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                    value={city}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="select-dropdown login-form">
                                <label>
                                    State <span className="mandatory-star">*</span>
                                </label>
                                <div className="sort-by-select-wrapper col-6">
                                    <Select
                                        disableUnderline
                                        variant="standard"
                                        IconComponent={ExpandMoreIcon}
                                        name="stateId"
                                        onChange={handleChange}
                                        className="sort-by-select"
                                        value={stateId}
                                        autoWidth={false}
                                    >
                                        <MenuItem
                                            value={"select"}
                                            disabled
                                            className="field_toggle_checked"
                                        >
                                            Pick your state
                                        </MenuItem>
                                        {state?.map((value) => {
                                            return (
                                                <MenuItem
                                                    style={{ color: "#012169" }}
                                                    value={value?.name}
                                                >
                                                    {value?.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Address<span className="mandatory-star">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    cols="100"
                                    rows="5"
                                    maxLength="225"
                                    placeholder="Enter Your Address"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    value={address}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Landmark<span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength="80"
                                    placeholder=" Enter Your Landmark"
                                    name="landmark"
                                    onChange={(e) => {
                                        setLandmark(e.target.value);
                                    }}
                                    value={landmark}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4 mt-2">
                        <div className="col-md-12 col-lg-6 col-sm-6 ">
                            <div className="row">
                                {mode === "edit" && (
                                    <div className="col-6">
                                        <div
                                            className="custom-btn justify-content-center"
                                            onClick={() => onSubmitEdit(id)}
                                        >
                                            <span>SAVE ADDRESS</span>
                                        </div>
                                    </div>
                                )}
                                {mode === "create" && (
                                    <div className="col-6">
                                        <div
                                            className="custom-btn justify-content-center"
                                            onClick={() => onSubmit(id)}
                                        >
                                            <span>SAVE ADDRESS</span>
                                        </div>
                                    </div>
                                )}
                                <div className="col-6 text-center">
                                    <div
                                        className="back-icon mob-button h-100"
                                        onClick={() => {
                                            props.onClose && props.onClose();
                                        }}
                                    >
                                        <span>CLOSE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
