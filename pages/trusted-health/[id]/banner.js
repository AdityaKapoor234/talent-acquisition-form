import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import TrustedHealthCreateComponent from "../../../component/inquiry/trusted-health/trusted-health-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TrustedHealthAPI from "../../../services/trusted-health";


export async function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: {
			id: id || null,
		},
	};
}

export default function TrustedHealthEditDetails({ id }) {
	const mode = "banner";

	const [trustedHealth, setTrustedHealth] = useState([]);
	
	const [description, setDescription] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [banner, setBanner] = useState("");
	const [smBanner, setSmBanner] = useState("");
	

	const descriptionHandle = (value) => {
		setDescription(value);
	}
	const shortDescriptionHandle = (value) => {
		setShortDescription(value);
	}
	const bannerHandle = (value) => {
		setBanner(value);
	}
	const smBannerHandle = (value) => {
		setSmBanner(value);
	}
	

	const validateData = () => {
		if (description === "" || description === null || description.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the full description");
			return false;
		}
		if (shortDescription === "" || shortDescription === null || shortDescription.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the short description");
			return false;
		}
		if (banner === "" || banner === null || banner.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the banner");
			return false;
		}
        if (smBanner === "" || smBanner === null || smBanner.replace(/\s/g, "").length <= 0) {
			toast.error("Please enter the small banner");
			return false;
		}

		return true;
	};


	const OnSave = (id) => {
		if (validateData()) {
			let data = {
                "description": description,
                "short_description": shortDescription,
                "banner": banner,
                "sm_banner" : smBanner,
            };
			TrustedHealthAPI.trustedHealthEDIT(id, data)
				.then((response) => {
					
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

	const trustedHealthDetail = () => {
		TrustedHealthAPI.trustedHealthViewDetails()
			.then((response) => {
				setTrustedHealth(response.data.data.list[0]?.trusted_health_content);
                setDescription(response.data.data.list[0]?.trusted_health_content?.description);
	            setShortDescription(response.data.data.list[0]?.trusted_health_content?.short_description);
	            setBanner(response.data.data.list[0]?.trusted_health_content?.banner);
	            setSmBanner(response.data.data.list[0]?.trusted_health_content?.sm_banner);
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
		trustedHealthDetail();
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
								<span>CMS / Trusted Health/ </span>Edit Trusted Health
							</div>
							<div className="page-name">Trusted Health Details - Banner Details</div>
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
							<TrustedHealthCreateComponent trustedHealth={trustedHealth} mode={mode} description={descriptionHandle} shortDescription={shortDescriptionHandle} banner={bannerHandle} smBanner={smBannerHandle} />
						</div>
					</div>
				</DashboardLayoutComponent>
				
			</main>
		</div>
	);
}
