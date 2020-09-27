import React from "react";

import BubbleBox from "../../../../components/UI/BubbleBox/BubbleBox";
import Button from "../../../../components/UI/Button/Button";
import TextIconField from "./TextIconField/TextIconField";

import "./Share.scss";
import WhatsappIcon from "../../../../assets/icon/WhatsappIcon";
import EmailIcon from "../../../../assets/icon/EmailIcon";

const Share = ({ link, onClickOutside }) => {
  const fieldClickHandler = (event, text) => {
    event.preventDefault();
    const input = document.createElement("input");
    input.style = "position:absolute;opacity:0";
    input.value = text;
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  };

  return (
    <BubbleBox className="share" onClickOutside={onClickOutside}>
      <h4 className="share-title">Share</h4>
      <div className="share-link-grp">
        <TextIconField value={link} onClick={fieldClickHandler} />
      </div>
      <div className="share-opts-grp">
        <a
          href={`https://api.whatsapp.com/send?text=${link}`}
          data-action="share/whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button icon={WhatsappIcon} className="opts-whatsapp-btn">
            Share via Whatsapp
          </Button>
        </a>
        <a
          href={`mailto:?body=${link}`}
          data-action="share/email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button icon={EmailIcon} className="opts-email-btn">
            Share via Email
          </Button>
        </a>
      </div>
    </BubbleBox>
  );
};

export default Share;
