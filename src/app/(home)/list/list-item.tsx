import React from 'react';
import Image from "next/image";

interface Props {
  text: string
  isDone: boolean
  onClick: () => void
}
const ListItem = ({text, onClick, isDone}:Props) => {
  return (
    <button onClick={onClick} className={`${isDone && 'bg-violet-100'} rounded-[24px] w-full border-2 py-1 px-2 flex items-center gap-x-3`}>
      <Image src={`/images/${isDone ? 'Frame' : 'Default'}.svg`} width={24} height={24} alt={'check box'} />
      <span className={`${isDone ? 'line-through' : ''}`}>{text}</span>
    </button>
  );
};

export default ListItem;
