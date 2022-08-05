import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Photo from "../../common-component/photo";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {PRODUCT_SERVICE} from "../../../utils/constant";

export default class TrustedHealthDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            trustedHealth: props?.trustedHealth,
            open: false,
            mode: props?.mode,
            name: props?.trustedHealth?.name ? props?.trustedHealth?.name : "",
            sort_order: props?.trustedHealth?.sort_order ? props?.trustedHealth?.sort_order : "",
            content: props?.trustedHealth?.content ? props?.trustedHealth?.content : "",
            is_trust_health: props?.trustedHealth?.is_trust_health ? props?.trustedHealth?.is_trust_health : "",
            path: props?.trustedHealth?.image_url ? props?.trustedHealth?.image_url : "",
            read_more_url: props?.trustedHealth?.read_more_url ? props?.trustedHealth?.read_more_url : "",
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.trustedHealth !== nextProps.trustedHealth ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                trustedHealth: nextProps?.trustedHealth,
                mode: nextProps?.mode,
                name: nextProps?.trustedHealth?.name,
                sort_order: nextProps?.trustedHealth?.sort_order,
                content: nextProps?.trustedHealth?.content,
                is_trust_health: nextProps?.trustedHealth?.is_trust_health,
                path: nextProps?.trustedHealth?.image_url,
                read_more_url: nextProps?.trustedHealth?.read_more_url,
            };
        }
        return null;
    }
    // handleChange = (event) => {
    // 	let input = this.state.input;
    // 	input[event.target.name] = event.target.value;
    // 	this.setState({ input });
    // 	this.props?.handle(input);
    // };
    // handleCheck = (event) => {
    // 	let input = this.state.input;
    // 	input[event.target.name] = event.target.checked;
    // 	this.setState({ input });
    // 	this.props?.handle(input);
    // };
    // selectTypes = (list, expertise) => {
    // 	let model = list?.map(p => p?.id)
    // 	let tempcategoryList = expertise;
    // 	for (let i in tempcategoryList) {
    // 		if (model !== undefined) {
    // 			if (model?.length > 1) {
    // 				if (model.indexOf(tempcategoryList[i].id) >= 0)
    // 					tempcategoryList[i].selected = true;
    // 				else {
    // 					tempcategoryList[i].selected = false;
    // 				}
    // 			} else {
    // 				if (model?.indexOf(tempcategoryList[i].id) >= 0)
    // 					tempcategoryList[i].selected = true;
    // 				else {
    // 					tempcategoryList[i].selected = false;
    // 				}
    // 			}
    // 		}
    // 		else {
    // 			tempcategoryList[i].selected = false;
    // 		}
    // 	}
    // 	return tempcategoryList;
    // };

    // handleChangeExpert = (event) => {
    // 	let List = this.state.expertise;
    // 	for (let i in List) {
    // 		if (List[i].id === parseInt(event.target.value)) {
    // 			List[i].selected = event.target.checked;
    // 			break;
    // 		}
    // 	}
    // 	this.setState({ expertise: List });
    // 	const expertList = List?.filter(p => p?.selected === true)?.map(val => val?.id)
    // 	let input = this.state.input;
    // 	input["expertises"] = expertList;
    // 	this.setState({ input });
    // 	this.props?.handle(input);
    // };


    // componentDidUpdate(prevProps) {
    // 	if (this.props.expert !== prevProps?.expert) {
    // 		this.setState({
    // 			expertise: this.selectTypes(this.props.expert, this.props?.expertise)
    // 		})
    // 	}
    // }
    // componentDidMount() {

    // }

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
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };

    nameHandle = (event) => {
        this.setState({ name: event.target.value });
        this.props?.name(event.target.value);
    }

    sortOrderHandle = (event) => {
        this.setState({ sort_order: event.target.value.replace(/[^\d]/, "") });
        this.props?.sortOrder(event.target.value.replace(/[^\d]/, ""));
    }

    contentHandle = (event) => {
        this.setState({ content: event.target.value });
        this.props?.content(event.target.value);
    }

    isTrustHealthHandle = () => {
        if (this.state.is_trust_health === true) {
            this.setState({ is_trust_health: false });
            this.props?.isTrustHealth(false);
        }
        else {
            this.setState({ is_trust_health: true });
            this.props?.isTrustHealth(true);
        }
    }

    handlePhotoUrl = (name, url) => {
    	this.setState({ path: url });
        this.props?.path(url);
    };

    readMoreUrlHandle = (event) => {
        this.setState({ read_more_url: event.target.value });
        this.props?.readMoreUrl(event.target.value);
    }

    render() {
        return (
            <div data-component="edit-customer">
                <div className="row">
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
                                Trusted Health info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        {this.state.mode === "edit" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.name}
                                                    onChange={(event) => { this.nameHandle(event) }}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Content<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.content}
                                                    onChange={(event) => { this.contentHandle(event) }}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Sort Order<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={this.state.sort_order}
                                                    onChange={(event) => { this.sortOrderHandle(event) }}
                                                />
                                            </div>
                                            {/* <div className="signup-check">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.is_trust_health}
                                                    onChange={this.isTrustHealthHandle}
                                                />
                                                <label>Active</label>
                                            </div> */}
                                            <div className="mb-4">
                                                <Photo
                                                    mode={this.state.mode}
                                                    label={"Trusted Health "}
                                                    accept=".jpg,.jpeg,.png"
                                                    // name="full_banner_img_sm"
                                                    img={this.state.path}
                                                    setUrl={this.handlePhotoUrl.bind(this)}
                                                    value={this.state.img_sm}
                                                    urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
                                                />
                                            </div>
                                            <div className="login-form mt-4">
                                                <label>Read More URL<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.read_more_url}
                                                    onChange={(event) => { this.readMoreUrlHandle(event) }}
                                                />
                                            </div>

                                            {/* <div className="mt-4">
                                                <a href={this.state.read_more_url}><button className="custom-btn">Read More</button></a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.mode === "view" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Content<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.content}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Sort Order<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="number"
                                                    value={this.state.sort_order}
                                                    readOnly={true}
                                                />
                                            </div>
                                            {/* <div className="signup-check">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.is_trust_health}
                                                />
                                                <label>Active</label>
                                            </div> */}
                                            <div className="mb-4">
                                                <Photo
                                                    mode={this.state.mode}
                                                    label={"Trusted Health "}
                                                    accept=".jpg,.jpeg,.png"
                                                    // name="full_banner_img_sm"
                                                    img={this.state.path}
                                                    // setUrl={this.handlePhotoUrl.bind(this)}
                                                    // value={this.state.img_sm}
                                                    urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
                                                />
                                            </div>
                                            <div>
                                                <a href={this.state.read_more_url}><button className="custom-btn w-50">Read More<ArrowForwardIosIcon className='arrow-icon'/></button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ color: "#012169" }}>
                        Confirm the action
                    </DialogTitle>
                    <Box position="absolute" top={0} right={0}>
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContent>
                        <Typography style={{ color: "#7e8f99" }}>
                            Are you sure you want to{" "}
                            {this.state.is_unsubscribe
                                ? " deactivate this trusted health"
                                : "activate this trusted health"}
                            ?
                        </Typography>
                    </DialogContent>
                    <DialogActions style={{ marginBottom: "0.5rem" }}>
                        <Button
                            onClick={this.handleClose}
                            style={{
                                color: "#012169",
                                background: "white",
                                borderRadius: "0px",
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCheckbox}
                            style={{ background: "#f54a00", borderRadius: "0px" }}
                            color="secondary"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}
