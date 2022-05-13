import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class CancelList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: props?.order,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.order !== nextProps.order) {
			return {
				order: nextProps?.order,
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
			<div data-component="CustomerComponent">
				<div className="row">
					<div className="col-md-12">
						<div className="tableRow">
							<div className="col-1 pe-1">Ref No</div>
							<div className="col px-2 text-center">Order No</div>
							<div className="col-3 px-2 text-center">Date</div>
							<div className="col-1 text-end">View</div>
						</div>
					</div>
				</div>
				{
				this.state.order && this.state.order?.length === 0 ? <div className="not-found">No Data Found</div> :
					this.state.order?.map((p, index) => {
						return (
							<div className="row" key={index}>
								<div className="col-md-12">
									<div className="tableCell">
										<div className="tableBody pe-1 col-1 elip-text" title={p?.id}>{p?.id}</div>
										<div className="col px-2 text-center elip-text" title={p?.order_no}>{p?.order_no}</div>
										<div className="col-3 px-2 text-center elip-text" title={p?.created_at}>
											{this.convertDateStringToDate(p?.created_at)}
										</div>
										<div className="col-1 text-end">
											<RemoveRedEyeIcon
												className="view-icon"
												onClick={() => {
													Router.push(`/order/${p?.order_no}/view`);
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})
                    
                    }
			</div>
		);
	}
}
