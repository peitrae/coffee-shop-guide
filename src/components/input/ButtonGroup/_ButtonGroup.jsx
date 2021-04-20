import React from 'react';

const ButtonGroup = ({ className, children, isDanger }) => {
	const danger = isDanger ? 'button-group--danger' : '';

	return (
		<div className={`button-group ${danger} ${className}`}>{children}</div>
	);
};

export default ButtonGroup;
