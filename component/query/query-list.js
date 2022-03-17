import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class QueryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: props?.query,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.query !== nextProps.query) {
			return {
				query: nextProps?.query,
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
							<div className="col-1">Date</div>
							<div className="col-5 text-center">Subject</div>
							<div className="col-3 text-center">Body</div>
							<div className="col-2 text-center">Sent To</div>
							<div className="col-1 text-center">View</div>
						</div>
					</div>
				</div>
				{this.state.query && this.state.query.length === 0 ? <div className="not-found">No Data Found</div> :
					this.state.query?.map((p, index) => {
						return (
							<div className="row" key={index}>
								<div className="col-md-12">
									<div className="tableCell">
										<div className="tableBody col-1 elip-text" title={this.convertDateStringToDate(p?.submitted_at)}>{this.convertDateStringToDate(p?.submitted_at)}</div>
										<div className="col-5 text-center elip-text" title={p?.subject}>{p?.subject}</div>
										<div className="col-3 text-center elip-text" title={p?.body}>
											{/* {p?.expert?.expertises?.map((p) => p?.name)?.join(" , ")} */}
											{p?.body}
										</div>
										<div className="col-2 text-center" title={p?.expert?.name}>
											<span 
											className="point-but"
											onClick={() => {
												Router.push(`/ask-the-pros/${p?.expert?.id}/view`);
											}}
											>
												{p?.expert?.name}
											</span>
										</div>
										<div className="col-1 text-center">
											<RemoveRedEyeIcon
												className="view-icon"
												onClick={() => {
													Router.push(`/query/${p?.id}/view`);
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}
