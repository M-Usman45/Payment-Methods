import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"
import { Tooltip } from "components"
import DynamicIcon from "./DynamicIcon"
import { t } from "@lingui/macro"
import { withI18n } from "@lingui/react"
import { country } from "App"
import Helmet from "react-helmet"
import FadeIn from "react-fade-in"
import { baseStyles } from "styles/base"
import { WINDOW_FEATURES, CUDY_URL } from "helpers/constants"
import { mobile, tablet, shareToSocialMedia } from "helpers"

const StyledShareIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 30px;
	height: 30px;
	border-radius: 12px;
	background-color: ${({ bg }) => bg};
	cursor: pointer;
`

const handleShareWhatsapp = (profileUrl, text, userData) => {
	if (mobile || tablet) {
		shareToSocialMedia({ title: "Cudy Marketplace", url: profileUrl, text: userData.firstName + " " + userData.lastName })
		return
	}
	window.open(`whatsapp://send?text=${text} ${profileUrl}`, "whatsapp-popup", WINDOW_FEATURES)
}

const handleShareFacebook = (profileUrl, text, userData) => {
	if (mobile || tablet) {
		shareToSocialMedia({ title: "Cudy Marketplace", url: profileUrl, text: userData.firstName + " " + userData.lastName })
		return
	}
	window.open("https://www.facebook.com/sharer/sharer.php?u=" + profileUrl + `&quote=${text}`, "facebook-popup", WINDOW_FEATURES)
}

const handleShareTwitter = (profileUrl, text, userData) => {
	if (mobile || tablet) {
		shareToSocialMedia({ title: "Cudy Marketplace", url: profileUrl, text: userData.firstName + " " + userData.lastName })
		return
	}
	window.open("https://twitter.com/share?url=" + profileUrl + `&text=${text}`, "twitter-popup", WINDOW_FEATURES)
}

const handleShareLinkedin = (profileUrl, text, userData) => {
	if (mobile || tablet) {
		shareToSocialMedia({ title: "Cudy Marketplace", url: profileUrl, text: userData.firstName + " " + userData.lastName })
		return
	}
	window.open(
		`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&text=${text}&source=${profileUrl}`,
		"linkedin-popup",
		WINDOW_FEATURES
	)
}

const handleShareTelegram = (profileUrl, text, userData) => {
	if (mobile || tablet) {
		shareToSocialMedia({ title: "Cudy Marketplace", url: profileUrl, text: userData.firstName + " " + userData.lastName })
		return
	}
	window.open(`https://telegram.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${text}`, "telegram-popup", WINDOW_FEATURES)
}

function ShareSection({ userData = {}, isNotLoggedin, i18n }) {
	const profileUrl = `${CUDY_URL}/${country}/${userData.userCode}-${userData.firstName}-${userData.lastName}`
	const theUrl = isNotLoggedin ? CUDY_URL + `/${country}/register` : profileUrl
	const cudyDefinition = i18n._(t`Hey, I've just created an account in Cudy Marketplace. Cudy Marketplace is a marketplace for you to find best tutors around
	Indonesia, Singapore, Malaysia, Philippines, India, Sri Lanka, to teach you anything`)
	const theText = isNotLoggedin
		? cudyDefinition
		: i18n._(t`Hey, check out ${userData.firstName} ${userData.lastName}'s profile on Cudy Marketplace. Cudy Marketplace is a marketplace for you
	to find best tutors around Indonesia, Singapore, Malaysia, Philippines, India, Sri Lanka, to teach you anything`)

	const { FACEBOOK, TWITTER, LINKEDIN, WHATSAPP, TELEGRAM } = baseStyles.socialColor

	return (
		<FadeIn>
			<Row gutter={16} type="flex" justify="center">
				<Helmet>
					<title>Cudy Marketplace - Find Asia's Leading Tutors Online</title>
					<meta name="description" content={userData.firstName ? userData.firstName + " " + userData.lastName : "No name"} />
				</Helmet>
				<Col lg={4} style={{ textAlign: "center" }}>
					<Tooltip title="Facebook">
						<StyledShareIcon bg={FACEBOOK} onClick={() => handleShareFacebook(theUrl, theText, userData)}>
							<DynamicIcon type="icon-facebook-fill" color="#fff" />
						</StyledShareIcon>
					</Tooltip>
				</Col>
				<Col lg={4} style={{ textAlign: "center" }}>
					<Tooltip title="Twitter">
						<StyledShareIcon bg={TWITTER} onClick={() => handleShareTwitter(theUrl, theText, userData)}>
							<DynamicIcon type="icon-twitter-fill" color="#fff" />
						</StyledShareIcon>
					</Tooltip>
				</Col>
				<Col lg={4} style={{ textAlign: "center" }}>
					<Tooltip title="LinkedIn">
						<StyledShareIcon bg={LINKEDIN} onClick={() => handleShareLinkedin(theUrl, theText, userData)}>
							<DynamicIcon type="icon-linkedin-fill" color="#fff" />
						</StyledShareIcon>
					</Tooltip>
				</Col>
				<Col lg={4} style={{ textAlign: "center" }}>
					<Tooltip title="Whatsapp">
						<StyledShareIcon bg={WHATSAPP} onClick={() => handleShareWhatsapp(theUrl, theText, userData)}>
							<DynamicIcon type="icon-whatsapp-line" color="#fff" />
						</StyledShareIcon>
					</Tooltip>
				</Col>
				<Col lg={4} style={{ textAlign: "center" }}>
					<Tooltip title="Telegram">
						<StyledShareIcon bg={TELEGRAM} onClick={() => handleShareTelegram(theUrl, theText, userData)}>
							<DynamicIcon type="icon-telegram-fill" color="#fff" />
						</StyledShareIcon>
					</Tooltip>
				</Col>
			</Row>
		</FadeIn>
	)
}

export default withI18n()(ShareSection)
