import React from 'react';

const ErrorMessage = ({ children, className }) => {
	const checkErrorMessage = (message) => {
		switch (message) {
			case 'INVALID_EMAIL':
				return 'Invalid Email';
			case 'WEAK_PASSWORD : Password should be at least 6 characters':
				return 'Password should be at least 6 characters';
			case 'MISSING_EMAIL':
				return 'Email is empty';
			case 'INVALID_PASSWORD':
				return 'Invalid Password';
			case 'MISSING_PASSWORD':
				return 'Password is empty';
			case 'EMAIL_NOT_FOUND':
				return 'Email not found';
			case 'EMAIL_EXISTS':
				return 'The email address is already in use by another account';
			case 'PASSWORD_NOT_MATCH':
				return 'Password not match';
			case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
				return 'Please login again';
			case 'Request failed with status code 404':
				return 'Terjadi gangguan koneksi. Mohon coba lagi';
			case 'Network Error':
				return 'Terjadi gangguan koneksi. Mohon coba lagi';
			default:
				return message;
		}
	};

	return (
		<div className={`error-message ${className}`}>
			{checkErrorMessage(children)}
		</div>
	);
};

export default ErrorMessage;
