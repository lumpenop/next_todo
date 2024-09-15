import React, {ReactNode} from 'react';
import RoundedShadow from "~/app/components/rounded-shadow";
import Image from "next/image";

interface Props {
  bgColor: string
  textColor: string
  onClick: () => void
  isAdd?: boolean
  children: ReactNode
}
const Button = ({bgColor, onClick, textColor, isAdd, children}: Props) => {
  return (
    <button onClick={onClick} className='rounded-[24px]'>
      <RoundedShadow bgColor={bgColor} isAdd={isAdd}  >
        <div className={`flex items-center justify-around w-[90px] ${isAdd && 'mobile:w-[20px]'} ${bgColor} ${textColor}`}>
          {children}
        </div>
      </RoundedShadow>
    </button>
)
  ;
};

export default Button;
