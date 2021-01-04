import React from 'react';
import styled from 'styled-components';

const CartWrapper = styled.div`
	margin-bottom: 7px;
	color: rgba(0, 0, 0, 0.65);
	font-size: 14px;
	line-height: 1.5715;
`;

const CartWrapperLabel = styled.p`
	display: inline-block;
	margin-right: 8px;
	color: #222
`;

const DescriptionItem = ({ title, content }) => (
	<CartWrapper>
		<CartWrapperLabel>{title}:</CartWrapperLabel>
		{content}
	</CartWrapper>
);

export default DescriptionItem;

