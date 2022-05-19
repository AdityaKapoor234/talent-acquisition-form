import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Component, useState, useEffect } from "react";
import AddressService from "../../services/address-services";
import CustomerApi from "../../services/customer";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import Router from "next/router";


export default function addressform(props) {
    const [city, setCity] = useState(
        props?.address?.city ? props?.address?.city : ""
    );
    const [flat_no, setFlatNo] = useState(
        props?.address?.flat_no ? props?.address?.flat_no : ""
    );
    const [landmark, setLandMark] = useState(
        props?.address?.landmark ? props?.address?.landmark : ""
    );
    const [locality, setLocality] = useState(
        props?.address?.locality ? props?.address?.locality : ""
    );
    const [pincode, setPinCode] = useState(
        props?.address?.pin_code ? props?.address?.pin_code : ""
    );
    const [recipient, setRecipient] = useState(
        props?.address?.recipient_name ? props?.address?.recipient_name : ""
    );
    const [recipientphonenumber, setRecipientPhoneNumber] = useState(
        props?.address?.recipient_phone_number
            ? props?.address?.recipient_phone_number
            : ""
    );
    const [stateId, setStateId] = useState(
        props?.address?.state_id ? props?.address?.state_id : "state"
    );
    const [state, setState] = useState([]);
    const [isDefault, setIsDefault] = useState(
        props?.address?.is_default ? props?.address?.is_default : false
    );
    const [mode, setMode] = useState(props?.mode ? props?.mode : "create");
    const [id, setId] = useState(props?.id ? props?.id : "");
    const [customerID, setCustomerID] = useState(props?.customerID ? props?.customerID : "");
    const [is_all, setIsAll] = useState(false);


    const handleChange = (event) => {
        setStateId(event.target.value);
    };

    const handleState = () => {
        if (isDefault === true) {
            setIsDefault(false)
        }
        else {
            setIsDefault(true)
        }
    };

    const validateData = () => {
        setIsAll(false);

        if (flat_no === "") {
            toast.error("Please enter flat_no");
            return false;
        }
        if (city === "") {
            toast.error("Please enter city");
            return false;
        }
        if (pincode === "") {
            toast.error("Please enter pincode");
            return false;
        }
        if (pincode !== undefined) {
            if (!pincode.match(/^[0-9]{6}$/)) {
                toast.error("please enter valid pincode");
                return false;
            }
        }
        if (recipient === "") {
            toast.error("Please enter name of recipient");
            return false;
        }
        if (locality === "") {
            toast.error("Please enter locality");
            return false;
        }
        if (stateId === "state") {
            toast.error("please pick your state");
            return false;
        }

        if (recipientphonenumber === "") {
            toast.error("Please enter recipient phone number");
            return false;
        }

        if (recipientphonenumber !== undefined) {
            if (!recipientphonenumber.match(/^[0-9]{10}$/)) {
                toast.error("Please enter valid recipient phone number");
                return false;
            }

            if (flat_no.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter flat_no");
                return false;
            }
            if (city.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter city");
                return false;
            }
            if (pincode.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter pincode");
                return false;
            }
            if (recipient.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter name of recipient");
                return false;
            }
            if (locality.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter locality");
                return false;
            }
            if (recipientphonenumber.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter recipient phone number");
                return false;
            }



            return true;
        }
    };
    const onSubmit = (id) => {
        if (validateData()) {
            let data = {
                flat_no: flat_no,
                city: city,
                pin_code: pincode,
                recipient_name: recipient,
                locality: locality,
                landmark: landmark,
                state_id: stateId,
                recipient_phone_number: recipientphonenumber,
                is_default: isDefault,
            };
            CustomerApi.AddressAdd(id,data)
                .then((response) => {
                    if (response?.data?.httpStatusCode === 200) {
                        toast.success(response?.data?.message);
                        setCity("");
                        setFlatNo("");
                        setLandMark("");
                        setLocality("");
                        setPinCode("");
                        setRecipient("");
                        setStateId("");
                        setRecipientPhoneNumber("");
                        setLandMark("");
                        setIsDefault(false);
                        props.onClose();
                        // Router.push(`/customer/${customerID}/edit`);
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
                flat_no: flat_no,
                city: city,
                pin_code: pincode,
                recipient_name: recipient,
                locality: locality,
                landmark: landmark,
                state_id: stateId,
                recipient_phone_number: recipientphonenumber,
                is_default: isDefault,
            };
            CustomerApi.AddressEdit(id, data)
                .then((response) => {
                    if (response?.data?.httpStatusCode === 200) {
                        toast.success(response?.data?.message);
                        setCity("");
                        setFlatNo("");
                        setLandMark("");
                        setLocality("");
                        setPinCode("");
                        setRecipient("");
                        setStateId("");
                        setRecipientPhoneNumber("");
                        setLandMark("");
                        setIsDefault(false);
                        props?.onUpdateData(response?.data?.data?.address);
                        // Router.push(`/customer/${customerID}/edit`);
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
        // AddressService.getState()
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
        setMode(props?.mode ? props?.mode : "create");
    }, [props]);

    return (
        <div data-component="address-component">
            <div className="container ">
                <div className="card">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    House/Flat/Office number{" "}
                                    <span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength="30"
                                    placeholder="Enter Your House Number"
                                    className="pb-3"
                                    flat_no="flat_no"
                                    onChange={(e) => {
                                        setFlatNo(e.target.value);
                                    }}
                                    value={flat_no}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Area/Street/Locality <span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength="80"
                                    placeholder=" Enter Your Area/Street/Locality"
                                    locality="locality"
                                    onChange={(e) => {
                                        setLocality(e.target.value);
                                    }}
                                    value={locality}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    maxLength="80"
                                    placeholder=" Enter Your Landmark"
                                    landmark="landmark"
                                    onChange={(e) => {
                                        setLandMark(e.target.value);
                                    }}
                                    value={landmark}
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
                                    city="city"
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                    value={city}
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
                                    pincode="pincode"
                                    onChange={(e) => {
                                        setPinCode(e.target.value);
                                    }}
                                    value={pincode}
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
                                        sort="sort"
                                        onChange={handleChange}
                                        className="sort-by-select"
                                        value={stateId}
                                        autoWidth={false}
                                    >
                                        <MenuItem
                                            value={"state"}
                                            disabled
                                            className="field_toggle_checked"
                                        >
                                            Pick your state
                                        </MenuItem>
                                        {state?.map((value) => {
                                            return (
                                                <MenuItem
                                                    style={{ color: "#012169" }}
                                                    value={value?.id}
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
                                    Name of recipient<span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your recipient"
                                    recipient="recipient"
                                    onChange={(e) => {
                                        setRecipient(e.target.value);
                                    }}
                                    value={recipient}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-6">
                            <div className="login-form ">
                                <label>
                                    Phone number of recipient
                                    <span className="mandatory-star">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder=" Enter Your Phone Number"
                                    recipientphonenumber="recipientphonenumber"
                                    onChange={(e) => {
                                        setRecipientPhoneNumber(e.target.value);
                                    }}
                                    value={recipientphonenumber}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="login-form my-0">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{ color: "#012169" }}
                                        size="small"
                                        className="check"
                                        isDefault="isDefault"
                                        onChange={
                                            handleState
                                        }
                                        defaultChecked={isDefault}

                                        name="Set as default address"
                                    />
                                }
                                label={
                                    <span style={{ fontSize: "0.875rem" }}>
                                        Set as default address
                                    </span>
                                }
                            />
                        </FormGroup>
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
                                        className="back-icon mob-button"
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
