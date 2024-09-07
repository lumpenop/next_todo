import React from 'react';
import Image from "next/image";

const Gnb = () => {
  return (
    <nav className='w-screen h-[60px] border-b-[1px] border-slate-200 flex items-center justify-center'>
      <div className='min-w-[1014px]'>
        <Image
          src="/images/Large.svg"
          width={151}
          height={40}
          alt="logo size large"
        />
      </div>
    </nav>
  );
};

export default Gnb;
