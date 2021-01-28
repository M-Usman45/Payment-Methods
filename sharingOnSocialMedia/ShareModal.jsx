// import React from 'react';
// import { FacebookOutlined, InstagramOutlined, GooglePlusOutlined, LinkedinOutlined } from '@ant-design/icons';

// export default function ShareModal() {
// 	return (
// 		<>
// 			<h1>Share To :- </h1>
// 			<LinkedinOutlined style={{ fontSize: '24px', marginRight: 8 }} />
// 			<FacebookOutlined style={{ fontSize: '24px', marginRight: 8 }} />
// 			<GooglePlusOutlined style={{ fontSize: '24px', marginRight: 8 }} />
// 			<InstagramOutlined style={{ fontSize: '24px', marginRight: 8 }} />
// 		</>
// 	);
// }



import React from "react"
import { Modal, Section } from "components"
import { Form, Row, Col, Typography } from "antd"
import TextInput from "components/forms/TextInput"
import ShareSection from "components/common/ShareSection"
import { withI18n } from "@lingui/react"
import { t, Trans } from "@lingui/macro"
import { country } from "App"
import { CUDY_URL } from "helpers/constants"

function ShareModal({ userData, onModal, i18n }) {
	const { shareModal, setShareModal } = onModal
	const profileUrl = `${CUDY_URL}/${country}/${userData.userCode}-${userData.pvid}-${userData.firstName}-${userData.initialName || ""}`

	return (
		<Modal
			title={<Trans>Share {userData.firstName}'s profile</Trans>}
			visible={shareModal}
			onCancel={() => setShareModal(false)}
			footer={false}
		>
			<Section paddingHorizontal={0}>
				<Form layout="vertical">
					{/* <TextInput
						independent
						name="share_profile"
						placeholder={i18n._(t`Share profile...`)}
						label={
							<Typography.Text copyable={{ text: profileUrl }}>
								<Trans>Copy the profile's URL</Trans>
							</Typography.Text>
						}
						value={profileUrl}
					/> */}
					<Row gutter={32} type="flex" align="middle">
						<Col lg={6}>
							<Trans>Share to</Trans>
						</Col>
						<Col lg={18}>
							<ShareSection userData={userData} />
						</Col>
					</Row>
				</Form>
			</Section>
		</Modal>
	)
}

export default withI18n()(ShareModal)
