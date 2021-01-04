import React, { useEffect } from 'react';
import { Drawer, Row, Col, Divider, Avatar, Tooltip, InputNumber, Button as DefaultButton } from 'antd';
import styled from 'styled-components';
import { Trans } from '@lingui/macro';

import { useMutation, useQuery } from 'react-apollo';
import { useSelector, useDispatch } from 'react-redux';

import Section from '../../Section';

import { mobile } from 'helpers';

import DynamicIcon from './../DynamicIcon';

import { removeFromCart, featchCartList, updateCartItem, removeCartItem } from 'store/actions/cartAction';
import { QUERY_LIST_CART_ITEM, MUTATE_REMOVE_CART, MUTATE_REMOVE_CART_ITEM, MUTATE_UPDATE_CART_ITEM, MUTATE_SYNC_CART } from 'queries/cart';

import { media, pricer, placeholderImage, renderAvatar, newClient } from 'helpers';
import { countryMap } from 'helpers/countryMapping';
import { LazyImage } from 'react-lazy-images';

import DescriptionItem from './DescriptionItem';
import Checkout from './Checkout';

const StyledDrawer = styled(Drawer)`
	.ant-drawer-body {
		padding: 0;
	}
`;

const StyledSection = styled(Section)`
	padding: 2em 3em;
`;

const StyledAvatar = styled(LazyImage)`
	height: 110px;
	object-fit: cover;
	margin-bottom: 1em;
	border-radius: 50%;
	${media.mobile`
		height: 130px;
	`}
`;

const StyledTraceIcon = styled.span`
	cursor: pointer;
`;

const cartClient = newClient('shopping-cart');

const CartPanel = props => {
	const dispatch = useDispatch();
	const cartItem = useSelector(({ cart }) => cart.items);
	const isAuthenticate = useSelector(({ user }) => user.user);

	const [syncCartReq] = useMutation(MUTATE_SYNC_CART, {
		client: cartClient,
		onCompleted: ({syncCart}) => {
			dispatch(featchCartList(syncCart.list));
		}
	});

	useEffect(() => {
		if (isAuthenticate && isAuthenticate.pvid) {
			const listCs = cartItem.map(o => {
				return {
					active: o.active,
					entityId: o.entityId,
					selectedItems: o.selectedItems,
					uuid: o.uuid
				}
			})
			
			syncCartReq({
				variables: {
					list: listCs
				}
			});
		}
	}, [isAuthenticate]);

	return (
		<StyledDrawer placement="right" closable={false} width={mobile ? '80%' : 640} onClose={props.onClose} visible={props.visible}>
			<StyledSection>
				{cartItem.map((o, key) => (
					<CartItem
						key={key}
						cartPvid={o.pvid}
						name={`${o.details.firstName} ${o.details.lastName}`}
						details={o.details}
						selectedItems={o.selectedItems}
						uuid={o.uuid}
						isAuthenticate={isAuthenticate}
					/>
				))}

				<Checkout />
			</StyledSection>
		</StyledDrawer>
	);
};

export default CartPanel;

function CartItem(props) {
	const { resource = {} } = props;

	const avatar = renderAvatar(resource.path);
	const dispatch = useDispatch();

	const [removeItemFromCart] = useMutation(MUTATE_REMOVE_CART, {
		client: cartClient
	});

	const [removeCartItemReq] = useMutation(MUTATE_REMOVE_CART_ITEM, {
		client: cartClient
	});

	const [updateCartItemReq] = useMutation(MUTATE_UPDATE_CART_ITEM, {
		client: cartClient
	});

	const removeToCartHandler = e => {
		e.stopPropagation();
		if (props.isAuthenticate && props.isAuthenticate.pvid) {
			removeItemFromCart({ variables: { uuid: props.uuid } }).finally(() => {
				dispatch(removeFromCart({ uuid: props.uuid }));
			});
		} else {
			dispatch(removeFromCart({ uuid: props.uuid }));
		}
	};

	const onUpdateCartItemHandler = variables => {
		if (props.isAuthenticate && props.isAuthenticate.pvid) {
			updateCartItemReq({
				variables: { cartPvid: props.cartPvid, profileSubjectId: variables.selected.profileSubjectId, units: variables.value }
			}).finally(() => {
				dispatch(updateCartItem({ value: variables.value, uuid: variables.uuid, obj: variables.obj }));
			});
		} else {
			dispatch(updateCartItem({ value: variables.value, uuid: variables.uuid, obj: variables.obj }));
		}
	};

	const onRemoveCartItemHandler = variables => {
		if (props.isAuthenticate && props.isAuthenticate.pvid) {
			removeCartItemReq({ variables: { cartPvid: props.cartPvid, profileSubjectId: variables.selected.profileSubjectId } }).finally(() => {
				dispatch(removeCartItem({ uuid: variables.uuid, obj: variables.obj }));
			});
		} else {
			dispatch(removeCartItem({ uuid: variables.uuid, obj: variables.obj }));
		}
	};

	return (
		<>
			<p className="site-description-item-profile-p">{props.categoryName}</p>

			<Row>
				<Col span={4}>
					<StyledAvatar
						src={avatar}
						alt={props.name}
						placeholder={({ imageProps, ref }) => <img ref={ref} src={placeholderImage} alt={imageProps.alt} width="100%" />}
						actual={({ imageProps }) => <Avatar {...imageProps} size={75} style={{ marginBottom: '.5em' }} />}
					/>
				</Col>
				<Col span={20}>
					<Row>
						<Col span={24}>
							<DescriptionItem title="Full Name" content={props.name} />
						</Col>
					</Row>
					{props.details.subjectList.map((s, key) => (
						<ProgramItem
							key={key}
							subject={s.subject}
							country={props.details.country}
							selectedItems={props.selectedItems}
							uuid={props.uuid}
							onUpdate={onUpdateCartItemHandler}
							onRemove={onRemoveCartItemHandler}
						/>
					))}

					<Row>
						<Col span={24}>
							<DescriptionItem title="About" content={props.details.description} />
						</Col>
					</Row>

					<Row>
						<Col span={8} offset={8}>
							<DefaultButton type="dashed" block style={{ margin: 5, width: '100%' }} onClick={removeToCartHandler}>
								🗑️
							</DefaultButton>
						</Col>
					</Row>
				</Col>
			</Row>

			<Divider />
		</>
	);
}

const ProgramItem = props => {
	const onChange = (value, obj) => {
		const selected = props.selectedItems.find(o => o.profileSubjectId === obj.pvid);
		props.onUpdate({ value, obj, uuid: props.uuid, selected });
	};

	const onDelete = obj => {
		const selected = props.selectedItems.find(o => o.profileSubjectId === obj.pvid);
		props.onRemove({ obj, uuid: props.uuid, selected });
	};

	return (
		<>
			{props.subject.level
				.filter(f => !!props.selectedItems.find(o => o.profileSubjectId === f.pvid))
				.map((sl, k) => (
					<Row key={k}>
						<Col span={8}>
							<DescriptionItem title={`${props.subject.name}`} content={sl.name} />
						</Col>
						<Col span={8}>
							<Tooltip title={<Trans>Price for a lesson per hour</Trans>}>
								<DynamicIcon type="icon-price_tag_usd" />
								<span style={{ lineHeight: 1.1, fontSize: '16px' }}>
									{countryMap[props.country].symbol} {pricer(sl.pricePerHour - sl.pricePerHour * (0 / 100)) || '0'}
								</span>
							</Tooltip>
						</Col>
						<Col span={6}>
							<InputNumber
								min={1}
								defaultValue={props.selectedItems.find(o => o.profileSubjectId === sl.pvid).units}
								onChange={v => {
									onChange(v, sl);
								}}
							/>
						</Col>
						<Col span={2}>
							<StyledTraceIcon
								onClick={() => {
									onDelete(sl);
								}}>
								🗑️
							</StyledTraceIcon>
						</Col>
					</Row>
				))}
		</>
	);
};
