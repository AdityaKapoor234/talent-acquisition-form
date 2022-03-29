import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default class OrderDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props?.order?.is_active ? props?.order?.is_active : false,
			tab: 1,
			order: props?.order,
			mode: props?.mode,
			open: false,
		};
	}
	handleChange = (event) => {
		let input = this.state.input;
		input[event.target.name] = event.target.value;
		this.setState({ input });
		this.props?.handle(input);
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
		} else {
			this.setState({
				active: true,
				open: false,
			});
			this.props?.active(true);
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.order !== nextProps.order ||
			prevState.mode !== nextProps.mode
		) {
			return {
				order: nextProps?.order,
				mode: nextProps?.mode,
				active: nextProps?.order?.is_active
					? nextProps?.order?.is_active
					: false,
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
		let str =
			date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		return str;
	};




	render() {
		return (
			<div data-component="view-order">
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
								Order info
							</div>
						</div>
					</div>
				</div>
				{this.state.tab === 1 && (
					<>
						{this.state.mode === "edit" && (
							<>
								<div className="row mt-4">
									<div className="col">
										<div className="div-box row">
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Order No.&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.order?.order_no}>{this.state.order?.order?.order_no}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Order Date&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Name&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.billing_address?.recipient_name}>{this.state.order?.billing_address?.recipient_name}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Contact No.&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Email&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.email}>{this.state.order?.email}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Billing Address</span>
												</span>
												<span className="orderLine2">
													<span className="orderInfoVal">
														{this.state.order?.billing_address?.flat_no}&nbsp;
														{this.state.order?.billing_address?.locality}&nbsp;
														{this.state.order?.billing_address?.landmark}&nbsp;
														{this.state.order?.billing_address?.state}<br />
														{this.state.order?.billing_address?.city}&nbsp;
														{this.state.order?.billing_address?.pin_code}
													</span>
												</span>
												<span className="orderLine mt-3">
													<span className="orderInfoVal">{this.state.order?.billing_address?.recipient_phone_number}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Delivery Address</span>
												</span>
												<span className="orderLine2">
													<span className="orderInfoVal2">
														{this.state.order?.shipping_address?.flat_no}&nbsp;
														{this.state.order?.shipping_address?.locality}&nbsp;
														{this.state.order?.shipping_address?.landmark}&nbsp;
														{this.state.order?.shipping_address?.state}<br />
														{this.state.order?.shipping_address?.city}&nbsp;
														{this.state.order?.shipping_address?.pin_code}
													</span>
												</span>
												<span className="orderLine mt-3">
													<span className="orderInfoVal">{this.state.order?.shipping_address?.recipient_phone_number}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Status&nbsp;</span>
													<Select
														disableUnderline
														variant="standard"
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="parent_id"
														onChange={this.handleChange}
														className="sort-by-select"
														value={this.state.order?.order?.id}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select Status{" "}
														</MenuItem>
														<MenuItem
															value="0"
															className="field_toggle_checked"
														>
															Order Status{" "}
														</MenuItem>
														{this.state.parentCategory?.map(value => {
															return (
																<MenuItem value={value?.id}>{value?.name}</MenuItem>
															)
														})}
													</Select>

													<span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status}>{this.state.order?.order?.status}</span>
													{/* <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status}>{this.state.order?.order?.status}</span> */}

												</span>

											</div>
										</div>


										<div data-component="CustomerComponent">
											<div className="tableRow row py-3">
												<div className="col-6">Product</div>
												<div className="col-2 text-center">Quantity</div>
												<div className="col-2 text-center">Price</div>
												<div className="col-2 text-center">Amount</div>
											</div>
										</div>


										{
											this.state.order?.products?.map((p, index) => {
												return (
													<>
														<div className="div-box row mb-2" key={index}>
															<div className="col-6">
																<div className="row">
																	<div className="col-3">
																		{/* <div
																		style={
																			{
																				backgroundImage: `url(${p?.image})`,
																				backgroundSize: "cover",
																				borderRadius: "0px",
																				backgroundPosition: "center",
																				// height: "7rem",
																				// width: "6rem",
																			}
																		}
																		className="orderImg"
																		alt=""></div> */}
																		<img src={p?.image} className="orderImg" alt="" />
																	</div>
																	<div className="col-9">
																		<span className="orderLine">
																			<span className="orderInfo elip-text" title={p?.name}>{p?.name}</span>
																		</span>
																		<span className="orderLine mt-4">
																			<span className="orderInfoValQuant elip-text">{p?.quantity} Kg</span>
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-2">
																<span className="orderLine justify-content-center d-flex">
																	<span className="orderInfoVal">Order Qty: {p?.quantity}</span>
																</span>
																<span className="orderLine justify-content-center d-flex">
																	<span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
																</span>

															</div>
															<div className="col-2 justify-content-center d-flex">
																<span className="orderLine">
																	<span className="orderInfoVal">₹ {p?.unit_price}</span>
																</span>

															</div>
															<div className="col-2  justify-content-center d-flex">
																<span className="orderLine">
																	<span className="orderInfoVal">₹ {parseFloat(p?.quantity) * parseFloat(p?.unit_price)}</span>
																</span>

															</div>

														</div>
													</>
												)
											})}

										<div className="div-box row mb-2">
											<div className="col-12">
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Sub Total</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title={this.state.order?.total_price}>₹ {this.state.order?.total_price}</span>
													</div>
												</div>
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Shipping Charges</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title="0.00">₹ 0.00</span>
													</div>
												</div>
												{/* <div className="col-11 textRight">
											<span className="orderInfo">Tax</span>
										</div>
										<div className="col-1">
											<span className="orderInfoVal">abc</span>
										</div>
										<div className="col-11 textRight">
											<span className="orderInfo">Round Off</span>
										</div>
										<div className="col-1">
											<span className="orderInfoVal">abc</span>
										</div> */}
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Grand Total</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title={this.state.order?.total_price}>₹ {this.state.order?.total_price}</span>
													</div>
												</div>
											</div>
										</div>



									</div>
								</div>
							</>
						)}


						{this.state.mode === "view" && (
							<>
								<div className="row mt-4">
									<div className="col">
										{/* <div className="container"> */}
										<div className="div-box row">
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Order No.&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.order?.order_no}>{this.state.order?.order?.order_no}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Order Date&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Name&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.billing_address?.recipient_name}>{this.state.order?.billing_address?.recipient_name}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Contact No.&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
												</span>
												<span className="orderLine">
													<span className="orderInfo">Email&nbsp;</span>
													<span className="orderInfoVal elip-text" title={this.state.order?.email}>{this.state.order?.email}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Billing Address</span>
												</span>
												<span className="orderLine2">
													<span className="orderInfoVal">
														{this.state.order?.billing_address?.flat_no}&nbsp;
														{this.state.order?.billing_address?.locality}&nbsp;
														{this.state.order?.billing_address?.landmark}&nbsp;
														{this.state.order?.billing_address?.state}<br />
														{this.state.order?.billing_address?.city}&nbsp;
														{this.state.order?.billing_address?.pin_code}
													</span>
												</span>
												<span className="orderLine mt-3">
													<span className="orderInfoVal">{this.state.order?.billing_address?.recipient_phone_number}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Delivery Address</span>
												</span>
												<span className="orderLine2">
													<span className="orderInfoVal2">
														{this.state.order?.shipping_address?.flat_no}&nbsp;
														{this.state.order?.shipping_address?.locality}&nbsp;
														{this.state.order?.shipping_address?.landmark}&nbsp;
														{this.state.order?.shipping_address?.state}<br />
														{this.state.order?.shipping_address?.city}&nbsp;
														{this.state.order?.shipping_address?.pin_code}
													</span>
												</span>
												<span className="orderLine mt-3">
													<span className="orderInfoVal">{this.state.order?.shipping_address?.recipient_phone_number}</span>
												</span>

											</div>
											<div className="col-3">
												<span className="orderLine">
													<span className="orderInfo">Status&nbsp;</span>
													<span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status}>{this.state.order?.order?.status}</span>
												</span>

											</div>
										</div>


										<div data-component="CustomerComponent">
											<div className="tableRow row py-3">
												<div className="col-6">Product</div>
												<div className="col-2 text-center">Quantity</div>
												<div className="col-2 text-center">Price</div>
												<div className="col-2 text-center">Amount</div>
											</div>
										</div>


										{
											this.state.order?.products?.map((p, index) => {
												return (
													<>
														<div className="div-box row mb-2" key={index}>
															<div className="col-6">
																<div className="row">
																	<div className="col-3">
																		{/* <div
																		style={
																			{
																				backgroundImage: `url(${p?.image})`,
																				backgroundSize: "cover",
																				borderRadius: "0px",
																				backgroundPosition: "center",
																				// height: "7rem",
																				// width: "6rem",
																			}
																		}
																		className="orderImg"
																		alt=""></div> */}
																		<img src={p?.image} className="orderImg" alt="" />
																	</div>
																	<div className="col-9">
																		<span className="orderLine">
																			<span className="orderInfo elip-text" title={p?.name}>{p?.name}</span>
																		</span>
																		<span className="orderLine mt-4">
																			<span className="orderInfoValQuant elip-text">{p?.quantity} Kg</span>
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-2">
																<span className="orderLine justify-content-center d-flex">
																	<span className="orderInfoVal">Order Qty: {p?.quantity}</span>
																</span>
																<span className="orderLine justify-content-center d-flex">
																	<span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
																</span>

															</div>
															<div className="col-2 justify-content-center d-flex">
																<span className="orderLine">
																	<span className="orderInfoVal">₹ {p?.unit_price}</span>
																</span>

															</div>
															<div className="col-2  justify-content-center d-flex">
																<span className="orderLine">
																	<span className="orderInfoVal">₹ {parseFloat(p?.quantity) * parseFloat(p?.unit_price)}</span>
																</span>

															</div>

														</div>
													</>
												)
											})}

										<div className="div-box row mb-2">
											<div className="col-12">
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Sub Total</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title={this.state.order?.total_price}>₹ {this.state.order?.total_price}</span>
													</div>
												</div>
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Shipping Charges</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title="0.00">₹ 0.00</span>
													</div>
												</div>
												{/* <div className="col-11 textRight">
											<span className="orderInfo">Tax</span>
										</div>
										<div className="col-1">
											<span className="orderInfoVal">abc</span>
										</div>
										<div className="col-11 textRight">
											<span className="orderInfo">Round Off</span>
										</div>
										<div className="col-1">
											<span className="orderInfoVal">abc</span>
										</div> */}
												<div className="row">
													<div className="col-11 textRight">
														<span className="orderInfo">Grand Total</span>
													</div>
													<div className="col-1">
														<span className="orderInfoVal elip-text" title={this.state.order?.total_price}>₹ {this.state.order?.total_price}</span>
													</div>
												</div>
											</div>
										</div>



									</div>
								</div>
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
								? " deactivate this order"
								: "activate this order"}
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