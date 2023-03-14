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
import BannerContent from "../../component/banner-content/banner-content";

export default function BannerandContent() {
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

    useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
	}, []);

    return (
        <div>
            <div>
                <Head>
                    <title>{APP_NAME} - Banner & Content</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-8">
                                <div className="hamburger">
                                    <span>Inquiry / </span>Banner & Content
                                </div>
                                <div className="page-name">Banner & Content</div>
                            </div>
                            {/* <div className="col-md-4">
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
                            </div> */}
                           
                        </div>
                        <div className="row sticky-scroll scroll">
                            <div className="col-md-12 ">
                            {
								!isLoader ? (
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
									// < EmailSupport list={emailSupport} />
                                    <BannerContent />
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
                        {/* <div className="row">
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
                        </div> */}

                    </DashboardLayoutComponent>
                </main>
            </div>
        </div>
    );
}
