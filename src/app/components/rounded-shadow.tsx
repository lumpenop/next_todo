import React from 'react';
import color from 'tailwindcss/colors'




interface Props {
  bgColor: string
}


const RoundedShadow = ({bgColor,children}: Props) => {
  return (
    <div className={`inline-flex items-center rounded-[24px] border-[2px] border-stale-900 overflow-hidden shadow-[3px_3px_#000] px-6 py-3 ${bgColor}`}>
      {children}
    </div>
  );
};

export default RoundedShadow;
