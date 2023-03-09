import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ProductList from "../../component/catalog/product/product-list";
import XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductApi from "../../services/product";
import ExcelApi from "../../services/excel-export";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Product() {

	const pathArr = useRouter();
	const [product, setProduct] = useState([]);
	const [productExcel, setProductExcel] = useState([]);
	const [totalProducts, setTotalProduct] = useState([]);
	const [wordEntered, setWordEntered] = useState(
		pathArr.query?.q ? pathArr.query?.q : ""
	);
	const [filter, setFilter] = useState("all");
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
				pathname: "/product",
				query: router_query_object,
			});
			setCurrentPage(1)
			if (filter === "all") {
				productList(1, wordEntered, "");
			} else {
				productList(1, wordEntered, filter);
			}
		}
	};

	const handleClickPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		Router.push({
			pathname: "/product",
			query: router_query_object,
		});
		setCurrentPage(1);
		if (filter === "all") {
			productList(1, wordEntered, "");
		} else {
			productList(1, wordEntered, filter);
		}
	};

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/product",
				query: "",
			});
			if (filter === "all") {
				productList(1, "", "");
			} else {
				productList(1, "", filter);
			}
		}
	};

	let onPageChange = function (e, page) {
		setCurrentPage(page)
		if (filter === "all") {
			productList(page, wordEntered, "");
		} else {
			productList(page, wordEntered, filter);
		}
	};

	const handleFilterChange = (value) => {
		setFilter(value);
		if (value === "all") {
			productList(1, "", "");
		} else {
			productList(1, "", value);
		}
	};

	const handleOnExport = () => {
		var XLSX = require("xlsx");
		var wb = XLSX.utils.book_new();
		var ws = XLSX.utils.json_to_sheet(productExcel);

		XLSX.utils.book_append_sheet(wb, ws, "ProductList");

		XLSX.writeFile(wb, "Product List.xlsx");
	};

	const productList = (page, search, filter) => {
		setIsLoader(true);
		ProductApi.ProductList(page, search, filter)
			.then((response) => {
				setProduct(response.data.data.list);
				setTotalProduct(response.data.data);
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



	const productExcelList = () => {
		setIsLoader(true);
		ExcelApi.ProductExcelList()
			.then((response) => {
				setProductExcel(response.data.data.list);
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
		if (filter === "all") {
			productList(currentPage, "", "");
		} else {
			productList(currentPage, "", filter);
		}
		productExcelList();
	}, []);

	return (
		<div page-component="product-page">
			<div page-component="product-page-status">
				<Head>
					<title>{APP_NAME} - Product</title>
					<meta name="description" content="Trusted Brands. Better Health." />
					<link rel="icon" href="/fitcart.ico" />
				</Head>

				<main>
					<DashboardLayoutComponent>
						<div className="row border-box">
							<div className="col-md-2">
								<div className="hamburger">
									<span>Catalog / </span>Product
								</div>
								<div className="page-name">Product</div>
							</div>
							<div className="col-md-2 select-dropdown">
								<div className="sort-by-select-wrapper w-100">
									<Select
										disableUnderline
										variant="standard"
										autoWidth={true}
										IconComponent={ExpandMoreIcon}
										name="category_id"
										onChange={(e) => handleFilterChange(e.target.value)}
										className="sort-by-select"
										value={filter}
									>
										<MenuItem
											value="select"
											disabled
											className="field_toggle_checked"
										>
											Select Status
										</MenuItem>
										<MenuItem value="all">All</MenuItem>
										<MenuItem value="published">Published</MenuItem>
										<MenuItem value="draft">Draft</MenuItem>
										<MenuItem value="archived">Archived</MenuItem>
										<MenuItem value="out_of_stock">Coming Soon</MenuItem>
									</Select>
								</div>
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
								<div
									className="custom-btn "
									onClick={() => {
										Router.push(`/product/create`);
									}}
								>
									<span>Add New </span>
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
										// product && product.length === 0 ? <div className="not-found">No Data Found</div> :
										<ProductList product={product} />
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
										Total Products: {totalProducts.total}
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
