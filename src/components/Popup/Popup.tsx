import React from 'react';
import { ButtonWithIcon } from '../../ui/ButtonWithIcon';
import { Link } from 'react-router-dom';

type Props = {
  succesfullMessage: string,
  onClose: () => void
}

export const Popup: React.FC<Props> = ({ succesfullMessage, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup__text-block">
          <p className="text-body">{succesfullMessage}</p>
        </div>

        <ButtonWithIcon
          title="clear text"
          btnClass="popup__close icon icon--close"
          onClick={() => onClose()}
        />

        <div className="icon icon--check" />

        <Link
          to="/"
          className="popup__btn"
        >
          Back to main page
        </Link>
      </div>
    </div>
  );
};
