import React from 'react';

import BubbleBox from '../../../components/UI/BubbleBox';
import InputField from '../../../components/UI/InputField/InputField';
import CopyIcon from '../../../assets/icon/CopyIcon';

const ShareBubbleBox = ({ handleClose, link, handleCopyLink }) => (
	<BubbleBox className="share-bbx" onClickOutside={handleClose}>
		<h4 className="share-bbx__title">Share</h4>
		<InputField
			value={link}
			rightIcon={<CopyIcon />}
			rightOnClick={() => handleCopyLink(link)}
			disabled={true}
			className="margin-b-12"
		/>
	</BubbleBox>
);

export default ShareBubbleBox;
