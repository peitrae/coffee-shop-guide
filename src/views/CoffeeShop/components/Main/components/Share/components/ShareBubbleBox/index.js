import React from "react";

import BubbleBox from "../../../../../../../../components/UI/BubbleBox";
import Button from "../../../../../../../../components/UI/Button";
import InputField from "../../../../../../../../components/UI/InputField/InputField";
import WhatsappIcon from "../../../../../../../../assets/icon/WhatsappIcon";
import EmailIcon from "../../../../../../../../assets/icon/EmailIcon";
import CopyIcon from "../../../../../../../../assets/icon/CopyIcon";

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
    <a
      href={`https://api.whatsapp.com/send?text=${link}`}
      data-action="share/whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      className="margin-b-6"
    >
      <Button icon={WhatsappIcon} className="share-bbx__btn">
        Share via Whatsapp
      </Button>
    </a>
    <a
      href={`mailto:?body=${link}`}
      data-action="share/email"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button icon={EmailIcon} className="share-bbx__btn share-bbx__btn--blue">
        Share via Email
      </Button>
    </a>
  </BubbleBox>
);

export default ShareBubbleBox;
