import React from 'react';
import cls from 'classnames';
import buttonGroup from './buttonGroup.module.scss';

interface Props {
  className?: string;
  variant?: 'horizontal' | 'right' | 'center' | 'vertical';
}

const ButtonGroup: React.FC<Props> = ({ children, className, variant = 'horizontal' }) => (
  <div
    className={cls(className, {
      [buttonGroup[variant]]: variant,
    })}
  >
    {children}
  </div>
);

export default ButtonGroup;
