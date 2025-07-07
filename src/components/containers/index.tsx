import { FC, ReactNode } from 'react';

export const Container: FC<IProps> = ({ children, style }) => {
  return (
    <main
      className={`flex flex-col flex-1 mx-auto max-w-[1040px] h-full bg-white border-l border-r border-gray-200 ${
        style ?? ''
      }`}
    >
      {children}
    </main>
  );
};

interface IProps {
  children: ReactNode;
  style?: string;
}
