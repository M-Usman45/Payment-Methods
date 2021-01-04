import React, { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useMutation, useLazyQuery } from "react-apollo"
import { v4 as uuidv4 } from "uuid";
import { addToCart } from "store/actions/cartAction"
import { newClient } from "helpers"
import { MUTATE_ADD_CART_ITEM, QUERY_CART_ITEM_PROFILE } from "queries/cart"
import DynamicIcon from "./../DynamicIcon"

import SelectSubject from "./SelectSubject"

const cartClient = newClient("shopping-cart")

function Bucket(props) {
	const dispatch = useDispatch();

	const [tmpCart, setTmpCart] = useState({});
	const [visible, setVisible] = useState(false);

	const [addItemToCart] = useMutation(MUTATE_ADD_CART_ITEM, {
		client: cartClient,
		onCompleted: ({ addToCartItem }) => {
			dispatch(addToCart(addToCartItem))
		}
	})

	const [getCartProfile] = useLazyQuery(QUERY_CART_ITEM_PROFILE, {
		client: cartClient,
		onCompleted: ({ getCartProfile })=> {
			setTmpCart({ 
				...tmpCart,
				details: getCartProfile.details
			});
			setVisible(!visible);
			
		}
	})

	const addToCartHandler = (e) => {
		e.stopPropagation();
		
		const item = { 
			entityId: props.itemId, 
			uuid: uuidv4(),
			
			active: true
		}
		setTmpCart(item);
		getCartProfile({variables:{ entityId: props.itemId }})
	}

	const onSelectItem = (value) => {
		setVisible(false);

		if (props.isAuthenticate && props.isAuthenticate.pvid) {
			addItemToCart({variables: { ...tmpCart, selectedItems: value }}).finally(() => {
			})
		} else {
			dispatch(addToCart({
				...tmpCart,
				selectedItems: value
			}))
		}
	}

	const onCloseSelection = () => {
		setVisible(false)
	}

	return (
		<>
			<DynamicIcon 
				type="icon-bag" 
				style={{ position: "absolute", top: '0px',right: '20px', fontSize: "20px" }} 
				onClick={addToCartHandler} 
			/> 
			<SelectSubject  
				visible={visible} 
				data={tmpCart}
				onCloseSelectionHandler={onCloseSelection}
				onSelectItemHandler={onSelectItem}
			  />
			<br />
		</>
	)
}

const mapStateToProps = ({ cart, user }) => ({
	loading: cart.loading,
	items: cart.items,
	isAuthenticate: user.user
})

const mapDispatchToProps = {
    addToCart
}

// prettier-ignore
export default connect( mapStateToProps, mapDispatchToProps )(Bucket)
