import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerList from "../../component/customer/customer-list";
import XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CustomerApi from "../../services/customer";
import ExcelApi from "../../services/excel-export";
import { useRouter } from "next/router";

export default function Customer() {
	const pathArr = useRouter();
	const [customer, setCustomer] = useState([]);
	const [customerExcel, setCustomerExcelList] = useState([]);
	const [totalCustomer, setTotalCustomer] = useState([]);
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
				pathname: "/customer",
				query: router_query_object,
			});
			setCurrentPage(1)
			customerList(1, wordEntered);
		}
	};

	const handleClickPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		Router.push({
			pathname: "/customer",
			query: router_query_object,
		});
		setCurrentPage(1)
		customerList(1, wordEntered);
	};

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/customer",
				query: "",
			});
			customerList(1, "");
		}
	};

	let onPageChange = function (e, page) {
		setCurrentPage(page)
		customerList(page, wordEntered)
	};

	const handleOnExport = () => {
        var XLSX = require("xlsx");
        var wb=XLSX.utils.book_new();
        var ws=XLSX.utils.json_to_sheet(customerExcel);

        XLSX.utils.book_append_sheet(wb,ws,"CustomerList");

        XLSX.writeFile(wb, "Customer List.xlsx");
    };


	const customerList = (page, search) => {
		setIsLoader(true);
		CustomerApi.CustomerList(page, search)
			.then((response) => {
				setCustomer(response.data.data.list);
				setTotalCustomer(response.data.data);
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


	const customerExcelList = () => {
		setIsLoader(true);
		ExcelApi.CustomerExcelList()
			.then((response) => {
				setCustomerExcelList(response.data.data.list);
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
		customerList(currentPage, "");
		customerExcelList();
	}, []);
	return (
		<div>
			<div page-component="category-page">
				<Head>
					<title>{APP_NAME} - Customer</title>
					<meta name="description" content="Trusted Brands. Better Health." />
					<link rel="icon" href="/fitcart.ico" />
				</Head>

				<main>
					<DashboardLayoutComponent>
						<div className="row border-box">
							<div className="col-md-6">
								<div className="hamburger">
									<span>customer / </span>customer
								</div>
								<div className="page-name">Customer</div>
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
									<SearchIcon className="search-icon point-but" onClick={handleClickPress} />
								</div>
							</div>
							<div className="col-md-2 btn-save">
								<div className="custom-btn ">
									<span
										onClick={handleOnExport}
										className="d-flex"
									>
										Download&nbsp;<FileDownloadIcon />
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
										// customer && customer.length === 0 ? <div className="not-found">No Data Found</div> :
											<CustomerList customer={customer} />
									)
								}

							</div>
						</div>
						{/* <div className="row">
            <div className="col-md-12">
              <div className="pagiantion-category">
                <Pagination
                  className="pagination"
                  page={currentPage}
                  count={totalPage}
                  onChange={onPageChange}
                />
              </div>
            </div>
          </div> */}
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
										Total Customers: {totalCustomer.total}
									</div>
								</div>
							</div>
						</div>

					</DashboardLayoutComponent>
				</main>
			</div>
		</div>
	);
}
