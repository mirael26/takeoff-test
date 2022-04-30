import * as React from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

import {ActionCreator} from "../../store/action";
import {Dispatch} from "../../types";

interface MessagePopupProps {
  popup: {text: string, buttonText: string},
  path: string,
  deletePopupStatus(): void,
}

const MessagePopup = ({popup, path, deletePopupStatus}: MessagePopupProps): JSX.Element => {
  const navigate = useNavigate();

  const handleButtonClick = (): void => {
    if (path) {
      navigate("/");
    }
    deletePopupStatus();
  }

  return (
    <div className="message-popup">
      <span className="message-popup__text">{popup.text}</span>
      <Button className="message-popup__button"
        variant="contained"
        size="large"
        onClick={handleButtonClick}>
        {popup.buttonText}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deletePopupStatus(): void {
    dispatch(ActionCreator.showPopup(null))
  }
});

export {MessagePopup};
export default connect(null, mapDispatchToProps)(MessagePopup);