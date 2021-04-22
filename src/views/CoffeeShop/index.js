import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Main from './components/Main';
import Images from './components/Images';
import Information from './components/Information';
import Review from './components/Review';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner';
import Navbar from '../../components/UI/Navbar';
import Footer from '../../components/UI/Footer';

const CoffeeShop = () => {
	const { id: coffeeShopId } = useParams();
	const dispatch = useDispatch();
	const loading = useSelector(({ coffeeShop }) => coffeeShop.loading);

	useEffect(() => {
		dispatch(actions.getCoffeeShop(coffeeShopId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coffeeShopId]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<Navbar />
			<div className="coffeeshop">
				<div className="coffeeshop__container">
					<Main />
					<Information />
					<Images />
					<Review />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default CoffeeShop;
