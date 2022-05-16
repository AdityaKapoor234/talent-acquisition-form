import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import SubscriptionList from "../../component/inquiry/subscription/subscription-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InquiryApi from "../../services/inquiry";
import { useRouter } from "next/router";


export default function Subscription() {

	const pathArr = useRouter();
	const [subscription, setSubscription] = useState([]);
	const [totalSubscription, setTotalSubscription] = useState([]);
	const [wordEntered, setWordEntered] = useState(
		pathArr.query?.q ? pathArr.query?.q : ""
	);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoader, setIsLoader] = useState(true);

	const handleKeyPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		if (event.key === "Enter") {
			Router.push({
				pathname: "/subscription",
				query: router_query_object,
			});
			setCurrentPage(1)
			subscriptionList(1, wordEntered);
		}
	};

	const handleClickPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		// if (event.key === "Enter") {
		Router.push({
			pathname: "/subscription",
			query: router_query_object,
		});
		setCurrentPage(1)
		subscriptionList(1, wordEntered);
		// }
	};

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/subscription",
				query: "",
			});
			subscriptionList(1, "");
		}
	};

	let onPageChange = function (e, page) {
		setCurrentPage(page)
		subscriptionList(page, wordEntered)
	};

	const subscriptionList = (page, search) => {
		setIsLoader(true);
		InquiryApi.subscriptionList(page, search)
			.then((response) => {
				setSubscription(response.data.data.list);
				setTotalSubscription(response.data.data.total);
				setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
				setIsLoader(false);
			})
			.catch((error) => {
				setIsLoader(false);
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
		subscriptionList(currentPage, "");
	}, []);


	return (
		<>
			<Head>
				<title>{APP_NAME} -NewsLetter Subscribers</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div className="row border-box">
						<div className="col-md-8">
							<div className="hamburger">
								<span>Customer / </span>NewsLetter Subscribers
							</div>
							<div className="page-name">NewsLetter Subscribers</div>
						</div>
						<div className="col-md-4">
							<div className="login-form ">
								<input
									type="text"
									placeholder="Search..."
									className="search-box"
									value={wordEntered}
									onChange={handleFilter}
									onKeyPress={handleKeyPress}
								/>
								<span onClick={handleClickPress}>
									<SearchIcon className="search-icon point-but" />
								</span>
							</div>
						</div>
					</div>
					<div className="row sticky-scroll scroll">
						<div className="col-md-12 ">
							{
								isLoader ? (
									<div className="row justify-content-center">
										<div className="col-md-12 loader-cart">
											<Box sx={{ display: "flex" }}>
												<CircularProgress
													style={{ color: "#F54A00" }}
												/>
											</Box>
										</div>
									</div>
								) : (
									<SubscriptionList subscription={subscription} subscriptionList={subscriptionList} currentPage={currentPage}/>
								)
							}



						</div>
					</div>
					<div className="row">
						<div className="col-md-12 justify-content-between d-flex position-relative">
							<div className="pagiantion-category">
								<div>
									<Pagination
										className="pagination pagi"
										page={currentPage}
										count={totalPage}
										onChange={onPageChange}
									/>
								</div>
								<div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
									Total Subscriptions: {totalSubscription}
								</div>
							</div>
						</div>
					</div>
				</DashboardLayoutComponent>
			</main>
			{/* </div> */}
		</>
	);
}
