import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Photo from "../common-component/photo";
import Checkbox from "@mui/material/Checkbox";
import AskTheProsApi from "../../services/ask-the-pros";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";

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


export default function AskTheProps(props) {

	const [tab, setTab] = useState(1);
	const [ask, setAsk] = useState({});
	const [imgIcon, setImgIcon] = useState("file-input");
	const [mode, setMode] = useState();
	const [id, setId] = useState();
	const [expert, setExpert] = useState([]);
	const [trustTheProsRefferalCode, setTrustTheProsRefferalCode] = useState([]);
	const [totalAskTheProsRefferalCode, setTotalAskTheProsRefferalCode] = useState([]);
	const [totalPageRefferalCode, setTotalPageRefferalCode] = useState();
	const [currentPage, setCurrentPage] = useState();
	const [trustTheProsRefferalCodeDropdown, setTrustTheProsRefferalCodeDropdown] = useState();
	const [trustTheProsTotalPoints, setTrustTheProsTotalPoints] = useState();
	const [openProRefferalCode, setOpenProRefferalCode] = useState(false);
	const [trustTheProsRefferalCodeDropdownValue, setTrustTheProsRefferalCodeDropdownValue] = useState("select");



	const getExpert = (model) => {
		AskTheProsApi.getExpertise()
			.then((response) => {
				if (response.data.httpStatusCode === 200) {
					let list = response.data.data
					for (let i in list) {
						if (model?.indexOf(list[i].id) >= 0) {
							list[i].selected = true;
						} else {
							list[i].selected = false;
						}
					}
					setExpert(list)
				}
			})
			.catch((error) => {
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);
			});
	}

	const handleProsRefferalCodeChange = (event) => {
		// setTrustTheProsRefferalCodeDropdown(event.target.value);
		setOpenProRefferalCode(true)
		props?.setProfessionalReferralCode(event.target.value)
		setTrustTheProsRefferalCodeDropdownValue(event.target.value)

	};
	const handleChange = (event) => {
		let input = ask;
		input[event.target.name] = event.target.value;
		setAsk(input)
		props?.handle(input);
	};
	const handleCheck = (event) => {
		let input = ask;
		input[event.target.name] = event.target.checked;
		setAsk(input)
		props?.handle(input);
	};
	const handlePhotoUrl = (name, url) => {
		let input = ask;
		input[name] = url;
		setAsk(input)
		props?.handle(input);
	};

	const handleChangeExpert = (event) => {
		let List = expert;
		for (let i in List) {
			if (List[i].id === parseInt(event.target.value)) {
				List[i].selected = event.target.checked;
				break;
			}
		}
		setExpert(List)
		const expertList = List?.filter(p => p?.selected === true)?.map(val => val?.id)
		let input = ask;
		input["expertises"] = expertList;
		setAsk(input)
		props?.handle(input);
	};

	const convertDateStringToDate = (dateStr) => {
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

	const handleCloseProRefferalCode = () => {
		setOpenProRefferalCode(false);
	}

	const confirmRefferalCode = () => {
		setOpenProRefferalCode(false)
		props?.trustTheProsRefferalCodeEdit()
	}

	const onPageChange = function (e, page) {
		props?.RefferalCodePagination(page)
		props?.trustTheProsRefferCodeList(id,page)
	};


	useEffect(() => {
		setAsk(props?.askThePros)
		setMode(props?.mode)
		setId(props?.id)
		getExpert(props?.askThePros?.expertises)

		setTrustTheProsRefferalCode(props?.trustTheProsRefferalCode)
		setTotalAskTheProsRefferalCode(props?.totalAskTheProsRefferalCode)
		setTotalPageRefferalCode(props?.totalPageRefferalCode)
		setCurrentPage(props?.currentPage)

		setTrustTheProsRefferalCodeDropdown(props?.trustTheProsRefferalCodeDropdown)

		setTrustTheProsTotalPoints(props?.trustTheProsTotalPoints)

		setTrustTheProsRefferalCodeDropdownValue({
			code: props?.askThePros?.coupon_code,
			id: props?.askThePros?.coupon_code_id,
		});


	}, [props])


	return (
		<div data-component="edit-customer">
			<div className="row">
				<div className="col-md-12">
					<div className="tab">
						<div
							className={
								tab === 1 ? `sub-tab active-tab` : "sub-tab"
							}
							onClick={() => {
								setTab(1)
							}}
						>
							Pro info
						</div>
						<div
							className={
								tab === 2 ? `sub-tab active-tab` : "sub-tab"
							}
							onClick={() => {
								setTab(2)
							}}
						>
							Referral Code info
						</div>
					</div>

				</div>
			</div>
			{tab === 1 && (
				<>
					<div className="row sticky-scroll scroll">
						<div className="col">
							<div className="row mt-4">
								<div className="col-md-4">
									<div className="login-form ">
										<label>Name<span className="mandatory-star">*</span></label>
										<input
											type="text"
											name="name"
											readOnly={mode === "view" ? true : false}
											value={ask?.name}
											onChange={handleChange.bind(this)}
										/>
									</div>
									<div className="login-form ">
										<label>Email<span className="mandatory-star">*</span></label>
										<input
											type="text"
											name="email"
											readOnly={mode === "view" ? true : false}
											value={ask?.email}
											onChange={handleChange.bind(this)}
										/>
									</div>
									<div className="login-form ">
										<label>Description<span className="mandatory-star">*</span></label>
										<textarea
											cols="100"
											rows="5"
											type="text"
											name="description"
											readOnly={mode === "view" ? true : false}
											value={ask?.description}
											onChange={handleChange.bind(this)}
										/>
									</div>
									{mode === "view" ?
										<div className="mt-4">
											<Photo
												mode={mode}
												label={"Avatar"}
												accept=".jpg,.jpeg,.png"
												img={ask?.avatar_url}
											/>
										</div>
										:
										<div className="mt-4">
											<Photo
												mode={mode}
												label={"Avatar"}
												accept=".jpg,.jpeg,.png"
												name="avatar_url"
												img={ask?.avatar_url}
												setUrl={handlePhotoUrl.bind(this)}
												value={imgIcon}
												urlLink="http://65.1.17.188:5001/manage/category/photo/avatar"
											/>
										</div>}

									<div className="login-form mt-3 sort">
										<label>Experience<span className="mandatory-star">*</span></label>
										<div className="sort-by-select-wrapper">
											<Select
												disableUnderline
												variant="standard"
												disabled={mode === "view" ? true : false}
												autoWidth={true}
												IconComponent={ExpandMoreIcon}
												name="experience"
												onChange={handleChange.bind(this)}
												className="sort-by-select"
												value={ask?.experience ? ask?.experience : "select"}
											>
												<MenuItem
													value="select"
													disabled
													className="field_toggle_checked"
												>
													Select Category{" "}
												</MenuItem>
												<MenuItem value="1 Month">1 Month</MenuItem>
												<MenuItem value="2 Months">2 Months</MenuItem>
												<MenuItem value="3 Months">3 Months</MenuItem>
												<MenuItem value="4 Months">4 Months</MenuItem>
												<MenuItem value="5 Months">5 Months</MenuItem>
												<MenuItem value="6 Months">6 Months</MenuItem>
												<MenuItem value="7 Months">7 Months</MenuItem>
												<MenuItem value="8 Months">8 Months</MenuItem>
												<MenuItem value="9 Months">9 Months</MenuItem>
												<MenuItem value="10 Months">10 Months</MenuItem>
												<MenuItem value="11 Months">11 Months</MenuItem>
												<MenuItem value="1 Year">1 Year</MenuItem>
												<MenuItem value="2 Years">2 Years</MenuItem>
												<MenuItem value="3 Years">3 Years</MenuItem>
												<MenuItem value="4 Years">4 Years</MenuItem>
												<MenuItem value="5 Years">5 Years</MenuItem>
												<MenuItem value="5+ Years">5+ Years</MenuItem>
											</Select>
										</div>
										{/* <input
                          type="text"
                          name="experience"
                          value={ask?.experience}
                          readOnly={mode==="view"?true:false}
                          onChange={handleChange.bind(this)}
                        /> */}
									</div>
									<div className="signup-check">
										<Checkbox
											size="small"
											style={{ color: "#012169" }}
											checked={ask?.is_active ? ask?.is_active : false}
											name="is_active"
											disabled={mode === "view" ? true : false}
											onChange={handleCheck.bind(this)}
										/>
										<label>Active</label>
									</div>
								</div>
								<div className="col-md-12">
									<label className="expertise">Expertises<span className="mandatory-star">*</span></label>
									<div className="signup-check">
										<div className="d-flex flex-wrap">
											{expert?.map((value) => {
												return (
													<FormGroup>
														<FormControlLabel
															control={
																<Checkbox
																	style={{ color: "#012169" }}
																	size="small"
																	className="check"
																	value={value.id}
																	disabled={mode === "view" ? true : false}
																	onChange={handleChangeExpert.bind(this)}
																	checked={value?.selected ? value?.selected : false}
																	name={value?.name}
																/>
															}
															label={
																<span style={{ fontSize: "0.875rem" }}>
																	{value?.name}
																</span>
															}
														/>
													</FormGroup>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{tab === 2 && (
				<>
					{
						mode === "view" && (
							<>
								<div className="row totalCount">
									<div className="col">
										<div className=" h-100 d-flex align-items-start pt-3 text-end justify-content-start">
											{ask?.name} Professional Refferal Code: &nbsp;<div style={{ fontWeight: 400 }}>{ask?.coupon_code}</div>

										</div>
										{/* <div className="sort mt-3">
											<label>Pro Refferal Code<span className="mandatory-star">*</span></label>
											<div className="sort-by-select-wrapper">
											</div>
										</div> */}
									</div>
									<div className="col">
										<div className=" h-100 d-flex align-items-start pt-3 text-end justify-content-end">
											Total Points: {trustTheProsTotalPoints}
										</div>

									</div>
								</div>


							</>
						)
					}
					{
						mode === "edit" && (
							<>
								<div className="row">
									<div className="col">
										<div className="sort mt-3">
											<label>Pro Refferal Code<span className="mandatory-star">*</span></label>
											<div className="sort-by-select-wrapper">
												<Select
													disableUnderline
													variant="standard"
													autoWidth={false}
													IconComponent={ExpandMoreIcon}
													name="refferal_code"
													label={trustTheProsRefferalCodeDropdownValue.id}
													onChange={handleProsRefferalCodeChange}
													// onChange={handleProsRefferalCodeChange,child}
													// onChange={(event,child) => {
														// setTrustTheProsRefferalCodeDropdown(event.target.value);
													// 	setOpenProRefferalCode(true)
													// 	props?.setProfessionalReferralCode(event.target.value)
													// 	console.log(event.target.label,"labelId")
													// 	console.log(child.props?.label)
													// 	setTrustTheProsRefferalCodeDropdownValue(event.target.value)
													// }}
													className="sort-by-select w-50"
													value={trustTheProsRefferalCodeDropdownValue}
													// value={(e) => {trustTheProsRefferalCodeDropdownValue?.code === e.target.value?.code ? true : false}}
													// value={(e) => {trustTheProsRefferalCodeDropdownValue}}
													// value={(e) => {trustTheProsRefferalCodeDropdownValue === e.target.value ? true : false}}
												>
													{console.log(trustTheProsRefferalCodeDropdownValue,"trustTheProsRefferalCodeDropdownValue")}
													<MenuItem
														value="select"
														disabled
														className="field_toggle_checked"
													>
														Select Code{" "}
													</MenuItem>
													{trustTheProsRefferalCodeDropdown?.map(value => {
														return (
															<MenuItem
																value={value}
															>
																{console.log(value,"value")}
																{value?.code}
															</MenuItem>
														)
													})}
												</Select>
												<Dialog
													open={openProRefferalCode}
													onClose={handleCloseProRefferalCode}
													maxWidth="sm"
													fullWidth
													aria-labelledby="alert-dialog-title"
													aria-describedby="alert-dialog-description"
												>
													<DialogTitle style={{ color: "#012169" }}>
														Confirm the action
													</DialogTitle>
													<Box position="absolute" top={0} right={0}>
														<IconButton onClick={handleCloseProRefferalCode}>
															<CloseIcon />
														</IconButton>
													</Box>
													<DialogContent>
														<Typography style={{ color: "#7e8f99" }}>
															Are you sure you want to change the Professional Refferal Code
														</Typography>
													</DialogContent>
													<DialogActions style={{ marginBottom: "0.5rem" }}>
														<Button
															onClick={handleCloseProRefferalCode}
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
															onClick={confirmRefferalCode}
															style={{ background: "#f54a00", borderRadius: "0px" }}
															color="secondary"
															variant="contained"
														>
															Confirm
														</Button>
													</DialogActions>
												</Dialog>

											</div>
										</div>
									</div>
									<div className="col">
										<div className="totalCount h-100 my-3 d-flex align-items-start pt-3 text-end justify-content-end">
											Total Points: {trustTheProsTotalPoints}
										</div>

									</div>
								</div>

							</>
						)
					}




					<div data-component="CustomerComponent">
						<div className='mb-2 mt-2'>
							<div className="row">
								<div className="col-md-12">
									<div className="tableRow">
										<div className="col pe-1">Coupon Code</div>
										<div className="col px-2 text-center">Order ID</div>
										<div className="col px-2 text-center">Redeem By</div>
										<div className="col px-2 text-center">Date</div>
										<div className="col px-2 text-center">Reward Points</div>
										<div className="col px-2 text-end">Discount</div>
									</div>
								</div>
							</div>
							{
								trustTheProsRefferalCode && trustTheProsRefferalCode.length === 0 ? <div className="not-found">No Data Found</div> :
									trustTheProsRefferalCode?.map((p, index) => {
										return (
											<div className="row" key={index}>
												<div className="col-md-12">
													<div className="tableCell">
														<div className="tableBody pe-1 col elip-text" title={p?.coupon_code}>{p?.coupon_code}</div>
														<div className="px-2 col text-center elip-text" title={p?.order_id}>{p?.order_id}</div>
														<div className="px-2 col text-center elip-text" title={p?.redeem_by}>{p?.redeem_by}</div>
														<div className="px-2 col text-center elip-text" title={convertDateStringToDate(p?.created_at)}>{convertDateStringToDate(p?.created_at)}</div>
														<div className="px-2 col text-center elip-text" title={p?.reward_points}>{p?.reward_points}</div>
														<div className="col text-end px-2 elip-text" title={p?.discount}>₹&nbsp;{p?.discount ? p?.discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',') : parseInt(0).toFixed(2)}</div>
													</div>
												</div>
											</div>
										);
									})}
						</div>
					</div>

					{
						totalPageRefferalCode > 1 ?
							<div className="row">
								<div className="col-md-12 mt-5 justify-content-between d-flex position-relative">
									<div className="pagiantion-category">
										<div>
											<Pagination
												className="pagination pagi"
												page={currentPage}
												count={totalPageRefferalCode}
												onChange={onPageChange}
											/>
										</div>
										<div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
											Total Professionals Refferal Codes: {totalAskTheProsRefferalCode.total}
										</div>
									</div>
								</div>
							</div>
							:
							""
					}

				</>
			)}

		</div>
	)
}
