import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SignUp from '../../components/SignUp';
import Navbar from '../../components/UI/Navbar';
import { Button } from '../../components/UI/Button';
import { AddPreferences } from '../../modules/Home';
import * as actions from '../../store/actions/member';

const Homepage = ({ history }) => {
	const dispatch = useDispatch();

	const [showPreference, setShowPreference] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);

	const { token: authenticated, preference } = useSelector(
		({ member }) => member
	);

	const handleShowPreferenceToogle = () => setShowPreference(!showPreference);

	const handleCloseSignUp = () => {
		setShowSignUp(false);

		dispatch(actions.deleteResponse());
	};

	const handleSearch = () => {
		preference ? history.push('/search') : handleShowPreferenceToogle();
	};

	return (
		<>
			<Navbar className="navbar--transparent" />
			<div
				className={`homepage ${
					authenticated ? 'homepage--member' : 'homepage--guest'
				}`}
			>
				<div className="homepage__container">
					<span className="homepage__text margin-b-16">
						Temukan kedai kopi terbaik untukmu di Kota Malang
					</span>
					{authenticated ? (
						<Button size="lg" onClick={handleSearch}>
							Cari
						</Button>
					) : (
						<Button size="lg" onClick={() => setShowSignUp(true)}>
							Daftar
						</Button>
					)}
				</div>
			</div>
			{showSignUp ? <SignUp handleClose={handleCloseSignUp} /> : null}
			{showPreference && (
				<AddPreferences handleClose={handleShowPreferenceToogle} />
			)}
		</>
	);
};

export default Homepage;
