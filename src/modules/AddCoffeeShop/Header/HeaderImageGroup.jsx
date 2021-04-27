import React from 'react';

import Spinner from '../../../components/UI/Spinner';
import Backdrop from '../../../components/UI/Backdrop';
import EditButton from './EditButton';

const HeaderImageGroup = ({
	image,
	isHeaderUploading,
	handleHeaderChange = () => {},
}) => (
	<div className="header__img-grp">
		<img src={image} alt="Coffee Shop Header" className="header__img" />
		{isHeaderUploading ? (
			<Backdrop>
				<Spinner color="white" />
			</Backdrop>
		) : (
			<EditButton onChange={handleHeaderChange} className="header__btn-edit" />
		)}
	</div>
);

export default HeaderImageGroup;
