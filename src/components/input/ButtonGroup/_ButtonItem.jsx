import React from 'react';

import { Button } from '../../UI/Button';

const ButtonItem = ({
	type = 'outlined',
	size,
	className,
	children,
	onClick,
}) => (
	<Button
		type={type}
		size={size}
		className={`button-item ${className}`}
		onClick={onClick}
	>
		{children}
	</Button>
);

export default ButtonItem;
