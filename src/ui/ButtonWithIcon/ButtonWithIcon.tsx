import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link?: string,
  btnClass: string,
  onClick?: () => void,
  title?: string
};

export const ButtonWithIcon: React.FC<Props> = ({
  link, btnClass, onClick, title
}) => {
  return (
    <>
      {link ? (
        <Link
          to={link}
          className={btnClass}
          title={title}
        />
      ) : (
        <button
          className={btnClass}
          onClick={onClick}
          title={title}
        />
      )}
    </>
  );
};
