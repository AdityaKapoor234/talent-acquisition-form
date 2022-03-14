import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import { APP_NAME } from "../utils/constant";
import { useState, useEffect } from "react";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import OrderComponent from "../component/dashboard/order";
import SignUpComponent from "../component/dashboard/signup";
import CustomerApi from "../services/customer";
import DashboardApi from "../services/dashboard";
import OrderStatusComponent from "../component/dashboard/order-status";
import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
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


	const [customer, setCustomer] = useState([]);
	const [orderStats, setOrderStats] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const customerList = (page, search) => {
		CustomerApi.CustomerList(page, search)
			.then((response) => {
				setCustomer(response.data.data.list);
				setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
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
	function dashboardStats() {
		DashboardApi.OrderStats()
			.then((response) => {
				setOrderStats(response.data.data.stats.orders);
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
	useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
		customerList(currentPage, "");
		dashboardStats();
	}, []);

	return (
		<div>
			<Head>
				<title>{APP_NAME} - Dashboard</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div page-component="Dashboard">
						<div className="container-fluid">
							<div className="sticky-scroll scroll">
								<div className="row">
									<div className="col mx-3" style={{ backgroundColor: "#AAE3E2" }}>
										<div className="icon"></div>
										<span className="iconInfo mt-3">
											{orderStats.today} Orders
										</span>
										<span className="iconPrice">₹ 0.00</span>
										<span className="iconInfo mb-3">Today</span>
									</div>
									<div className="col mx-3" style={{ backgroundColor: "#FEC9FC" }}>
										<div className="icon"></div>
										<span className="iconInfo mt-3">
											{orderStats.last_seven_days} Orders
										</span>
										<span className="iconPrice">₹ 14970.00</span>
										<span className="iconInfo mb-3">Last 7 Days</span>
									</div>
									<div className="col mx-3" style={{ backgroundColor: "#B0E9FC" }}>
										<div className="icon"></div>
										<span className="iconInfo mt-3">
											{orderStats.total} Orders
										</span>
										<span className="iconPrice">₹ 33873.00</span>
										<span className="iconInfo mb-3">Total</span>
									</div>
									<Link href="/customer">
										<div className="col mx-3" style={{ backgroundColor: "#FFEADE" }}>
											<div className="icon2"></div>
											<span className="iconInfo mt-3">Customers</span>
											<span className="iconPrice">45</span>
											<span className="iconInfo mb-3"></span>
										</div>
									</Link>
								</div>

								<div className="row my-4">
									<div className="col">
										<OrderComponent orders={orders} />
									</div>
									<div className="col">
										<SignUpComponent customer={customer} />
									</div>
								</div>
								{/* <div className="row my-4">
									<div className="col-12">
										<OrderStatusComponent orderStatus={orderStatus} />
									</div>
								</div> */}
							</div>
						</div>
					</div>

				</DashboardLayoutComponent>
			</main>
		</div>
	);
}