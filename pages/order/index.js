import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import OrderList from "../../component/order/order-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import OrderApi from "../../services/orders";
import { useRouter } from "next/router";

export default function Order() {
    const pathArr = useRouter();
    const [order, setOrder] = useState([]);
    const [wordEntered, setWordEntered] = useState(
        pathArr.query?.q ? pathArr.query?.q : ""
    );
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handleKeyPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
            router_query_object["q"] = wordEntered;
        }
        if (event.key === "Enter") {
            Router.push({
                pathname: "/order",
                query: router_query_object,
            });
            setCurrentPage(1)
            orderList(1, wordEntered);
        }
    };

    const handleClickPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
            router_query_object["q"] = wordEntered;
        }
        Router.push({
            pathname: "/order",
            query: router_query_object,
        });
        setCurrentPage(1)
        orderList(1, wordEntered);
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    let onPageChange = function (e, page) {
        setCurrentPage(page)
        orderList(page, wordEntered)
    };

    function orderList(page, latest) {
        OrderApi.OrderList(page, latest)
            .then((response) => {
                setOrder(response.data.data.list);
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

    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        orderList(currentPage, "latest");
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Order</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-8">
                            <div className="hamburger">
                                <span>order / </span>order
                            </div>
                            <div className="page-name">Order</div>
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
                    </div>
                    <div className="row sticky-scroll scroll">
                        <div className="col-md-12 ">
                            {console.log(order)}
                            <OrderList order={order} />
                        </div>
                    </div>
                    <div className="row">
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
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}