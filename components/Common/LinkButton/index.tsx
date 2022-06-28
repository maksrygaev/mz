import React from 'react';
import cls from 'classnames';
import Link from 'next/link';

interface Props {
  href: string;
  icon: string;
  // type?: 'primary';
}

const LinkButton: React.FC<Props> = ({ href, children, icon, ...props }) => {
  // const classes = cls(`ant-btn`, { [`btn-link-white-rounded`]: Boolean(type) });
  return (
    <Link href={href} {...props}>
      <a className={'btn-link-white-rounded'}>
        {children} <img src={icon} alt="imageicon" />
      </a>
    </Link>
  );
};

export default LinkButton;
