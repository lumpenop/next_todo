import React from 'react';
import RoundedShadow from "~/app/components/rounded-shadow";
import Image from "next/image";

interface Props {
  bgColor: string
  textColor: string
  onClick: () => void
  text: string
}
const Button = ({bgColor, onClick, text, textColor}: Props) => {
  return (
    <button onClick={onClick} className='rounded-[24px]'>
      <RoundedShadow bgColor={bgColor}>
        <div className={`flex items-center justify-around w-[90px] ${bgColor} ${textColor}`}>
          <Image src='/images/plus.svg' width={16} height={16} className="dark:invert" alt={'plus'}/>
          {text}
        </div>
      </RoundedShadow>
    </button>
)
  ;
};

export default Button;
