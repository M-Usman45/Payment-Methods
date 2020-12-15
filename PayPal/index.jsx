import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from 'components';
import { payWithPayPal } from '../../../redux/actions/paymentGatewaysActions';

export default function ReactPayPal({ cloaseModal }) {
	// const paypalRef = useRef()
	const dispatch = useDispatch()

	const invoiceToPay = useSelector(({ payments }) => payments?.invoiceToPay)

	const handleClick = () => {
		const data = {
			invoice_id: invoiceToPay?.id
		}
		dispatch(payWithPayPal(data, cloaseModal))
	}
	// useEffect(() => {
	// 	window.paypal
	// 		.Buttons({
	// 			createOrder: (data, actions) => {
	// 				return actions.order.create({
	// 					intent: "CAPTURE",
	// 					purchase_units: [
	// 						{
	// 							description: "Your description",
	// 							amount: {
	// 								currency_code: "SGD",
	// 								value: invoiceToPay?.invoice_price
	// 							}
	// 						}
	// 					]
	// 				})
	// 			},
	// 			onApprove: async (data, actions) => {
	// 				const order = await actions.order.capture()
	// 				closeModal()
	// 				console.log("Order after success", order)
	// 			},
	// 			onError: () => {
	// 				notification.error({
	// 					message: "Error",
	// 					description: "Something went wrong. Please try aggain."
	// 				})
	// 			}
	// 		})
	// 		.render(paypalRef.current)
	// }, [])

	return (
		<div>
			<h4>Total Amount in SGD. : {invoiceToPay?.invoice_price} /-</h4>
			<Button onClick={handleClick}>
				Pay With PayPal
				</Button>
			{/* <div ref={paypalRef} /> */}
		</div>
	)
}