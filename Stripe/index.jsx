import React from "react"
import { Heading, Button } from "components"
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement
} from "@stripe/react-stripe-js"
import isEmpty from "utils/functions"
import { notification, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { payWithStripe } from "../../../redux/actions/paymentGatewaysActions"
import Spinner from "components/spinner"

const StripeForm = ({ closeModal }) => {
	const stripe = useStripe()
	const elements = useElements()
	const dispatch = useDispatch()

	const invoiceToPay = useSelector(({ payments }) => payments?.invoiceToPay)
	const loading = useSelector(({ payments }) => payments?.loading)

	const handleSubmit = async event => {
		event.preventDefault()
		const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement))
		if (!isEmpty(error)) {
			notification.error({
				message: "Error",
				description: error?.message
			})
			return
		} else {
			const data = {
				invoice_id: invoiceToPay?.id,
				token: token?.id
			}
			dispatch(payWithStripe(data, closeModal))
		}
	}

	return (
		<>
			<form>
				<Heading title="Stripe" style={{ textAlign: "center" }} />
				<Row style={{ margin: "2rem 0 2rem 0" }}>
					<h4> Card Number </h4>
					<Col span={24} style={{ borderBottom: "1px solid black", height: "30px" }}>
						<div></div>
						<CardNumberElement />
					</Col>
				</Row>
				<Row gutter={4} style={{ margin: "2rem 0 2rem 0", height: "30px" }} justify="space-between">
					<Col span={10} style={{ borderBottom: "1px solid black" }}>
						<h4> Expiry Date </h4>
						<CardExpiryElement />
					</Col>
					<Col span={10} style={{ borderBottom: "1px solid black" }}>
						<h4> Cvc Code </h4>
						<CardCvcElement />
					</Col>
				</Row>
				<Row>
					<Button onClick={handleSubmit} disabled={!stripe} style={{ marginTop: "2rem" }}>
						{loading ? <Spinner /> : `Pay ${parseInt(invoiceToPay?.invoice_price)} SGD`}
					</Button>
				</Row>
			</form>
		</>
	)
}

export default StripeForm