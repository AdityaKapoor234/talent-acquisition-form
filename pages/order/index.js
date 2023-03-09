import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import OrderList from "../../component/sales/order/order-list";
import OrderExcelDownload from "../../component/sales/order/order-excel-download";
import XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OrderApi from "../../services/orders";
import ExcelApi from "../../services/excel-export";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Order() {
    const pathArr = useRouter();
    const [order, setOrder] = useState([]);
    const [orderExcel, setOrderExcel] = useState([]);
    const [totalOrders, setTotalOrder] = useState([]);
    const [orderPage, setOrderPage] = useState([]);
    const [wordEntered, setWordEntered] = useState(
        pathArr.query?.q ? pathArr.query?.q : ""
    );
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoader, setIsLoader] = useState(true);
    const [isLoaderExcelDownload, setIsLoaderExcelDownload] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const [latest, setLatest] = useState("latest");
    const [limit, setLimit] = useState(15);
    const [downloadPage, setDownloadPage] = useState(1);
    // const [downloadPage, setDownloadPage] = useState("select");
    const [downloadStatus, setDownloadStatus] = useState("select");
    const [downloadPageLimit, setDownloadPageLimit] = useState("select");
    const [remainingDownPage, setRemainingDownPage] = useState([]);

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
            orderList(1, wordEntered, latest, limit);
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
        orderList(1, wordEntered, latest, limit);
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        if (event.target.value === "") {
            Router.push({
                pathname: "/order",
                query: "",
            });
            orderList(1, "", latest, limit);
        }
    };

    const handleOnExport = () => {
        var XLSX = require("xlsx");
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(orderExcel);

        XLSX.utils.book_append_sheet(wb, ws, "OrderList");

        XLSX.writeFile(wb, "Order List.xlsx");
    };

    let onPageChange = function (e, page) {
        setCurrentPage(page)
        orderList(page, wordEntered, latest, limit)
    };

    let onSortChange = (value) => {
        setLatest(value)
        orderList(currentPage, wordEntered, value, limit)
    };

    let onLimitChange = (value) => {
        setLimit(value)
        setCurrentPage(1)
        orderList(1, wordEntered, latest, value)
    };

    function orderList(page, search, latest, limit) {
        setIsLoader(true);
        OrderApi.OrderList(page, search, latest, limit)
            .then((response) => {
                setOrder(response.data.data.list);
                setTotalOrder(response.data.data);
                setOrderPage(response.data.data);
                setTotalPage(Math.ceil(response.data.data.total / response.data.data.per_page));
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

    const validateDownload = () => {
        // if (downloadPage === "" || downloadPage === "select" || downloadPage === null) {
        //     toast.error("Please enter page number");
        //     return false;
        // }

        if (downloadStatus === "" || downloadStatus === "select" || downloadStatus === null || downloadStatus.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter order status");
            return false;
        }

        if (downloadPageLimit === "" || downloadPageLimit === "select" || downloadPageLimit === null) {
            toast.error("Please enter items per page");
            return false;
        }

        return true;
    };


    function orderExcelList() {
        setIsLoaderExcelDownload(true);
        if (validateDownload()) {
            // setIsLoader(true);
            // ExcelApi.OrderExcelList(page, sort, limit)
            ExcelApi.OrderExcelList(1, downloadStatus, downloadPageLimit)
                .then((response) => {
                    // setOrderExcel(response.data.data.list);
                    // setIsLoader(false);
                    // handleOnExport();

                    if (response.data.data.list?.length > 0) {
                        var XLSX = require("xlsx");
                        var wb = XLSX.utils.book_new();
                        var ws = XLSX.utils.json_to_sheet(response.data.data.list);

                        XLSX.utils.book_append_sheet(wb, ws, "OrderList");

                        XLSX.writeFile(wb, "Order List.xlsx");
                    } else {
                        toast.error("No Record Found");
                    }

                    setDownloadOpen(false);
                    setDownloadPage("select");
                    setDownloadStatus("select");
                    setDownloadPageLimit("select");
                    setIsLoaderExcelDownload(false);
                })
                .catch((error) => {
                    // setIsLoader(false);
                    setIsLoaderExcelDownload(false);
                    toast.error(
                        error?.response &&
                            error?.response?.data &&
                            error?.response?.data?.message
                            ? error.response.data.message
                            : "Unable to process your request, please try after sometime"
                    );
                });
        }
    };

    function downloadRows() {
        for (let i = 1; i <= totalPage; i++) {
            remainingDownPage[i] = i
        }
    }

    const handleDownloadPage = (value) => {
        setDownloadPage(value);
    }
    const handleDownloadStatus = (value) => {
        setDownloadStatus(value);
    }
    const handleDownloadPageLimit = (value) => {
        setDownloadPageLimit(value);
    }


    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        orderList(currentPage, "", latest, limit);
        // orderExcelList();
    }, []);
    return (
        <div>
            {/* <div page-component="category-page"> */}
            <div page-component="product-page">
                <Head>
                    <title>{APP_NAME} - Order</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-4">
                                <div className="hamburger">
                                    <span>order / </span>order
                                </div>
                                <div className="page-name">Order</div>
                            </div>
                            <div className="col-md-4">
                                <div className="login-form ">
                                    <input
                                        type="text"
                                        placeholder="Search Order No..."
                                        className="search-box"
                                        value={wordEntered}
                                        onChange={handleFilter}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <SearchIcon className="search-icon point-but" onClick={handleClickPress} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="sort w-100">
                                    {/* <label>
                                        Status<span className="mandatory-star">*</span>
                                    </label> */}
                                    <div className="sort-by-select-wrapper w-100">
                                        <Select
                                            disableUnderline
                                            variant="standard"
                                            autoWidth={false}
                                            IconComponent={ExpandMoreIcon}
                                            name="status"
                                            onChange={(event) => onSortChange(event.target.value)}
                                            className="sort-by-select w-100"
                                            value={latest}
                                            style={{ height: "2.34rem" }}
                                        >
                                            <MenuItem
                                                value={"select"}
                                                disabled
                                                className="field_toggle_checked"
                                            >
                                                Select Status{" "}
                                            </MenuItem>
                                            <MenuItem value={"latest"}>All</MenuItem>
                                            <MenuItem value={"placed"}>Placed</MenuItem>
                                            <MenuItem value={"payment_pending"}>Payment Pending</MenuItem>
                                            <MenuItem value={"shipped"}>Shipped</MenuItem>
                                            <MenuItem value={"delivered"}>Delivered</MenuItem>
                                            <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                                            <MenuItem value={"returned"}>Returned</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 btn-save">
                                <div className="custom-btn ">
                                    <span
                                        // onClick={handleOnExport}
                                        onClick={() => {
                                            setDownloadOpen(true);
                                            // downloadRows();
                                        }}
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
                                        // order === undefined ? <div className="not-found">No Data Found</div> :
                                        <OrderList order={order} />
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
                                    count={orderPage?.pages}
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


                                    <div className="position-absolute totalCount d-flex" style={{ right: 390, bottom: 5, width: "15rem" }}>
                                        Items per Page:&nbsp;
                                    </div>
                                    <div className="position-absolute totalCount d-flex" style={{ right: 410, bottom: 7, width: "6rem" }}>
                                        <Select
                                            disableUnderline
                                            variant="standard"
                                            autoWidth={false}
                                            IconComponent={ExpandMoreIcon}
                                            name="status"
                                            onChange={(event) => onLimitChange(event.target.value)}
                                            className="sort-by-select w-100"
                                            value={limit}
                                            style={{ height: "1rem" }}
                                        >
                                            <MenuItem
                                                value={"select"}
                                                disabled
                                                className="field_toggle_checked"
                                            >
                                                Select No of Records
                                            </MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={200}>200</MenuItem>
                                            <MenuItem value={500}>500</MenuItem>
                                            <MenuItem value={1000}>1000</MenuItem>
                                        </Select>
                                    </div>

                                    <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                                        Total Orders: {totalOrders.total}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </DashboardLayoutComponent>
                </main>
                <Dialog
                    open={downloadOpen}
                    onClose={
                        isLoaderExcelDownload ? (
                            null
                        ) : (
                            () => {
                                setDownloadOpen(false);
                                setDownloadPage("select");
                                setDownloadStatus("select");
                                setDownloadPageLimit("select");
                            }
                        )}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {
                        isLoaderExcelDownload ? (
                            <div className="row justify-content-center">
                                <div className="col-md-12 loader-cart">
                                    <DialogTitle style={{ color: "#012169" }}>
                                        Downloading Order's Information...
                                    </DialogTitle>
                                    <Box sx={{ display: "flex" }}>
                                        <CircularProgress
                                            style={{ color: "#F54A00" }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        ) : (
                            <>
                                <DialogTitle style={{ color: "#012169" }}>
                                    Download Order's Information
                                </DialogTitle>
                                <Box position="absolute" top={0} right={0}>
                                    <IconButton onClick={() => {
                                        setDownloadOpen(false);
                                        setDownloadPage("select");
                                        setDownloadStatus("select");
                                        setDownloadPageLimit("select");
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <DialogContent>
                                    <Typography style={{ color: "#7e8f99" }}>
                                        <OrderExcelDownload
                                            totalPage={totalPage}
                                            limit={limit}
                                            handleDownloadPage={handleDownloadPage.bind(this)}
                                            handleDownloadStatus={handleDownloadStatus.bind(this)}
                                            handleDownloadPageLimit={handleDownloadPageLimit.bind(this)}
                                        />
                                        {/* Enter your specifications to download the order's information list in excel sheet

                            <div className="row mt-3">
                                <div className="col d-flex align-items-center">
                                    Page No
                                </div>
                                <div className="col">
                                    <div className="sort w-100">
                                        <div className="sort-by-select-wrapper w-100">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={false}
                                                IconComponent={ExpandMoreIcon}
                                                name="status"
                                                onChange={(event) => setDownloadPage(event.target.value)}
                                                className="sort-by-select w-100"
                                                value={downloadPage}
                                                style={{ height: "2.34rem" }}
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Page No
                                                </MenuItem>
                                                {downloadRows()}
                                                {
                                                    remainingDownPage?.map(elem => {
                                                        return (
                                                            <MenuItem value={elem}>{elem}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-3">
                                <div className="col d-flex align-items-center">
                                    Order Status
                                </div>
                                <div className="col">
                                    <div className="sort w-100">
                                        <div className="sort-by-select-wrapper w-100">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={false}
                                                IconComponent={ExpandMoreIcon}
                                                name="status"
                                                onChange={(event) => setDownloadStatus(event.target.value)}
                                                className="sort-by-select w-100"
                                                value={downloadStatus}
                                                style={{ height: "2.34rem" }}
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status
                                                </MenuItem>
                                                <MenuItem value={"latest"}>All</MenuItem>
                                                <MenuItem value={"placed"}>Placed</MenuItem>
                                                <MenuItem value={"payment_pending"}>Payment Pending</MenuItem>
                                                <MenuItem value={"shipped"}>Shipped</MenuItem>
                                                <MenuItem value={"delivered"}>Delivered</MenuItem>
                                                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col d-flex align-items-center">
                                    No of Records
                                </div>
                                <div className="col">
                                    <div className="sort w-100">
                                        <div className="sort-by-select-wrapper w-100">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={false}
                                                IconComponent={ExpandMoreIcon}
                                                name="status"
                                                onChange={(event) => setDownloadPageLimit(event.target.value)}
                                                className="sort-by-select w-100"
                                                value={downloadPageLimit}
                                                style={{ height: "2.34rem" }}
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select No of Records
                                                </MenuItem>
                                                <MenuItem value={15}>15</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                                <MenuItem value={200}>200</MenuItem>
                                                <MenuItem value={500}>500</MenuItem>
                                                <MenuItem value={1000}>1000</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                                    </Typography>
                                </DialogContent>
                                <DialogActions style={{ marginBottom: "0.5rem" }}>
                                    <Button
                                        onClick={() => {
                                            setDownloadOpen(false);
                                            setDownloadPage("select");
                                            setDownloadStatus("select");
                                            setDownloadPageLimit("select");
                                        }}
                                        style={{
                                            color: "#012169",
                                            background: "white",
                                            borderRadius: "0px",
                                        }}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => orderExcelList()}
                                        style={{ background: "#f54a00", borderRadius: "0px" }}
                                        color="secondary"
                                        variant="contained"
                                    >
                                        Download
                                    </Button>
                                </DialogActions>
                            </>
                        )
                    }

                </Dialog>

            </div>
        </div>
    );
}