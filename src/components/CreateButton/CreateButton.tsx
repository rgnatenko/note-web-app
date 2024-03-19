import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  btnClass: string,
};

export const CreateButton: React.FC<Props> = ({ btnClass }) => {
  return (
    <Link
      to="/create"
      className={btnClass}
    >
      <img src="icons/plus.svg" alt="add note" />
    </Link>
  );
};
