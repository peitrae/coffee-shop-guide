import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Profile from './components/Profile';
import BookmarkList from './components/BookmarkList';
import EditProfile from './components/EditProfile';
import EditPassword from './components/EditPassword';
import SendVerification from './components/SendVerification';
import Navbar from '../../components/UI/Navbar';
import Spinner from '../../components/UI/Spinner';
import Footer from '../../components/UI/Footer';
import CoffeeShopList from './components/CoffeeShopList';
import EditPreferences from '../../modules/Profile/_EditPreferences';

const ProfilePage = () => {
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showEditPassword, setShowEditPassword] = useState(false);
	const [showEditPreference, setShowEditPreference] = useState(false);
	const [showVerification, setShowVerification] = useState(false);

	const profile = useSelector(({ member }) => member);

	if (!profile.localId) {
		return <Spinner />;
	}

	return (
		<>
			<Navbar />
			<div className="profile-page">
				{!showEditProfile && !showEditPassword ? (
					<Profile
						profile={profile}
						handleShowEditProfile={() => setShowEditProfile(true)}
						handleShowEditPassword={() => setShowEditPassword(true)}
						handleShowEditPreference={() => setShowEditPreference(true)}
						handleShowVerification={() => setShowVerification(true)}
					/>
				) : showEditProfile ? (
					<EditProfile
						profile={profile}
						handleClose={() => setShowEditProfile(false)}
					/>
				) : showEditPassword ? (
					<EditPassword handleClose={() => setShowEditPassword(false)} />
				) : null}
				{showVerification ? (
					<SendVerification handleClose={() => setShowVerification(false)} />
				) : null}
				{profile.emailVerified ? <CoffeeShopList /> : null}
				<BookmarkList bookmarkIds={profile.bookmark} />
			</div>
			{showEditPreference && (
				<EditPreferences
					preferences={profile.preference}
					handleClose={() => setShowEditPreference(false)}
				/>
			)}
			<Footer />
		</>
	);
};

export default ProfilePage;
