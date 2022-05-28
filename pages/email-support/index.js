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

import { useRouter } from "next/router";
import EmailSupport from "../../component/email-support/email-support.component"
import InquiryApi from "../../services/inquiry";

export default function Email_Support() {
    const pathArr = useRouter();
    const [emailSupport, setEmailSupport] = useState([]);
    const [Page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
    const [totalEmailSupport, setTotalEmailSupport] = useState([]);
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
				pathname: "/email-support",
				query: router_query_object,
			});
			setCurrentPage(1)
            getEmailSupport(1, wordEntered);
		}
	};

    const handleClickPress = (event) => {
		let router_query_object = {};
		if (wordEntered !== "") {
			router_query_object["q"] = wordEntered;
		}
		// if (event.key === "Enter") {
		Router.push({
			pathname: "/email-support",
			query: router_query_object,
		});
		setCurrentPage(1)
        getEmailSupport(1, wordEntered);
		// }
	};

    const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/email-support",
				query: "",
			});
            getEmailSupport(1, "");
		}
	};
    let onPageChange = function (e, page) {
		setCurrentPage(page)
        getEmailSupport(page, wordEntered)
	};


    const getEmailSupport = (page,search) => {
		setIsLoader(true);
		InquiryApi.emailSupportList(page,search)
			.then((response) => {
				setEmailSupport(response.data.data.list);
				setTotalEmailSupport(response.data.data.total);
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
		getEmailSupport(currentPage, "");
	}, []);

    return (
        <div>
            <div>
                <Head>
                    <title>{APP_NAME} - Email Support</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-8">
                                <div className="hamburger">
                                    <span>Inquiry / </span>Email-Support
                                </div>
                                <div className="page-name">Email-Support</div>
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
									< EmailSupport list={emailSupport} />
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
                                        Total Email-Support: {totalEmailSupport}
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
