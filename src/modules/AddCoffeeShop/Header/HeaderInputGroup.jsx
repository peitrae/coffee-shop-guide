import React from 'react';

import InputField from '../../../components/UI/InputField/InputField';
import CursorIcon from '../../../assets/icon/CursorIcon';
import { Button } from '../../../components/UI/Button';

const HeaderInputGroup = ({
	name = '',
	address = '',
	handleNameChange,
  handleAddressChange,
	handleOpenMap = () => {},
}) => (
	<div className="header__input-grp">
		<div className="col margin-v-8">
			<label className="add-coffeeshop__label">Name</label>
			<InputField
				name="name"
				size="sm"
				placeholder="Nama"
				className="width-100"
				value={name}
				onChange={handleNameChange}
			/>
		</div>
		<div className="col margin-v-8">
			<label className="add-coffeeshop__label">Alamat</label>
			<InputField
				name="address"
				size="sm"
				placeholder="Alamat"
				className="width-100 margin-r-12"
				value={address}
				onChange={handleAddressChange}
			/>
			<Button
				size="md"
				className="header__btn-map"
				onClick={handleOpenMap}
				icon={CursorIcon}
			/>
		</div>
	</div>
);

export default HeaderInputGroup;
