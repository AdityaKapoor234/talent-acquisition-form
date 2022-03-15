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
import OrderApi from "../services/orders";
import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookie from "js-cookie";

export default function Dashboard() {

	const [customer, setCustomer] = useState([]);
	const [customerNo, setCustomerNo] = useState([]);
	const [orderStats, setOrderStats] = useState([]);
	const [order, setOrder] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const customerList = (page, search) => {
		CustomerApi.CustomerList(page, search)
			.then((response) => {
				setCustomer(response.data.data.list);
				setCustomerNo(response.data.data);
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
	function orderList(page, search, latest) {
		OrderApi.OrderList(page, search, latest)
			.then((response) => {
				setOrder(response.data.data.list);
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
		orderList(currentPage, "", "latest");
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
									<Link href="/order">
										<div className="col point-but mx-3" style={{ backgroundColor: "#AAE3E2" }}>
											<div className="icon"></div>
											<span className="iconInfo mt-3">
												{orderStats.today} Orders
											</span>
											<span className="iconPrice">₹ 0.00</span>
											<span className="iconInfo mb-3">Today</span>
										</div>
									</Link>
									<Link href="/order">
										<div className="col point-but mx-3" style={{ backgroundColor: "#FEC9FC" }}>
											<div className="icon"></div>
											<span className="iconInfo mt-3">
												{orderStats.last_seven_days} Orders
											</span>
											<span className="iconPrice">₹ 14970.00</span>
											<span className="iconInfo mb-3">Last 7 Days</span>
										</div>
									</Link>
									<Link href="/order">
										<div className="col point-but mx-3" style={{ backgroundColor: "#B0E9FC" }}>
											<div className="icon"></div>
											<span className="iconInfo mt-3">
												{orderStats.total} Orders
											</span>
											<span className="iconPrice">₹ 33873.00</span>
											<span className="iconInfo mb-3">Total</span>
										</div>
									</Link>
									<Link href="/customer">
										<div className="col point-but mx-3" style={{ backgroundColor: "#FFEADE" }}>
											<div className="icon2"></div>
											<span className="iconInfo mt-3">Customers</span>
											<span className="iconPrice">{customerNo.total}</span>
											<span className="iconInfo mb-3"></span>
										</div>
									</Link>
								</div>

								<div className="row my-4">
									<div className="col">
										<OrderComponent order={order} />
									</div>
									<div className="col">
										<SignUpComponent customer={customer} />
									</div>
								</div>
							</div>
						</div>
					</div>

				</DashboardLayoutComponent>
			</main>
		</div>
	);
}
