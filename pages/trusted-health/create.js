import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TrustedHealthCreateComponent from "../../component/inquiry/trusted-health/trusted-health-details";
import Router from "next/router";
import Cookie from "js-cookie";
import InquiryApi from "../../services/inquiry";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: {
			id: id || null,
		},
	};
}

export default function TrustedHealthAddDetails({ id }) {
	const mode = "edit";

	const [trustedHealth, setTrustedHealth] = useState([]);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [isTrustHealth, setIsTrustHealth] = useState(false);
	const [path, setPath] = useState("");
	const [readMoreUrl, setReadMoreUrl] = useState("");

	const nameHandle = (value) => {
		setName(value);
		console.log(name,"name");
	}
	const contentHandle = (value) => {
		setContent(value);
		console.log(content,"content");
	}
	const isTrustHealthHandle = (value) => {
		setIsTrustHealth(value);
		console.log(isTrustHealth,"isTrustHealth");
	}
	const pathHandle = (value) => {
		setPath(value);
		console.log(path,"path");
	}
	const readMoreUrlHandle = (value) => {
		setReadMoreUrl(value);
		console.log(readMoreUrl,"readMoreUrl");
	}

	const validateData = () => {
		if (name === "" || name === null || name.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the name");
			return false;
		}
		if (content === "" || content === null || content.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the name");
			return false;
		}
		if (path === "" || path === null) {
			toast.error("Please upload icon");
			return false;
		}
		if (readMoreUrl === "" || readMoreUrl === null || readMoreUrl.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the name");
			return false;
		}

		return true;
	};


	const OnSave = (id) => {
		if (validateData) {
			let data = {
				name: name,
				content: content,
				is_trust_health: isTrustHealth,
				path: path,
				read_more_url: readMoreUrl,
			};
			InquiryApi.trustedHealthCreate(data)
				.then((response) => {
					setTrustedHealth(response.data.data.trust_helath_edit);
					toast.success(response.data.message);
					Router.push(`/trusted-health`);
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
		}
	};

	// const trustedHealthDetail = (id) => {
	// 	InquiryApi.trustedHealthDetails(id)
	// 		.then((response) => {
	// 			setTrustedHealth(response.data.data.trust_helath_view);
	// 			setName(response.data.data.trust_helath_view.name);
	// 			setContent(response.data.data.trust_helath_view.content);
	// 			setIsTrustHealth(response.data.data.trust_helath_view.is_trust_health);
	// 			setPath(response.data.data.trust_helath_view.path);
	// 			setReadMoreUrl(response.data.data.trust_helath_view.read_more_url);
	// 		})
	// 		.catch((error) => {
	// 			toast.error(
	// 				error?.response &&
	// 					error?.response?.data &&
	// 					error?.response?.data?.message
	// 					? error.response.data.message
	// 					: "Unable to process your request, please try after sometime"
	// 			);
	// 		});
	// };

	// const Delete = (id) => {
	// 	let data = {};
	// 	InquiryApi.trustedHealthDelete(id, data)
	// 		.then((response) => {
	// 			if (response.data.httpStatusCode === 200) {
	// 				setTrustedHealth(response.data.data.delete);
	// 				toast.success(response.data.message);
	// 				Router.push("/trusted-health");
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			toast.error(
	// 				error?.response &&
	// 					error?.response?.data &&
	// 					error?.response?.data?.message
	// 					? error.response.data.message
	// 					: "Unable to process your request, please try after sometime"
	// 			);
	// 		});
	// };

	useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
		// trustedHealthDetail(id);
	}, [id]);
	return (
		<div>
			<Head>
				<title>{APP_NAME} - Trusted Health</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div className="row border-box">
						<div className="col-md-5">
							<div className="hamburger">
								<span>Inquiry / Trusted Health/ </span>Add Trusted Health
							</div>
							<div className="page-name">Trusted Health Details - {trustedHealth?.name}</div>
						</div>
						<div className="col-md-7 btn-save">
							<div
								className="custom-btn "
								onClick={() => {
									OnSave(id);
								}}
							>
								<span>Save </span>
							</div>

							{/* <div
								className="Cancel-btn custom-btn"
								onClick={() => {
									setOpen(true);
								}}
							>
								<span>Delete </span>
							</div> */}
							<div
								className="Cancel-btn custom-btn"
								onClick={() => {
									Router.push(`/trusted-health`);
								}}
							>
								<span>Cancel </span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-m-12">
							<TrustedHealthCreateComponent trustedHealth={trustedHealth} mode={mode} name={nameHandle} content={contentHandle} isTrustHealth={isTrustHealthHandle} path={pathHandle} readMoreUrl={readMoreUrlHandle} />
						</div>
					</div>
				</DashboardLayoutComponent>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					maxWidth="sm"
					fullWidth
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle style={{ color: "#012169" }}>
						Confirm the action
					</DialogTitle>
					<Box position="absolute" top={0} right={0}>
						<IconButton onClick={() => setOpen(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
					<DialogContent>
						<Typography style={{ color: "#7e8f99" }}>
							Are you sure you want to delete this Trusted Health?
						</Typography>
					</DialogContent>
					<DialogActions style={{ marginBottom: "0.5rem" }}>
						<Button
							onClick={() => setOpen(false)}
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
							onClick={() => Delete(id)}
							style={{ background: "#f54a00", borderRadius: "0px" }}
							color="secondary"
							variant="contained"
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</main>
		</div>
	);
}
