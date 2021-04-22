import React from 'react';

import SqueareFaceHappyIcon from '../../../../../../../../assets/icon/SqueareFaceHappyIcon';
import SquareFaceSmilingIcon from '../../../../../../../../assets/icon/SquareFaceSmilingIcon';
import SquareFaceSadSleepyIcon from '../../../../../../../../assets/icon/SquareFaceSadSleepyIcon';
import SquareFaceSadIcon from '../../../../../../../../assets/icon/SquareFaceSadIcon';
import SquareFaceDoubtIcon from '../../../../../../../../assets/icon/SquareFaceDoubtIcon';

const EmotionRating = ({ rating }) => {
	const icons = {
		pleased: <SqueareFaceHappyIcon />,
		satisfied: <SquareFaceSmilingIcon />,
		doubt: <SquareFaceDoubtIcon />,
		disappointed: <SquareFaceSadIcon />,
		upset: <SquareFaceSadSleepyIcon />,
	};

	const label = {
		5: 'pleased',
		4: 'satisfied',
		3: 'doubt',
		2: 'disappointed',
		1: 'upset',
	};

	return (
		<div
			className={`emotion-rating emotion-rating--${label[rating.toFixed(0)]}`}
		>
			<div className="emotion-rating__icon margin-r-6">
				{icons[label[rating.toFixed(0)]]}
			</div>
			<div className="emotion-rating__score">{`${rating}/5`}</div>
		</div>
	);
};

export default EmotionRating;
