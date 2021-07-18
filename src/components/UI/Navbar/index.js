import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Login from '../../Login';
import { Button } from '../Button';
import ProfileButton from './components/ProfileButton';
import ProfileMenu from './components/ProfileMenu';
import * as actions from '../../../store/actions/member';

const Navbar = ({ className }) => {
	const dispatch = useDispatch();
	const profileRef = useRef();

	const [showLogin, setShowLogin] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const profile = useSelector(({ member }) => member);

	const handleShowProfileMenuToogle = () => {
		setShowProfileMenu(!showProfileMenu);
	};

	const handleCloseLogin = () => {
		setShowLogin(false);
		dispatch(actions.deleteResponse());
	};

	return (
		<>
			<div className={`navbar ${className} `}>
				<NavLink to={'/'} className="navbar__logo">
					CoffeeShopGuide
				</NavLink>
				{profile.token ? (
					<div className="navbar__list">
						<NavLink to={'/'} className="navbar__link">
							Beranda
						</NavLink>
						{profile.preference && (
							<NavLink to={'/search'} className="navbar__link">
								Pencarian
							</NavLink>
						)}
						<div className="navbar__separator" />
						<div className="navbar__profile">
							<ProfileButton
								ref={profileRef}
								onClick={handleShowProfileMenuToogle}
							/>
							{showProfileMenu && (
								<ProfileMenu handleClose={handleShowProfileMenuToogle} />
							)}
						</div>
					</div>
				) : (
					<Button
						type="outlined"
						color="secondary"
						className="navbar__btn-login"
						onClick={() => setShowLogin(true)}
					>
						Masuk
					</Button>
				)}
			</div>
			{showLogin ? <Login handleClose={handleCloseLogin} /> : null}
		</>
	);
};

export default Navbar;
