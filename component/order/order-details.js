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
						</div>
					</div>
				</div>
				{this.state.tab === 1 && (
					<>
						{/* {this.state.mode === "edit" && (
							<div className="row mt-4">
								<div className="col-md-4"> */}
									{/* <div className="login-form ">
                    <label>Order Type</label>
                    <input type="text" value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value})}} />
                  </div> */}
									{/* <div className="login-form ">
										<label>Name</label>
										<input
											type="text"
											value={this.state.order?.name}
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>Email</label>
										<input
											type="text"
											value={this.state.order?.email}
											readOnly={true}
										/>
									</div>
									<div className="login-form ">
										<label>Mobile</label>
										<input
											type="number"
											value={this.state.order?.phone_number}
											readOnly={true}
										/>
									</div>
									<div className="signup-check">
										<Checkbox
											size="small"
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
						)} */}
						{this.state.mode === "view" && (
							<div className="row mt-4">
								<div className="col-md-4">
									{/* <div className="login-form ">
                    <label>Order Type</label>
                    <input
                      type="text"
                      readOnly={true}
                      value={this.state.type}
                    />
                  </div> */}
									<div className="login-form ">
										<label>Name</label>
										<input
											type="text"
											readOnly={true}
											value={this.state.order?.name}
										/>
									</div>
									<div className="login-form ">
										<label>Email</label>
										<input
											type="text"
											readOnly={true}
											value={this.state.order?.email}
										/>
									</div>
									<div className="login-form ">
										<label>Mobile</label>
										<input
											type="number"
											readOnly={true}
											value={this.state.order?.phone_number}
										/>
									</div>
									<div className="signup-check">
										<Checkbox
											size="small"
											disabled
											style={{ color: "#012169" }}
											checked={this.state.active}
										/>
										<label>Active</label>
									</div>
								</div>
							</div>
						)}
					</>
				)}
				{this.state.tab === 2 && (
					<div className="row mt-4">
						{this.state.order?.addressInfo?.map((p) => {
							return (
								<div className="col-3">
									<div className="complete-address">
										<div className="name">{p?.name}</div>
										<div className="address">{p?.address}</div>
										<div className="number">{p?.phone_number}</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
				{this.state.tab === 3 && (
					<>
						<div data-component="CustomerComponent">
							<div className="row">
								<div className="col-md-12">
									<div className="tableRow">
										<div className="col">Order#</div>
										<div className="col text-center">Date</div>
										<div className="col text-center">Status</div>
										<div className="col-3 text-center">Shipment Method</div>
										<div className="col text-center">Total</div>
										<div className="col-1 text-center">Active</div>
										<div className="col-1 text-end">View</div>
									</div>
								</div>
							</div>
							<div className="scroll-table scroll">
								<div className="error-message">No order Info</div>
								{/* {order?.map((p) => {
                  return (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="tableCell">
                          <div className="tableBody col">1011</div>
                          <div className="col text-center">28/01/2022</div>
                          <div className="tableBody col justify-content-center">
                            Shipped
                          </div>
                          <div className="col-3 text-center">COD</div>
                          <div className="col text-center">₹1000.00</div>
                          <div className="col-1 text-center">
                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                          </div>
                          <div className="col-1 text-end">
                            <RemoveRedEyeIcon className="view-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
							</div>
						</div>
						{/* <div className="pagination">
              <Pagination
                count={10}
                showFirstButton
                showLastButton
                size="small"
                color="primary"
              />
            </div> */}
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
			</div>
		);
	}
}