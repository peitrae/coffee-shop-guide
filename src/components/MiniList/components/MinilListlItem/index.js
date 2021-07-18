import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../../../UI/Button';
import defaultImage from '../../../../assets/no-image.png';

const MiniListItem = ({
	coffeeShop,
	handleEdit,
	handleDelete,
	handleEditPromo,
}) => {
	const { id, name, address, images } = coffeeShop;

	return (
		<div className="minilist-item">
			<NavLink to={`/coffee-shop/${id}`}>
				<img
					src={images ? images[0] : defaultImage}
					alt={name}
					className="minilist-item__img"
				/>
			</NavLink>
			<div className="minilist-item__body">
				<NavLink to={`/coffee-shop/${id}`}>
					<h3 className="h3 c-primary minilist-item__name">{name}</h3>
					<span className="minilist-item__address">{address}</span>
				</NavLink>
				<div className="minilist-item__actions">
					{handleEditPromo ? (
						<Button
							size="sm"
							type="text"
							onClick={() => handleEditPromo(coffeeShop)}
						>
							Promo
						</Button>
					) : null}
					<div className="minilist-item__actions--left">
						{handleEdit ? (
							<Button
								className="margin-r-12"
								size="sm"
								type="text"
								onClick={() => handleEdit(id)}
							>
								Ubah
							</Button>
						) : null}
						{handleDelete ? (
							<Button
								size="sm"
								type="text"
								color="danger"
								onClick={() => handleDelete(id)}
							>
								Hapus
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MiniListItem;
