import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { AddBox } from "@mui/icons-material";
import CustomerApi from "../../services/customer";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Link from 'next/link'
import BulkEditProductcomponent from "../../component/catalog/bulk-edit-product/bulk-edit-product.component";
import { BulkEditProductApi } from "../../services/bulk-edit-product";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Bulk_Edit_Product() {
    const pathArr = useRouter();
    const [productType, setProductType] = useState([]);
    const [page, setPage] = useState(1);

    // const [customerExcel, setCustomerExcelList] = useState([]);
    const [totalProduct, setTotalProduct] = useState([]);
    const [wordEntered, setWordEntered] = useState(
        pathArr.query?.q ? pathArr.query?.q : ""
    );
	const [filter, setFilter] = useState("all");
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoader, setIsLoader] = useState(true);

    const handleKeyPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
            router_query_object["q"] = wordEntered;
        }
        if (event.key === "Enter") {
            Router.push({
                pathname: "/bulk-edit-product",
                query: router_query_object,
            });
            setCurrentPage(1)
            if (filter === "all") {
                BulkEditProduct(1, wordEntered, "");
			} else {
                BulkEditProduct(1, wordEntered, filter);
			}            
        }
    };

    const handleClickPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
            router_query_object["q"] = wordEntered;
        }
        Router.push({
            pathname: "/bulk-edit-product",
            query: router_query_object,
        });
        setCurrentPage(1)
        if (filter === "all") {
            BulkEditProduct(1, wordEntered, "");
        } else {
            BulkEditProduct(1, wordEntered, filter);
        }
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        if (event.target.value === "") {
            Router.push({
                pathname: "/bulk-edit-product",
                query: "",
            });
            if (filter === "all") {
                BulkEditProduct(1, "", "");
            } else {
                BulkEditProduct(1, "", filter);
            }
        }
    };

    let onPageChange = function (e, page) {
        setCurrentPage(page)
        if (filter === "all") {
            BulkEditProduct(page, wordEntered, "");
        } else {
            BulkEditProduct(page, wordEntered, filter);
        }
    };

	const handleFilterChange = (value) => {
		setFilter(value);
		if (value === "all") {
            BulkEditProduct(1, "", "");
		} else {
            BulkEditProduct(1, "", value);
		}
	};



    const BulkEditProduct = (page, search, filter) => {
        setIsLoader(true);
        BulkEditProductApi.BulkEditProductList(page, search, filter)
            .then((response) => {
                setProductType(response.data.data.list);
                setTotalProduct(response.data.data.total);
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

        if (filter === "all") {
            BulkEditProduct(currentPage, "", "");
        } else {
            BulkEditProduct(currentPage, "", filter);
        }
    }, []);
    return (
        <div page-component="product-page-status">
            <div>
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
                                    <span>catalog / </span>Bulk Edit Products
                                </div>
                                <div className="page-name">Bulk Edit Products</div>
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
                                        // productType && productType.length === 0 ? <div className="not-found">No Data Found</div> :
                                            <BulkEditProductcomponent list={productType}
                                                handle={BulkEditProduct} />
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
                                        Total Products: {totalProduct}
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
