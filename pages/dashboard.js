import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import { APP_NAME } from "../utils/constant";
import { useState, useEffect } from "react";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import OrderComponent from "../component/dashboard/order";
import OrderPaymentStatusComponent from "../component/dashboard/orderPayment"
import SignUpComponent from "../component/dashboard/signup";
import SalesTrendComponent from "../component/dashboard/salesTrend"
import TopSearchTermsComponent from "../component/dashboard/topSearchTerms"
import TopSoldProductsComponent from "../component/dashboard/topSoldProducts"
import TotalPageVisitComponent from "../component/dashboard/totalPageVisit";
import UniquePageVisitComponent from "../component/dashboard/uniquePageVisit";
import OrderStatusDetailsComponent from "../component/dashboard/orderStatusDetails";
import CustomerApi from "../services/customer";
import DashboardApi from "../services/dashboard";
import OrderApi from "../services/orders";
import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookie from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Dashboard() {

	const [customer, setCustomer] = useState([]);
	const [customerNo, setCustomerNo] = useState([]);
	const [orderStats, setOrderStats] = useState([]);
	const [orderStatsDetails, setOrderStatsDetails] = useState([]);
	const [orderPriceStats, setOrderPriceStats] = useState([]);
	const [order, setOrder] = useState([]);
	const [topSearchTerms, setTopSearchTerms] = useState([]);
	const [topSoldProduct, setTopSoldProduct] = useState([]);
	const [salesTrend, setSalesTrend] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoader, setLoader] = useState(false);

	const customerList = (page, search) => {
		setLoader(true);
		CustomerApi.CustomerList(page, search)
			.then((response) => {
				setCustomer(response.data?.data?.list);
				setCustomerNo(response.data?.data);
				setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
				setLoader(false);
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
		setLoader(true);
		DashboardApi.OrderStats()
			.then((response) => {
				setOrderStats(response.data.data?.stats?.orders);
				setOrderPriceStats(response.data.data?.stats?.price);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);

			});
	};
	function orderList(page, search, latest, limit) {
		setLoader(true);
		OrderApi.OrderList(page, search, latest, limit)
			.then((response) => {
				setOrder(response.data.data.list);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);

			});
	};
	function orderPaymentStats() {
		setLoader(true);
		DashboardApi.OrderPaymentStats()
			.then((response) => {
				setOrderStatsDetails(response.data.data?.stats);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);

			});
	};
	function topSearchTerm() {
		setLoader(true);
		DashboardApi.TopSearchTerms()
			.then((response) => {
				setTopSearchTerms(response.data.data?.top_serach);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);

			});
	};
	function salesTrendGraph() {
		setLoader(true);
		DashboardApi.SalesTrendGraph()
			.then((response) => {
				setSalesTrend(response.data.data?.sales_trend);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);

			});
	};
	function topSoldProductGraph() {
		setLoader(true);
		DashboardApi.TopSoldProductGraph()
			.then((response) => {
				setTopSoldProduct(response.data.data?.top_sold);
				setLoader(false);
			})
			.catch((error) => {
				setLoader(false);
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
		orderList(currentPage, "", "latest", 5);
		orderPaymentStats();
		topSearchTerm();
		salesTrendGraph();
		topSoldProductGraph();
	}, []);

	return (
		<div>
			<Head>
				<title>{APP_NAME} - Dashboard</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div page-component="Dashboard">
						<div className="container-fluid">
							{isLoader &&
								<div className="row justify-content-center">
									<div className="col-md-12 loader-cart">
										<Box sx={{ display: "flex" }}>
											<CircularProgress
												style={{ color: "#F54A00" }}
											/>
										</Box>
									</div>
								</div>
							}
							{isLoader === false &&
								<div className="sticky-scroll scroll">
									<div className="row">
										<Link href="/order">
											<div className="col point-but mx-3" style={{ backgroundColor: "#AAE3E2" }}>
												<div className="icon"></div>
												<span className="iconInfo mt-3">
													{orderStats?.today} Orders
												</span>
												<span className="iconPrice">₹&nbsp;{orderPriceStats?.today_total_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',') === undefined ? <span>0.00</span> : orderPriceStats?.today_total_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
												<span className="iconInfo mb-3">Today</span>
											</div>
										</Link>
										<Link href="/order">
											<div className="col point-but mx-3" style={{ backgroundColor: "#FEC9FC" }}>
												<div className="icon"></div>
												<span className="iconInfo mt-3">
													{orderStats?.last_seven_days} Orders
												</span>
												<span className="iconPrice">₹&nbsp;{orderPriceStats?.last_seven_days_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',') === undefined ? <span>0.00</span> : orderPriceStats?.last_seven_days_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
												<span className="iconInfo mb-3">Last 7 Days</span>
											</div>
										</Link>
										<Link href="/order">
											<div className="col point-but mx-3" style={{ backgroundColor: "#B0E9FC" }}>
												<div className="icon"></div>
												<span className="iconInfo mt-3">
													{orderStats?.total} Orders
												</span>
												<span className="iconPrice">₹&nbsp;{orderPriceStats?.total_order_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',') === undefined ? <span>0.00</span> : orderPriceStats?.total_order_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
												<span className="iconInfo mb-3">Total</span>
											</div>
										</Link>
										<Link href="/customer">
											<div className="col point-but mx-3" style={{ backgroundColor: "#FFEADE" }}>
												<div className="icon2"></div>
												<span className="iconInfo mt-3">Customers</span>
												<span className="iconPrice">{customerNo?.total}</span>
												<span className="iconInfo mb-3"></span>
											</div>
										</Link>
									</div>

									<div className="row my-4">
										<div className="col-6">
											<OrderComponent order={order} />
										</div>
										<div className="col-6">
											<OrderPaymentStatusComponent orderStatsDetails={orderStatsDetails} />
										</div>
									</div>
									<div className="row my-4">
										<div className="col-6">
											<SignUpComponent customer={customer} />
										</div>
										<div className="col-6">
											<SalesTrendComponent salesTrend={salesTrend} />
										</div>
									</div>
									<div className="row my-4">
										<div className="col-6">
											<TopSearchTermsComponent topSearchTerms={topSearchTerms} />
										</div>
										<div className="col-6">
											<TopSoldProductsComponent topSoldProduct={topSoldProduct} />
										</div>
									</div>
									{/* <div className="row my-4">
										<div className="col-6">
											<TotalPageVisitComponent />
										</div>
										<div className="col-6">
											<UniquePageVisitComponent />
										</div>
									</div> */}
									<div className="row my-4">
										<div className="col-12">
											<OrderStatusDetailsComponent orderStatsDetails={orderStatsDetails} />
										</div>
									</div>
								</div>}
						</div>
					</div>

				</DashboardLayoutComponent>
			</main>
		</div>
	);
}
