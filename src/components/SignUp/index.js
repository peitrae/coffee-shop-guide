import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../UI/Modal';
import ErrorMessage from '../ErrorMessage';
import { Button } from '../UI/Button';
import Spinner from '../UI/Spinner';
import InputField from '../UI/InputField/InputField';
import * as actions from '../../store/actions/member';

const SignUp = ({ handleClose }) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [signUp, setSignUp] = useState({
		name: '',
		email: '',
		password: '',
	});

	const response = useSelector(({ member }) => member.response);
	const authenticated = useSelector(({ member }) => member.token !== null);

	useEffect(() => {
		response && setLoading(false);
		authenticated && handleClose();
	}, [response, authenticated, handleClose]);

	const handleInputChange = (e) => {
		setSignUp({ ...signUp, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setLoading(true);

		dispatch(actions.signUp(signUp.email, signUp.password, signUp.name));
		setSignUp({ ...signUp, password: '' });
	};

	if (loading) {
		return (
			<Modal className="auth auth--signup">
				<Spinner />
			</Modal>
		);
	}

	return (
		<Modal handleClose={handleClose} className="auth auth--signup">
			<h1 className="auth__title">Daftar</h1>
			{response?.error ? (
				<ErrorMessage className="auth__error auth__error--signup">
					{response.error.message}
				</ErrorMessage>
			) : null}
			<form className="auth__form" onSubmit={submitHandler}>
				<InputField
					name="name"
					placeholder="Nama"
					value={signUp.name}
					onChange={handleInputChange}
					className="margin-v-16"
				/>
				<InputField
					name="email"
					placeholder="Email"
					value={signUp.email}
					onChange={handleInputChange}
					className="margin-b-16"
				/>
				<InputField
					name="password"
					placeholder="Minimal password 6 karakter"
					value={signUp.password}
					onChange={handleInputChange}
					type="password"
				/>
			</form>
			<Button onClick={submitHandler}>Daftar</Button>
		</Modal>
	);
};

export default SignUp;
