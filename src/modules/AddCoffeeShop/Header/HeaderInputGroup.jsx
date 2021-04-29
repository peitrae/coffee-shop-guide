import React from 'react';

import InputField from '../../../components/UI/InputField/InputField';

const HeaderInputGroup = ({
	name = '',
	address = '',
	handleNameChange,
  handleAddressChange,
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
				className="width-100"
				value={address}
				onChange={handleAddressChange}
			/>
		</div>
	</div>
);

export default HeaderInputGroup;
