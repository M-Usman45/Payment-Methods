import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Button from '../../Button';
import Empty from './../../Empty';
import DynamicIcon from './../DynamicIcon';
import { pricer } from 'helpers';

const CheckOut = props => {
	const cartItem = useSelector(({ cart }) => cart.items);

	if (cartItem.length === 0) {
		return <Empty />;
	}

	let total = 0;

	cartItem.map(c => {
		c.details.subjectList.map(sl => {
			sl.subject.level
				.filter(f => !!c.selectedItems.find(o => o.profileSubjectId === f.pvid))
				.map((ssl, k) => {
					const selectObj = c.selectedItems.find(o => o.profileSubjectId === ssl.pvid);
					total += selectObj.units * ssl.pricePerHour;
				});
		});
	});

	return (
		<>
			<Row>
				<Col span={24}>
					<Button style={{ margin: 5, width: '100%' }}>
						<DynamicIcon type="icon-price_tag_usd" />
						<span style={{ lineHeight: 1.1, fontSize: '16px' }}>{pricer(total) || '0'}</span>
					</Button>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Button type="primary" style={{ margin: 5, width: '100%' }}>
						CHECKOUT
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default CheckOut;
