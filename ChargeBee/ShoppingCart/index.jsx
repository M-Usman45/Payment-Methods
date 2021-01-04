import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import Button from './../../Button';

import CartPanel from './CartPanel';

export default function ShoppingCart(props) {
	const [showCartDrawer, setCartDrawer] = useState(false);
	const items = useSelector(({ cart }) => cart.items);
	const loading = useSelector(({ cart }) => cart.loading);
	return (
		<>
			<Badge count={items.length || 0}>
				<Button onClick={() => setCartDrawer(!showCartDrawer)} shape="circle" icon="shop" size="default" type="dashed" />
			</Badge>
			<CartPanel visible={showCartDrawer} onClose={() => setCartDrawer(false)} data={items} notifList={items} loading={loading} />
		</>
	);
}