import React, { useState } from 'react';
import Modal from 'components/Modal';
import { TreeSelect } from 'antd';

const ClickMuncher = ({ children }) => {
	return <div onClick={e => e.stopPropagation()}>{children}</div>;
};

const { TreeNode } = TreeSelect;

const SelectSubject = props => {
	const [value, setValue] = useState([]);

	const onChange = value => {
		setValue(value);
	};

	const onAddToCart = () => {
		if (value.length === 0) {
			alert('Please select Subject');
			return;
		}
		
		props.onSelectItemHandler(value.map(o => ({profileSubjectId: o, units: 1, IsDeleted: false })));
	};

	return (
		<ClickMuncher>
			<Modal title="Select Items" visible={props.visible} onOk={onAddToCart} onCancel={props.onCloseSelectionHandler}>
				{props.data.details && (
					<TreeSelect
						showSearch
						style={{ width: '100%' }}
						value={value}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						placeholder="Please select"
						allowClear
						multiple
						treeCheckable
						treeDefaultExpandAll
						onChange={onChange}>
						{props.data.details.subjectList.map((s, i) => (
							<TreeNode value={s.subject.name} title={s.subject.name} key={i} disabled>
								{s.subject.level.map((sl, slIndex) => (
									<TreeNode value={sl.pvid} title={sl.name} key={sl.pvid}></TreeNode>
								))}
							</TreeNode>
						))}
					</TreeSelect>
				)}
			</Modal>
		</ClickMuncher>
	);
};

export default SelectSubject;
