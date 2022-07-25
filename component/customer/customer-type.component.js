import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import { CheckCircleOutline } from "@mui/icons-material";

export default class CustomerType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: props?.list,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.list !== nextProps.list
		) {
			return {
				list: nextProps?.list
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

	render() {
		return (
			<div data-component="CustomerComponent">
				<div className="row">
					<div className="col-md-12">
						<div className="tableRow">
							<div className="col-7 pe-1">Name</div>
							<div className="col-2 px-2 text-center">Display Order</div>
							<div className="col-2 px-2 text-center">Active</div>
							<div className="col-1 text-end">Action</div>
						</div>
					</div>
				</div>



				{this.state.list?.map((ele, index) => {
					return (
						<div className="row" key={index}>
							<div className="col-md-12">
								<div className="tableCell">


									<div className="tableBody  col-7  elip-text ">
										{ele.user_type}
									</div>
									<div className="col-2  text-center elip-text">{ele.sort_order}</div>
									<div className="col-2  text-center elip-text ">{ele.is_active ? <CheckCircleOutline className="check-icon" /> : <CancelOutlinedIcon className="cancel-icon" />}</div>
									<div className="col-1 text-end">
										<EditOutlinedIcon className="edit-icon" onClick={() => {
											Router.push(`/customer-type/${ele?.id}/edit`);
										}} />
									</div>
								</div>
							</div>
						</div>

					)
				})}

			</div>
		);
	}
}
