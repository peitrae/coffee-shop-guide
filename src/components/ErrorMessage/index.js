import React from 'react';

const ErrorMessage = ({ children, className }) => {
	const checkErrorMessage = (message) => {
		switch (message) {
			case 'INVALID_EMAIL':
				return 'Email salah';
			case 'WEAK_PASSWORD : Password should be at least 6 characters':
				return 'Password harus terdiri dari minimal 6 karakter';
			case 'MISSING_EMAIL':
				return 'Email salah';
			case 'INVALID_PASSWORD':
				return 'Password salah';
			case 'MISSING_PASSWORD':
				return 'Password salah';
			case 'EMAIL_NOT_FOUND':
				return 'Email tidak terdaftar';
			case 'EMAIL_EXISTS':
				return 'Email telah digunakan oleh pengguna lain';
			case 'PASSWORD_NOT_MATCH':
				return 'Password tidak sama';
			case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
				return 'Autentikasi telah usang. Silahkan melakukan login kembali';
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
