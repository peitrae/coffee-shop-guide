import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../../../components/UI/Card';
import { Button } from '../../../../components/UI/Button';
import { AddFeedback, Share } from '../../../../modules/CoffeeShop';
import PromoList from './components/PromoList';
import BookmarkButton from './components/BookmarkButton';
import * as actions from '../../../../store/actions';

const Header = () => {
	const dispatch = useDispatch();

	const [showAddFeedback, setShowAddFeedback] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);

	const { bookmark } = useSelector(({ member }) => member);
	const coffeeShop = useSelector(({ coffeeShop }) => coffeeShop.data);

	const {
		id: coffeeShopId,
		header,
		name,
		address,
		feedback,
		promo,
	} = coffeeShop;

	useEffect(() => {
		const bookmarked = bookmark.includes(coffeeShopId);

		if (bookmarked) {
			setIsBookmarked(true);
		} else {
			setIsBookmarked(false);
		}
	}, [bookmark, coffeeShopId]);

	const bookmarkClickHandler = (coffeeShop_id, coffeeShop_ids) => {
		if (isBookmarked) {
			const index = bookmark.indexOf(coffeeShop_id);
			coffeeShop_ids.splice(index, 1);
		} else {
			coffeeShop_ids.unshift(coffeeShop_id);
		}

		setIsBookmarked(!isBookmarked);
		dispatch(actions.setBookmark(coffeeShop_ids));
	};

	const getRatingAvg = (coffeeShopFeedback) => {
		let userAmount = 0;
		let totalEachCoffeeShop = 0;

		for (let user in coffeeShopFeedback) {
			userAmount++;

			const {
				location: { accessibility, comfortability, parking, traffic },
				service: { attentiveness, friendliness, promotion, responsiveness },
				ambience: { cleanliness, design, lightning, music, temperature },
			} = coffeeShopFeedback[user].rating;

			const totalEachUser =
				(accessibility +
					comfortability +
					parking +
					traffic +
					attentiveness +
					friendliness +
					promotion +
					responsiveness +
					cleanliness +
					design +
					lightning +
					music +
					temperature) /
				13;

			totalEachCoffeeShop += totalEachUser;
		}

		const ratingAvg = (totalEachCoffeeShop / userAmount).toFixed(2);

		return ratingAvg;
	};

	return (
		<>
			<Card className="main margin-b-16">
				<img src={header} alt="Coffee Shop Header" className="main__img" />
				<div className="main__grid">
					<div className="main__grid-item">
						<div className="col">
							<h1 className="main__name">{name}</h1>
							<BookmarkButton
								isBookmarked={isBookmarked}
								handleBookmark={() =>
									bookmarkClickHandler(coffeeShopId, bookmark)
								}
							/>
							<Share />
						</div>
						{promo ? <PromoList promos={promo} /> : null}
						<p className="main__address">{address}</p>
					</div>
					<div className="main__grid-item">
						{feedback && (
							<div className="main__overall-rating margin-b-16">
								{getRatingAvg(feedback)}
							</div>
						)}
						<Button
							className="width-100"
							type="outlined"
							onClick={() => setShowAddFeedback(true)}
						>
							Nilai
						</Button>
					</div>
				</div>
			</Card>
			{showAddFeedback && (
				<AddFeedback
					coffeeShopId={coffeeShopId}
					handleClose={() => setShowAddFeedback(false)}
				/>
			)}
		</>
	);
};

export default Header;
