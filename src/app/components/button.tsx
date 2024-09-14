import React, {ReactNode} from 'react';
import RoundedShadow from "~/app/components/rounded-shadow";
import Image from "next/image";

interface Props {
  bgColor: string
  textColor: string
  onClick: () => void
  children: ReactNode
}
const Button = ({bgColor, onClick, textColor, children}: Props) => {
  return (
    <button onClick={onClick} className='rounded-[24px]'>
      <RoundedShadow bgColor={bgColor}>
        <div className={`flex items-center justify-around w-[90px] ${bgColor} ${textColor}`}>
          {children}
        </div>
      </RoundedShadow>
    </button>
)
  ;
};

export default Button;
