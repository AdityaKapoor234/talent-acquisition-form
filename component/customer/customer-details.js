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
import { toast } from "react-toastify";
import CustomerApi from "../../services/customer";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddressView from "../common-component/addressview";
import AddressForm from "../common-component/address-form"
import EditIcon from '@mui/icons-material/Edit';
import GiftCardApi from "../../services/gift-card";

export default class CustomerDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props?.customer?.is_active ? props?.customer?.is_active : false,
			tab: 1,
			userType: props?.userType,
			customer: props?.customer,
			wishList: props?.wishList,
			mode: props?.mode,
			currentPage: 1,
			currentPageAddress: 1,
			currentWishListPage: 1,
			wishListTotalProduct: props?.wishListTotalProduct,
			totalWishListPage: props?.totalWishListPage,
			shoppingCart: props?.shoppingCart,
			shoppingCartTotal: props?.shoppingCartTotal,
			customerWallet: props?.customerWallet,
			customerWalletTransaction: props?.customerWalletTransaction,
			customerWalletTotalTransaction: props?.customerWalletTotalTransaction,
			currentWalletPage: 1,
			id: props?.id,
			idAddress: [],
			add_address: false,
			open: false,
			dialog: false,
			address: [],
			orders: [],
			typeList: [],
			orderTotal: 1,
			addressTotal: 1,
			input: {
				phone_number: props?.customer?.phone_number,
				name: props?.customer?.name,
				id: props?.customer?.id,
				email: props?.customer?.email,
				user_type: "select",
				is_active: props?.customer?.is_active,
			},
			// giftCardRedeem: props?.giftCardRedeem,
			// giftCardRedeemTotalProduct: props?.giftCardRedeemTotalProduct,
			// totalGiftCardRedeemPage: props?.totalGiftCardRedeemPage,
			// giftCardSend: props?.giftCardSend,
			// giftCardSendTotalProduct: props?.giftCardSendTotalProduct,
			// totalGiftCardSendPage: props?.totalGiftCardSendPage,

			giftCardRedeem: [],
			giftCardRedeemTotalProduct: "",
			totalGiftCardRedeemPage: "",	  
			giftCardSend: [],
			giftCardSendTotalProduct: "",
			totalGiftCardSendPage: "",
	  
			giftCardSendViewObj: {},
			giftCardRedeemViewObj: {},
			giftCardTab: 1,
			giftCardRedeemTab: 1,
			giftCardSendTab: 1,
			currentPageGiftCardSend: 1,
			currentPageGiftCardRedeem: 1,
		};
	}
	handleClickOpen = () => {
		this.setState({ dialog: true });
	};
	handleClickClose = () => {
		this.setState({ dialog: false });
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};
	handleCheckbox = () => {
		if (this.state.active) {
			this.setState({
				active: false,
				open: false,
			});
			this.props?.active(false);

			let input = this.state.input;
			input["is_active"] = false;
			this.setState({ input });
			this.props?.handle(input);

		} else {
			this.setState({
				active: true,
				open: false,
			});
			this.props?.active(true);

			let input = this.state.input;
			input["is_active"] = true;
			this.setState({ input });
			this.props?.handle(input);
		}
	};
	onPageChange = (e, page) => {
		this.setState({ currentPage: page });
		this.getOrder(this.state.id, page);

	};

	onPageChangeAddress = (e, page) => {
		this.setState({ currentPageAddress: page });
		this.getAddress(this.state.id, page);
	};
	onPageWallet = (e, page) => {
		this.setState({ currentWalletPage: page });
		this.props.customerWalletTransactionList(page, this.state.id)

	}
	onPageChangeGiftCardSend = (e, page) => {
		this.setState({ currentPageGiftCardSend: page });
		this.giftCardSendList(this.state.id, page);
	};
	onPageChangeGiftCardRedeem = (e, page) => {
		this.setState({ currentPageGiftCardRedeem: page });
		this.giftCardRedeemList(this.state.id, page);
	};

	giftCardSendView = (value) => {
		this.setState({ giftCardSendTab: 2 });
		this.setState({ giftCardSendViewObj: value });
	}

	giftCardRedeemView = (value) => {
		this.setState({ giftCardRedeemTab: 2 });
		this.setState({ giftCardRedeemViewObj: value });
	}

	closeAddress = () => {
		this.setState({ add_address: false });
		window.scrollTo(0, 0);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.customer !== nextProps.customer ||
			prevState.mode !== nextProps.mode ||
			prevState.wishList !== nextProps.wishList ||
			prevState.wishListTotalProduct !== nextProps.wishListTotalProduct ||
			prevState.totalWishListPage !== nextProps.totalWishListPage ||
			prevState.shoppingCart !== nextProps.shoppingCart ||
			prevState.shoppingCartTotal !== nextProps.shoppingCartTotal ||
			prevState.customerWalletTransaction !== nextProps.customerWalletTransaction ||
			prevState.customerWallet !== nextProps.customerWallet ||
			prevState.customerWalletTotalTransaction !== nextProps.customerWalletTotalTransaction ||

			prevState.userType !== nextProps.userType ||
			prevState.id !== nextProps.id
		) {
			return {
				customer: nextProps?.customer,
				userType: nextProps?.userType,
				input: {
					phone_number: nextProps?.customer?.phone_number,
					id: nextProps?.customer?.id,
					name: nextProps?.customer?.name,
					email: nextProps?.customer?.email,
					user_type: nextProps?.customer?.user_type ? nextProps?.customer?.user_type : "select",
					is_active: nextProps?.customer?.is_active ? nextProps?.customer?.is_active : false,
				},
				mode: nextProps?.mode,
				wishList: nextProps?.wishList,
				wishListTotalProduct: nextProps?.wishListTotalProduct,
				totalWishListPage: nextProps?.totalWishListPage,
				shoppingCart: nextProps?.shoppingCart,
				shoppingCartTotal: nextProps?.shoppingCartTotal,
				id: nextProps?.id,
				customerWalletTransaction: nextProps?.customerWalletTransaction,
				customerWallet: nextProps?.customerWallet,
				customerWalletTotalTransaction: nextProps?.customerWalletTotalTransaction,
				active: nextProps?.customer?.is_active ? nextProps?.customer?.is_active : false,
				// giftCardRedeem: nextProps?.giftCardRedeem,
				// giftCardRedeemTotalProduct: nextProps?.giftCardRedeemTotalProduct,
				// totalGiftCardRedeemPage: nextProps?.totalGiftCardRedeemPage,
				// giftCardSend: nextProps?.giftCardSend,
				// giftCardSendTotalProduct: nextProps?.giftCardSendTotalProduct,
				// totalGiftCardSendPage: nextProps?.totalGiftCardSendPage,
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
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		let str =
			date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		return str;
	};

	getAddresses = (id, page) => {
		CustomerApi.CustomerAddresses(id, page)
			.then((response) => {
				this.setState({
					address: response?.data?.data?.list,
					addressTotal: response?.data?.data?.pages,
				});
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
	};

	handleChange = (event) => {
		let input = this.state.input;
		input[event.target.name] = event.target.value;
		this.setState({ input });
		this.props?.handle(input);
	};

	getOrder = (id, page) => {
		CustomerApi.CustomerOrder(id, page)
			.then((response) => {
				this.setState({
					orders: response?.data?.data?.list,
					orderTotal: response?.data?.data?.pages,
				});
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
	};




	giftCardSendList = (id, page) => {
		GiftCardApi.giftCardSend(id, page)
		.then((response) => {
		  this.setState({ giftCardSend: response.data.data.list })
		  this.setState({ giftCardSendTotalProduct: response.data.data.total })
		  this.setState({ totalGiftCardSendPage: Math.ceil(response.data.data.total / response.data.data.page_size) })
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

	  giftCardRedeemList = (id, page) => {
		GiftCardApi.giftCardRedeem(id, page)
		  .then((response) => {
			this.setState({ giftCardRedeem: response.data.data.list })
			this.setState({ giftCardRedeemTotalProduct: response.data.data.total })
			this.setState({ totalGiftCardRedeemPage: Math.ceil(response.data.data.total / response.data.data.page_size) })
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
	

	// getCustomerType = () => {
	//   CustomerApi.CustomerType()
	//     .then((response) => {
	//       this.setState({
	//         typeList:response.data.data.list
	//       });
	//     })
	//     .catch((error) => {
	//       toast.error(
	//         error?.response &&
	//           error?.response?.data &&
	//           error?.response?.data?.message
	//           ? error.response.data.message
	//           : "Unable to process your request, please try after sometime"
	//       );
	//     });
	// };

	pageChange = (e, page) => {
		this.props?.wishListPage(page);
		this.setState({ currentWishListPage: page });
	};

	componentDidMount() {
		if (this.state.mode !== "create") {
			this.getAddresses(this.state.id, 1);
			this.getOrder(this.state.id, 1);
		}
		// this.getCustomerType();
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
								General info
							</div>
							{
								(this.state.mode === "edit" || this.state.mode === "view") ?
									<>
										<div
											className={
												this.state.tab === 2 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 2 });
											}}
										>
											Address Info
										</div>
										<div
											className={
												this.state.tab === 3 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 3 });
											}}
										>
											order Info
										</div>
										<div
											className={
												this.state.tab === 4 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 4 });
											}}
										>
											wishlist Info
										</div>
										<div
											className={
												this.state.tab === 5 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 5 });
											}}
										>
											shopping cart Info
										</div>
										<div
											className={
												this.state.tab === 6 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 6 });
											}}
										>
											Wallet
										</div>
										<div
											className={
												this.state.tab === 7 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ tab: 7 });
												this.setState({ giftCardTab: 1 });
												this.setState({ currentPageGiftCardRedeem: 1 });
												this.setState({ currentPageGiftCardSend: 1 });
												this.giftCardRedeemList(this.state.id, 1);
												this.giftCardSendList(this.state.id, 1);									
											}}
										>
											Gift Card
										</div>
									</>
									:
									""
							}
						</div>
					</div>
				</div>
				{this.state.tab === 1 && (
					<>
						{this.state.mode === "create" && (
							<div className="row mt-4">
								<div className="col-md-4">
									<div className="login-form sort ">
										<label>
											Customer Type<span className="mandatory-star">*</span>
										</label>
										<div className="sort-by-select-wrapper">
											<Select
												disableUnderline
												variant="standard"
												autoWidth={true}
												IconComponent={ExpandMoreIcon}
												name="user_type"
												onChange={this.handleChange}
												className="sort-by-select"
												value={this.state.input?.user_type?.toLowerCase()}
											>
												<MenuItem
													value="select"
													disabled
													className="field_toggle_checked"
												>
													Select Customer Type{" "}
												</MenuItem>
												{this.state.userType?.map((value) => {
													return (
														<MenuItem value={value?.user_type?.toLowerCase()}>
															<div className="text-capitalize">
																{value?.user_type}
															</div>
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</div>
									<div className="login-form ">
										<label>
											Name<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											value={this.state.input?.name}
											name="name"
											onChange={this.handleChange}
										/>
									</div>
									<div className="login-form ">
										<label>
											Email
										</label>
										<input
											type="text"
											value={this.state.input?.email}
											name="email"
											onChange={this.handleChange}
										/>
									</div>
									<div className="login-form ">
										<label>
											Mobile
										</label>
										<input
											type="number"
											name="phone_number"
											onChange={this.handleChange}
											value={this.state.input?.phone_number}
										/>
									</div>
									{/* <div className="signup-check">
										<Checkbox
											size="small"
											style={{ color: "#012169" }}
											checked={this.state.active}
											onChange={() => {
												this.setState({ open: true });
											}}
										/>
										<label>Active</label>
									</div> */}
								</div>
							</div>
						)}
						{this.state.mode === "edit" && (
							<div className="row mt-4">
								<div className="col-md-4">
									<div className="login-form sort ">
										<label>
											Customer Type<span className="mandatory-star">*</span>
										</label>
										<div className="sort-by-select-wrapper">
											<Select
												disableUnderline
												variant="standard"
												autoWidth={true}
												// disabled
												IconComponent={ExpandMoreIcon}
												name="user_type"
												onChange={this.handleChange}
												className="sort-by-select"
												value={this.state.input?.user_type?.toLowerCase()}
											>
												<MenuItem
													value="select"
													disabled
													className="field_toggle_checked"
												>
													Select Customer Type{" "}
												</MenuItem>
												{this.state.userType?.map((value) => {
													return (
														<MenuItem value={value?.user_type?.toLowerCase()}>
															<div className="text-capitalize">
																{value?.user_type}
															</div>
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</div>
									<div className="login-form ">
										<label>
											Customer ID<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											value={this.state.input?.id}
											name="id"
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>
											Name<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											value={this.state.input?.name}
											name="name"
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>
											Email
										</label>
										<input
											type="text"
											value={this.state.input?.email}
											name="email"
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>
											Mobile
										</label>
										<input
											type="number"
											name="phone_number"
											value={this.state.input?.phone_number}
											readOnly={true}
										/>
									</div>
									<div className="signup-check">
										<Checkbox
											size="small"
											name="is_active"
											style={{ color: "#012169" }}
											checked={this.state.active}
											onChange={() => {
												this.setState({ open: true });
											}}
										/>
										<label>Active</label>
									</div>
								</div>
							</div>
						)}
						{this.state.mode === "view" && (
							<div className="row mt-4">
								<div className="col-md-4">
									<div className="login-form ">
										<label>
											Customer Type<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											readOnly={true}
											value={this.state.customer?.user_type}
										/>
									</div>
									<div className="login-form ">
										<label>
											Customer ID<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											value={this.state.input?.id}
											name="id"
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>
											Name<span className="mandatory-star">*</span>
										</label>
										<input
											type="text"
											readOnly={true}
											value={this.state.customer?.name}
										/>
									</div>
									<div className="login-form ">
										<label>
											Email
										</label>
										<input
											type="text"
											readOnly={true}
											value={this.state.customer?.email}
										/>
									</div>
									<div className="login-form ">
										<label>
											Mobile
										</label>
										<input
											type="number"
											readOnly={true}
											value={this.state.customer?.phone_number}
										/>
									</div>
									<div className="signup-check">
										<Checkbox
											size="small"
											disabled
											style={{ color: "#012169" }}
											checked={this.state.customer?.is_active}
										/>
										<label>Active</label>
									</div>
								</div>
							</div>
						)}
					</>
				)}
				{this.state.tab === 2 && (
					<>
						{/* {this.state.mode === "create" && (
							<>
								<AddressForm mode="create" />
							</>
						)} */}
						{/* {this.state.mode === "edit" && (
							<> */}
						<div data-component="address-view">
							<div className="row mt-4">
								{/* {this.state.address?.length === 0 && (
									<div className="error-message">No Address Info</div>
								)} */}

								{(this.state.mode === "edit") && (
									<div data-component="account-setting" className="mb-4">

										{this.state.add_address === true ? (
											<div id="account">
												<span className="add-new-address">Add new address </span>
												<div className="bg-white">
													<AddressForm onClose={() => this.closeAddress()} mode="create" id={this.state.id} customerID={this.state.id} />
												</div>

											</div>
										) : (
											<a href="#account">
												<div
													className="custom-btn add-address my-0"
													onClick={() => {
														this.setState({ add_address: true });
													}}
												>
													<span>Add new address </span>
												</div>
											</a>
										)}



									</div>
								)}

								{this.state.address?.map((p) => {
									return (
										<>
											<div className="col-xl-4 col-lg-6 col-sm-6 mb-3">
												<AddressView addressDetails={p} mode={this.state.mode} id={p?.id} customerID={this.state.id} />
											</div>
											{/* <div className="col-xl-4 col-lg-6 col-sm-6 mb-3">
												<div className="edit-box">
													<div className="row">
														<div className="col-12">
															<div className="complete-address">
																<div>
																	{
																		(this.state.mode === "edit" || this.state.mode === "create") && (
																			<>
																				<div className="text-end">
																					<span onClick={this.handleClickOpen}>
																						<EditIcon className="edit-icon" style={{ color: "#f54a00" }} />
																					</span>
																				</div>
																			</>
																		)
																	}
																	<Dialog
																		open={this.state.dialog}
																		onClose={this.handleClickClose}
																		aria-labelledby="alert-dialog-title"
																		aria-describedby="alert-dialog-description"
																	>
																		<DialogTitle id="alert-dialog-title">
																			<div className="d-flex justify-content-between">
																				<span style={{ color: "#012169" }}>
																					{"Edit Address"}
																				</span>
																				<Box position="absolute" right={0}>
																					<Button style={{ cursor: "pointer", color: "#012169" }} onClick={this.handleClickClose}>
																						{<CloseIcon />}
																					</Button>
																				</Box></div>
																		</DialogTitle>
																		<DialogContent>
																			<DialogContentText
																				id="alert-dialog-description"
																				sx={{ color: "#012169" }} >
																					{p.recipient_name}
																				<AddressForm address={p} id={p.id} mode="edit" />
																			</DialogContentText>
																		</DialogContent>
																	</Dialog>


																	<div
																		className="name two-line-ellipsis mt-3"
																		title={p?.recipient_name}
																	>
																		{p?.recipient_name}
																	</div>
																	<div
																		className="address"
																		title={`${p?.flat_no} ${p?.locality} ${p?.city} ${p?.pin_code}`}
																	>
																		{p?.flat_no} {p?.locality}
																		{p?.landmark !== "" ? ", " : " "}
																		<div>
																			{p?.landmark !== "" ? "Near " : ""}
																			{p?.landmark !== "" ? p?.landmark : ""}
																			{p?.landmark !== "" ? ", " : ""}
																			{p?.city}{" "}
																		</div>
																		<div>
																			{p?.state}
																			{" - "}
																			{p?.pin_code}
																		</div>
																	</div>
																	<div className="number">
																		{p?.recipient_phone_number}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div> */}
										</>
									);
								})}
							</div>
						</div>
						{this.state.addressTotal > 1 && (
							<div className="row">
								<div className="col-md-12 justify-content-between d-flex position-relative">
									<div className="pagiantion-category">
										<div>
											<Pagination
												className="pagination pagi"
												page={this.state.currentPageAddress}
												count={this.state.addressTotal}
												onChange={this.onPageChangeAddress}
											/>
										</div>
										<div
											className="position-absolute totalCount"
											style={{ right: 23, bottom: 5 }}
										>
											Total Addresses: {this.state.address?.length}
										</div>
									</div>
								</div>
							</div>
						)}
						{/* </>
						)} */}
						{/* {this.state.mode === "view" && (
							<>
								<div data-component="address-view">
									<div className="row mt-4 sticky-scroll scroll">
										{this.state.address?.length === 0 && (
											<div className="error-message">No Address Info</div>
										)}
										{this.state.address?.map((p) => {
											return (
												<div className="col-xl-4 col-lg-6 col-sm-6 mb-3">
													<div className="edit-box">
														<div className="row">
															<div className="col-12">
																<div className="complete-address">
																	<div>
																		<div
																			className="name two-line-ellipsis mt-3"
																			title={p?.recipient_name}
																		>
																			{p?.recipient_name}
																		</div>
																		<div
																			className="address"
																			title={`${p?.flat_no} ${p?.locality} ${p?.city} ${p?.pin_code}`}
																		>
																			{p?.flat_no} {p?.locality}
																			{p?.landmark !== "" ? ", " : " "}
																			<div>
																				{p?.landmark !== "" ? "Near " : ""}
																				{p?.landmark !== "" ? p?.landmark : ""}
																				{p?.landmark !== "" ? ", " : ""}
																				{p?.city}{" "}
																			</div>
																			<div>
																				{p?.state}
																				{" - "}
																				{p?.pin_code}
																			</div>
																		</div>
																		<div className="number">
																			{p?.recipient_phone_number}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
								{this.state.addressTotal > 1 && (
									<div className="row">
										<div className="col-md-12 justify-content-between d-flex position-relative">
											<div className="pagiantion-category">
												<div>
													<Pagination
														className="pagination pagi"
														page={this.state.currentPageAddress}
														count={this.state.addressTotal}
														onChange={this.onPageChangeAddress}
													/>
												</div>
												<div
													className="position-absolute totalCount"
													style={{ right: 23, bottom: 5 }}
												>
													Total Addresses: {this.state.address?.length}
												</div>
											</div>
										</div>
									</div>
								)}
							</>
						)} */}
					</>
				)
				}
				{
					this.state.tab === 3 && (
						<>
							<div data-component="CustomerComponent">
								<div className="row">
									<div className="col-md-12">
										<div className="tableRow">
											<div className="col">Order#</div>
											<div className="col text-center">Date</div>
											<div className="col text-center">Status</div>
											{/* <div className="col-3 text-center">Shipment Method</div> */}
											<div className="col text-center">Total</div>
											{/* <div className="col-1 text-center">Active</div> */}
											<div className="col-1 text-end">View</div>
										</div>
									</div>
								</div>
								<div className="sticky-scroll scroll">
									{this.state.orders?.length === 0 && (
										<div className="error-message">No order Info</div>
									)}
									{this.state.orders?.map((p) => {
										return (
											<div className="row">
												<div className="col-md-12">
													<div className="tableCell">
														<div className="tableBody col">{p?.order_number}</div>
														<div className="col text-center">
															{this.convertDateStringToDate(p?.created_at)}
														</div>
														<div className="tableBody col justify-content-center">
															{p?.status}
														</div>
														{/* <div className="col-3 text-center">COD</div> */}
														<div className="col text-center">
															₹{" "}
															{p?.total
																?.toFixed(2)
																.toString()
																.replace(
																	/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
																	","
																)}
														</div>
														{/* <div className="col-1 text-center">
                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                          </div> */}
														<div className="col-1 text-end">
															<RemoveRedEyeIcon
																className="view-icon"
																onClick={() => {
																	Router.push(`/order/${p?.order_number}/view`);
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							{this.state.orderTotal > 1 && (
								<div className="row">
									<div className="col-md-12 justify-content-between d-flex position-relative">
										<div className="pagiantion-category">
											<div>
												<Pagination
													className="pagination pagi"
													page={this.state.currentPage}
													count={this.state.orderTotal}
													onChange={this.onPageChange}
												/>
											</div>
											<div
												className="position-absolute totalCount"
												style={{ right: 23, bottom: 5 }}
											>
												Total Orders: {this.state.orders?.length}
											</div>
										</div>
									</div>
								</div>
							)}
						</>
					)
				}
				{
					this.state.tab === 4 && (
						<>
							<div data-component="wishlist">
								<div className="row">
									{this.state?.wishList?.map((val) => {
										return (
											<div className="col-3">
												<div className="padding">
													<div className="box">
														<div
															className="bck-img mt-4"
															style={{
																backgroundImage: `url(${val?.primary_image_path})`,
															}}
														></div>
														<div className="name">
															<h3 className="text-center">{val?.name}</h3>
															<div className="product-qulaty-div mb-3">
																<span>{val?.size}</span>
																{val?.size !== "" && val?.flavor !== ""
																	? "|"
																	: ""}
																<span>{val?.flavor}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								{
									this.state.wishListTotalProduct > 0 ?
										<div className="row">
											<div className="col-md-12 py-5 justify-content-between d-flex position-relative">
												<div className="pagiantion-category">
													<div>
														<Pagination
															className="pagination pagi"
															page={this.state.currentWishListPage}
															count={this.state.totalWishListPage}
															onChange={this.pageChange.bind(this)}
														/>
													</div>
													<div
														className="position-absolute totalCount"
														style={{ right: 23, bottom: 5 }}
													>
														Total Products: {this.state.wishListTotalProduct}
													</div>
												</div>
											</div>
										</div>
										:
										<div className="not-found">No Data Found</div>
								}
							</div>
						</>
					)
				}
				{
					this.state.tab === 5 && (
						<>
							{this.state.shoppingCartTotal === "" || this.state.shoppingCartTotal === null || this.state.shoppingCartTotal === undefined ?
								<div className="not-found">No Data Found</div>
								:
								<div>
									<div data-component="CustomerComponent">
										<div className="tableRow d-flex justify-content-start">
											Shopping Cart Total: ₹&nbsp;{this.state.shoppingCartTotal?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
										</div>
									</div>
									<div data-component="wishlist">
										<div className="row">
											{this.state?.shoppingCart?.map((val) => {
												return (
													<div className="col-3">
														<div className="padding">
															<div className="box">
																<div
																	className="bck-img mt-4"
																	style={{
																		backgroundImage: `url(${val?.image})`,
																	}}
																></div>
																<div className="name">
																	<h3 className="text-center">{val?.name}</h3>
																	<div className="product-qulaty-div">
																		<span>
																			{val?.flavor}&nbsp;
																			{val?.quantity !== "" && val?.flavor !== ""
																				? "|"
																				: ""}&nbsp;
																			Qty:&nbsp;{val?.quantity}&nbsp;Unit
																		</span>
																	</div>
																	{/* <div className="product-qulaty-div mb-3">
																		<span>Qty:&nbsp;{val?.quantity}&nbsp;Unit</span>
																	</div>
																	<div className="product-qulaty-div mb-3">
																		<span>Weight:&nbsp;{val?.weight}&nbsp;{val?.weight_unit}</span>
																	</div>
																	<div className="product-qulaty-div mb-3">
																		<span>Price: ₹&nbsp;{val?.price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
																	</div> */}
																	<div className="product-qulaty-div mb-3">
																		<span>Special Price: ₹&nbsp;{val?.special_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												);
											})}
										</div>
										{/* <div className="row">
						<div className="col-md-12 py-5 justify-content-between d-flex position-relative">
							<div className="pagiantion-category">
								<div>
									<Pagination
										className="pagination pagi"
										page={this.state.currentWishListPage}
										count={this.state.totalWishListPage}
										onChange={this.pageChange.bind(this)}
									/>
								</div>
								<div
									className="position-absolute totalCount"
									style={{ right: 23, bottom: 5 }}
								>
									Total Products: {this.state.wishListTotalProduct}
								</div>
							</div>
						</div>
					</div> */}
									</div>
								</div>

							}
						</>
					)
				}

				{
					this.state.tab === 6 && (
						<>
							{this.state.customerWallet === "" || this.state.customerWallet === null || this.state.customerWallet === undefined ?
								<div className="no-data-found">NO Reward Info</div> :
								<div>
									<div data-Component="CustomerWallet">
										<div className="justify-content-center d-flex w-100 mt-3">
											<div className="fitpointsCircle text-center align-items-center">
												<div className="fitpointsCircleHead">
													{this.state.customerWallet.total}
												</div>
												Points
											</div>
										</div>

										<div className="fitpointsCircleBanner justify-content-center d-flex w-100 mt-3 mb-2">
											Total Wallet Balance
										</div>

										<div className="">
											<div className=" justify-content-between d-flex">
												<div className=" borderBox borderBoxPurple borderBoxMargin mt-3">
													<div className="row align-items-center align-content-center justify-content-center">
														<div className="col-md-2 col-12 py-2 img">
															<div className="borderBoxCircle img">
																<img src="/images/VectorGift.png" className="img-fluid" />
															</div>
														</div>
														<div className="col-md-9 col-12 py-2 img">
															<div className="borderBoxInfo">
																FitPRO Reward:&nbsp;<span className="borderBoxInfoVal">{this.state.customerWallet.fitcart_reward}</span>
															</div>

														</div>
													</div>
												</div>



												<div className=" borderBox borderBoxYellow borderBoxMargin mt-3">
													<div className="row align-items-center align-content-center justify-content-center">
														<div className="col-md-2 col-12 py-2  img">
															<div className="borderBoxCircle">
																<img src="/images/announce1.svg" className="img-fluid" />
															</div>
														</div>
														<div className="col-md-9 col-12 py-2 img">
															<div className="borderBoxInfo">
																Referral Points:&nbsp;<span className="borderBoxInfoVal">{this.state.customerWallet.referral_point}</span>
															</div>


														</div>
													</div>
												</div>












											</div>
										</div>
										<div>
											<div className="text-center mt-3 accordionHeading">Wallet Transaction History</div>
										</div>

									</div>
								</div>
							}


							<div data-component="CustomerComponent">
								<div className="row">
									<div className="col-md-12">
										<div className="tableRow">
											<div className="col-md-6">Description</div>
											<div className="col-md-3 text-center">Credit/Debit(Points)</div>
											<div className="col-md-3 text-center">Total</div>
											{/* <div className="col-3 text-center">Shipment Method</div> */}
											{/* <div className="col text-center">Total</div> */}
											{/* <div className="col-1 text-center">Active</div> */}
											{/* <div className="col-1 text-end">View</div> */}
										</div>
									</div>
								</div>
								<div className="sticky-scroll scroll">
									{this.state.customerWalletTransaction?.length === 0 && (
										<div className="error-message">No Reward Info</div>
									)}
									{this.state.customerWalletTransaction?.map((p) => {
										return (
											<div className="row">
												<div className="col-md-12">
													<div className="tableCell">
														<div className="tableBody col-md-6">{p?.remark}</div>
														<div className=" tableBody col-md-3 text-center justify-content-center">
															{p?.credit_debit}
														</div>
														<div className="tableBody col-md-3 text-center justify-content-center">
															{p?.total}
														</div>
														{/* <div className="col-3 text-center">COD</div> */}
														{/* <div className="col text-center">
															₹{" "}
															{p?.total
																?.toFixed(2)
																.toString()
																.replace(
																	/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
																	","
																)}
														</div> */}
														{/* <div className="col-1 text-center">
                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                          </div> */}
														{/* <div className="col-1 text-end">
															<RemoveRedEyeIcon
																className="view-icon"
																onClick={() => {
																	Router.push(`/order/${p?.order_number}/view`);
																}}
															/>
														</div> */}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							{/* {this.state.customerWalletTransaction > 1 && ( */}
							<div className="row">
								<div className="col-md-12 justify-content-between d-flex position-relative">
									<div className="pagiantion-category">
										<div>
											<Pagination
												className="pagination pagi"
												page={this.state.currentWalletPage}
												count={this.state.customerWalletTotalTransaction.pages}
												onChange={this.onPageWallet}
											/>
										</div>
										<div
											className="position-absolute totalCount"
											style={{ right: 23, bottom: 5 }}
										>
											Total Transaction: {this.state.customerWalletTotalTransaction.total}
										</div>
									</div>
								</div>
							</div>
							{/* )} */}
						</>
					)
				}


				{
					this.state.tab === 7 && (
						<>
							<div className="row">
								<div className="col-md-12">
									<div className="tab">
										<div
											className={
												this.state.giftCardTab === 1 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ giftCardTab: 1 });
												this.setState({ giftCardRedeemTab: 1 });
												this.setState({ currentPageGiftCardRedeem: 1 });
												this.giftCardRedeemList(this.state.id, 1);
											}}
										>
											Redeem
										</div>
										<div
											className={
												this.state.giftCardTab === 2 ? `sub-tab active-tab` : "sub-tab"
											}
											onClick={() => {
												this.setState({ giftCardTab: 2 });
												this.setState({ giftCardSendTab: 1 });
												this.setState({ currentPageGiftCardSend: 1 });
												this.giftCardSendList(this.state.id, 1);									
											}}
										>
											Send
										</div>
									</div>
								</div>
							</div>
							{this.state.giftCardTab === 1 && (
								<>
									{this.state.giftCardRedeemTab === 1 && (
										<>
											<div data-component="CustomerComponent">
												<div className="row">
													<div className="col-md-12">
														<div className="tableRow">
															<div className="col">Sender Name</div>
															<div className="col text-center">Receiver Name</div>
															<div className="col text-center">Purchase</div>
															<div className="col text-center">Expiry</div>
															<div className="col text-center">Amount</div>
															<div className="col-1 text-center">Active</div>
															<div className="col-1 text-center">Redeem</div>
															<div className="col-1 text-end">View</div>
														</div>
													</div>
												</div>
												<div className="sticky-scroll scroll">
													{this.state.giftCardRedeem?.length === 0 && (
														<div className="error-message">No order Info</div>
													)}
													{this.state.giftCardRedeem?.map((p) => {
														return (
															<div className="row">
																<div className="col-md-12">
																	<div className="tableCell">
																		<div className="tableBody col pe-1 elip-text" title={p?.gift_cards?.sender_name}>{p?.gift_cards?.sender_name}</div>
																		<div className="col text-center px-2 elip-text" title={p?.gift_cards?.receiver_name}>
																			{p?.gift_cards?.receiver_name}
																		</div>
																		<div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.gift_cards?.created_at)}>
																			{this.convertDateStringToDate(p?.gift_cards?.created_at)}
																		</div>
																		<div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.gift_cards?.expire_date)}>
																			{this.convertDateStringToDate(p?.gift_cards?.expire_date)}
																		</div>
																		<div className="col text-center px-2 elip-text" title={p?.gift_cards?.gift_card_amount}>
																			{p?.gift_cards?.gift_card_amount}
																		</div>
																		<div className="col-1 text-center">
																			{p?.gift_cards?.is_active === true ? (
																				<CheckCircleOutlineOutlinedIcon className="check-icon" />
																			) : (
																				<CancelOutlinedIcon className="cancel-icon" />
																			)}
																		</div>
																		<div className="col-1 text-center">
																			{p?.gift_cards?.is_redeem === true ? (
																				<CheckCircleOutlineOutlinedIcon className="check-icon" />
																			) : (
																				<CancelOutlinedIcon className="cancel-icon" />
																			)}
																		</div>
																		<div className="col-1 text-end">
																			<RemoveRedEyeIcon
																				className="view-icon"
																				onClick={() => {
																					this.giftCardRedeemView(p?.gift_cards);
																				}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														);
													})}
												</div>
											</div>
											{this.state.totalGiftCardRedeemPage > 1 && (
												<div className="row">
													<div className="col-md-12 justify-content-between d-flex position-relative">
														<div className="pagiantion-category">
															<div>
																<Pagination
																	className="pagination pagi"
																	page={this.state.currentPageGiftCardRedeem}
																	count={this.state.totalGiftCardRedeemPage}
																	onChange={this.onPageChangeGiftCardRedeem}
																/>
															</div>
															<div
																className="position-absolute totalCount"
																style={{ right: 23, bottom: 5 }}
															>
																Total Gift Cards: {this.state.giftCardRedeemTotalProduct}
															</div>
														</div>
													</div>
												</div>
											)}
										</>
									)}
									{this.state.giftCardRedeemTab === 2 && (
										<>
											<div className="btn-save mt-4 row justify-content-start">
												<div
													className="Cancel-btn custom-btn"
													onClick={() => {
														this.setState({ giftCardRedeemTab: 1 });
													}}
												>
													<span>Back </span>
												</div>
											</div>
											<div className="row sticky-scroll scroll">
												<div className="col">
													<div className="row mt-4">
														<div className="col-md-4">
															<div className="login-form ">
																<label>
																	Sender's Name<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.sender_name}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's Name<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.receiver_name}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's Mobile No<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.receiver_mobile_no}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's E-Mail<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.receiver_email}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Occassion<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.occasion_type}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Message<span className="mandatory-star">*</span>
																</label>
																<textarea
																	cols="100"
																	rows="5"
																	type="text"
																	name="body"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.message}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Purchase Date<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.convertDateStringToDate(this.state.giftCardRedeemViewObj?.created_at)}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Expiry Date<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.convertDateStringToDate(this.state.giftCardRedeemViewObj?.expire_date)}
																/>
															</div>
															{
																this.state.giftCardRedeemViewObj?.is_redeem && (
																	<div className="login-form ">
																		<label>
																			Redeem Date<span className="mandatory-star">*</span>
																		</label>
																		<input
																			type="text"
																			name="asked_by"
																			readOnly={true}
																			value={this.convertDateStringToDate(this.state.giftCardRedeemViewObj?.redeem_date)}
																		/>
																	</div>
																)
															}
															<div className="login-form ">
																<label>
																	Gift Card Amount<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.gift_card_amount}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Gift Card Code<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardRedeemViewObj?.gift_card_code}
																/>
															</div>
															<div className="signup-check ">
																<Checkbox
																	size="small"
																	disabled
																	style={{ color: "#012169" }}
																	checked={this.state.giftCardRedeemViewObj?.is_active}
																/>
																<label>Active</label>
															</div>
															<div className="signup-check ">
																<Checkbox
																	size="small"
																	disabled
																	style={{ color: "#012169" }}
																	checked={this.state.giftCardRedeemViewObj?.is_redeem}
																/>
																<label>Redeemed</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										</>
									)}

								</>
							)}
							{this.state.giftCardTab === 2 && (
								<>
									{this.state.giftCardSendTab === 1 && (
										<>
											<div data-component="CustomerComponent">
												<div className="row">
													<div className="col-md-12">
														<div className="tableRow">
															<div className="col">Sender Name</div>
															<div className="col text-center">Receiver Name</div>
															<div className="col text-center">Purchase</div>
															<div className="col text-center">Expiry</div>
															<div className="col text-center">Amount</div>
															<div className="col-1 text-center">Active</div>
															<div className="col-1 text-center">Redeem</div>
															<div className="col-1 text-end">View</div>
														</div>
													</div>
												</div>
												<div className="sticky-scroll scroll">
													{this.state.giftCardSend?.length === 0 && (
														<div className="error-message">No order Info</div>
													)}
													{this.state.giftCardSend?.map((p) => {
														return (
															<div className="row">
																<div className="col-md-12">
																	<div className="tableCell">
																		<div className="tableBody col pe-1 elip-text" title={p?.gift_cards?.sender_name}>{p?.gift_cards?.sender_name}</div>
																		<div className="col text-center px-2 elip-text" title={p?.gift_cards?.receiver_name}>
																			{p?.gift_cards?.receiver_name}
																		</div>
																		<div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.gift_cards?.created_at)}>
																			{this.convertDateStringToDate(p?.gift_cards?.created_at)}
																		</div>
																		<div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.gift_cards?.expire_date)}>
																			{this.convertDateStringToDate(p?.gift_cards?.expire_date)}
																		</div>
																		<div className="col text-center px-2 elip-text" title={p?.gift_cards?.gift_card_amount}>
																			{p?.gift_cards?.gift_card_amount}
																		</div>
																		<div className="col-1 text-center">
																			{p?.gift_cards?.is_active === true ? (
																				<CheckCircleOutlineOutlinedIcon className="check-icon" />
																			) : (
																				<CancelOutlinedIcon className="cancel-icon" />
																			)}
																		</div>
																		<div className="col-1 text-center">
																			{p?.gift_cards?.is_redeem === true ? (
																				<CheckCircleOutlineOutlinedIcon className="check-icon" />
																			) : (
																				<CancelOutlinedIcon className="cancel-icon" />
																			)}
																		</div>
																		<div className="col-1 text-end">
																			<RemoveRedEyeIcon
																				className="view-icon"
																				onClick={() => {
																					this.giftCardSendView(p?.gift_cards);
																				}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														);
													})}
												</div>
											</div>
											{this.state.totalGiftCardSendPage > 1 && (
												<div className="row">
													<div className="col-md-12 justify-content-between d-flex position-relative">
														<div className="pagiantion-category">
															<div>
																<Pagination
																	className="pagination pagi"
																	page={this.state.currentPageGiftCardSend}
																	count={this.state.totalGiftCardSendPage}
																	onChange={this.onPageChangeGiftCardSend}
																/>
															</div>
															<div
																className="position-absolute totalCount"
																style={{ right: 23, bottom: 5 }}
															>
																Total Gift Cards: {this.state.giftCardSendTotalProduct}
															</div>
														</div>
													</div>
												</div>
											)}
										</>
									)}
									{this.state.giftCardSendTab === 2 && (
										<>
											<div className="btn-save mt-4 row justify-content-start">
												<div
													className="Cancel-btn custom-btn"
													onClick={() => {
														this.setState({ giftCardSendTab: 1 });
													}}
												>
													<span>Back </span>
												</div>
											</div>
											<div className="row sticky-scroll scroll">
												<div className="col">
													<div className="row mt-4">
														<div className="col-md-4">
															<div className="login-form ">
																<label>
																	Sender's Name<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.sender_name}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's Name<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.receiver_name}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's Mobile No<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.receiver_mobile_no}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Receiver's E-Mail<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.receiver_email}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Occassion<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.occasion_type}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Message<span className="mandatory-star">*</span>
																</label>
																<textarea
																	cols="100"
																	rows="5"
																	type="text"
																	name="body"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.message}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Purchase Date<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.convertDateStringToDate(this.state.giftCardSendViewObj?.created_at)}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Expiry Date<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.convertDateStringToDate(this.state.giftCardSendViewObj?.expire_date)}
																/>
															</div>
															{
																this.state.giftCardSendViewObj?.is_redeem && (
																	<div className="login-form ">
																		<label>
																			Redeem Date<span className="mandatory-star">*</span>
																		</label>
																		<input
																			type="text"
																			name="asked_by"
																			readOnly={true}
																			value={this.convertDateStringToDate(this.state.giftCardSendViewObj?.redeem_date)}
																		/>
																	</div>
																)
															}
															<div className="login-form ">
																<label>
																	Gift Card Amount<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.gift_card_amount}
																/>
															</div>
															<div className="login-form ">
																<label>
																	Gift Card Code<span className="mandatory-star">*</span>
																</label>
																<input
																	type="text"
																	name="asked_by"
																	readOnly={true}
																	value={this.state.giftCardSendViewObj?.gift_card_code}
																/>
															</div>
															<div className="signup-check ">
																<Checkbox
																	size="small"
																	disabled
																	style={{ color: "#012169" }}
																	checked={this.state.giftCardSendViewObj?.is_active}
																/>
																<label>Active</label>
															</div>
															<div className="signup-check ">
																<Checkbox
																	size="small"
																	disabled
																	style={{ color: "#012169" }}
																	checked={this.state.giftCardSendViewObj?.is_redeem}
																/>
																<label>Redeemed</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										</>
									)}
								</>
							)}
						</>
					)
				}

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
							{this.state.active
								? " deactivate this customer"
								: "activate this customer"}
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
			</div >
		);
	}
}
