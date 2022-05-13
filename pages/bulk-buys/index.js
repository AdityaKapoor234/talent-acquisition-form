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
import BulkBuys from "../../component/enquiry/bulk-buys/bulk-buys.component";
import InquiryApi from "../../services/inquiry";

export default function Bulk_Buys() {
    const pathArr = useRouter();
    const [bulkBuys, setBulkBuys] = useState([]);
    const [Page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
    const [totalBulkBuys, setTotalBulkBuys] = useState([]);
	const [isLoader, setIsLoader] = useState(true);
    const [wordEntered, setWordEntered] = useState(
		pathArr.query?.q ? pathArr.query?.q : ""
	);

    const handleKeyPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		if (event.key === "Enter") {
			Router.push({
				pathname: "/bulk-buys",
				query: router_query_object,
			});
			setCurrentPage(1)
			getBulkBuyList(1, wordEntered);
		}
	};

    const handleClickPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		// if (event.key === "Enter") {
		Router.push({
			pathname: "/bulk-buys",
			query: router_query_object,
		});
		setCurrentPage(1)
        getBulkBuyList(1, wordEntered);
		// }
	};

    const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/bulk-buys",
				query: "",
			});
            getBulkBuyList(1, "");
		}
	};
    let onPageChange = function (e, page) {
		setCurrentPage(page)
        getBulkBuyList(page, wordEntered)
	};


    const getBulkBuyList = (page,search) => {
		setIsLoader(true);
		InquiryApi.getBulkBuyList(page,search)
			.then((response) => {
				setBulkBuys(response.data.data.list);
				setTotalBulkBuys(response.data.data.total);
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
		getBulkBuyList(currentPage, "");
	}, []);

    return (
        <div>
            <div>
                <Head>
                    <title>{APP_NAME} - Bulk Buys</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-8">
                                <div className="hamburger">
                                    <span>Inquiry / </span>Bulk-Buys
                                </div>
                                <div className="page-name">Bulk-Buys</div>
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
                                    <SearchIcon className="search-icon point-but"  />
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
									// advertiseWithUs && advertiseWithUs.length === 0 ? <div className="not-found">No Data Found</div> :
									< BulkBuys product={bulkBuys} />
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
                                        Total BulkBuys: {totalBulkBuys}
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
