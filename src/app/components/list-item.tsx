import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface Props {
  text: string
  isComplete: boolean
  onClick: () => void
  itemId: number
}
const ListItem = ({text, onClick, isComplete, itemId}:Props) => {
  return (
    <div className={`${isComplete && 'bg-violet-100'} rounded-[24px] w-full border-2 py-1 px-2 flex items-center gap-x-3`}>
      <button onClick={onClick} >
        <Image src={`/images/${isComplete ? 'Frame' : 'Default'}.svg`} width={24} height={24} alt={'check box'}/>
      </button>
      <Link href={`/items/${itemId}`} className='w-full text-left' >
        <span className={`${isComplete ? 'line-through' : ''}`}>{text}</span>
      </Link>
    </div>
  );
};
export default ListItem;
