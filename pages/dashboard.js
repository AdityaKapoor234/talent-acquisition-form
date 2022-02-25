import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import { APP_NAME } from "../utils/constant";
import { useState, useEffect } from "react";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import OrderComponent from "../component/dashboard/order";
import SignUpComponent from "../component/dashboard/signup";
import OrderStatusComponent from "../component/dashboard/order-status";
import Router from "next/router";
import Cookie from "js-cookie";

const orders = [
	{
		order: "10109",
		custName: "Jaimik",
		grandTotal: "₹5000",
	},
	{
		order: "10109",
		custName: "Ravi",
		grandTotal: "₹5000",
	},
	{
		order: "10109",
		custName: "Jaimik",
		grandTotal: "₹5000",
	},
	{
		order: "10109",
		custName: "Jaimik",
		grandTotal: "₹5000",
	},
	{
		order: "10109",
		custName: "Fitcart Test",
		grandTotal: "₹5000",
	},
]

const signups = [
	{
		name: "Jaimik",
		email: "Jaimik@123@gmail.com",
		regDate: "17/01/2022"
	},
	{
		name: "Ravi",
		email: "Jaimik@123@gmail.com",
		regDate: "17/01/2022"
	},
	{
		name: "Jaimik",
		email: "Jaimik@123@gmail.com",
		regDate: "17/01/2022"
	},
	{
		name: "Jaimik",
		email: "Jaimik@123@gmail.com",
		regDate: "17/01/2022"
	},
	{
		name: "Fitcart Test",
		email: "Jaimik@123@gmail.com",
		regDate: "17/01/2022"
	},
]

const orderStatus = [
	{
		status: "Pending Payment",
		today: "₹0.00",
		thisWeek: "₹0.00",
		thisMonth: "₹21970.00",
		thisYear: "₹21970.00",
		allTime: "₹93075.00",
	},
	{
		status: "Not Yet Dispatched",
		today: "₹0.00",
		thisWeek: "₹0.00",
		thisMonth: "₹21970.00",
		thisYear: "₹21970.00",
		allTime: "₹93075.00",
	},
	{
		status: "Shipped",
		today: "₹0.00",
		thisWeek: "₹0.00",
		thisMonth: "₹21970.00",
		thisYear: "₹21970.00",
		allTime: "₹93075.00",
	},
]

export default function Dashboard() {
	useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
	}, []);

	return (
		<div>
			<Head>
				<title>{APP_NAME} - Dashborad</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div page-component="Dashboard">
						<div className="container-fluid sticky-scroll scroll">
							<div className="row">
								<div className="col mx-3" style={{ backgroundColor: "#AAE3E2" }}>
									<div className="icon"></div>
									<span className="iconInfo mt-3">0 Orders</span>
									<span className="iconPrice">₹ 0.00</span>
									<span className="iconInfo mb-3">Today</span>
								</div>
								<div className="col mx-3" style={{ backgroundColor: "#FEC9FC" }}>
									<div className="icon"></div>
									<span className="iconInfo mt-3">02 Orders</span>
									<span className="iconPrice">₹ 14970.00</span>
									<span className="iconInfo mb-3">Last 7 Days</span>
								</div>
								<div className="col mx-3" style={{ backgroundColor: "#B0E9FC" }}>
									<div className="icon"></div>
									<span className="iconInfo mt-3">10 Orders</span>
									<span className="iconPrice">₹ 33873.00</span>
									<span className="iconInfo mb-3">Total</span>
								</div>
								<div className="col mx-3" style={{ backgroundColor: "#FFEADE" }}>
									<div className="icon2"></div>
									<span className="iconInfo mt-3">Customers</span>
									<span className="iconPrice">45</span>
									<span className="iconInfo mb-3"></span>
								</div>
							</div>
							<div className="row my-4">
								<div className="col">
									<OrderComponent orders={orders} />
								</div>
								<div className="col">
									<SignUpComponent signups={signups} />
								</div>
							</div>
							<div className="row my-4">
								<div className="col-12">
									<OrderStatusComponent orderStatus={orderStatus} />
								</div>
							</div>
						</div>
					</div>

				</DashboardLayoutComponent>
			</main>
		</div>
	);
}
