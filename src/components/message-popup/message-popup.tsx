import * as React from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

import {ActionCreator} from "../../store/action";

const MessagePopup = ({text, buttonText, path, deletePopupStatus}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (path) {
      navigate("/");
    }
    deletePopupStatus();
  }

  return (
    <div className="message-popup">
      <span className="message-popup__text">{text}</span>
      <Button className="message-popup__button"
        variant="contained"
        size="large"
        onClick={() => handleButtonClick()}>
        {buttonText}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deletePopupStatus() {
    dispatch(ActionCreator.showPopup(null))
  }
});

export {MessagePopup};
export default connect(null, mapDispatchToProps)(MessagePopup);