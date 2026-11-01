import type { FC, ReactNode } from 'react';

export const Container: FC<IProps> = ({ children, style }) => {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 ${style ?? ''}`}>
      {children}
    </div>
  );
};

interface IProps {
  children: ReactNode;
  style?: string;
}
