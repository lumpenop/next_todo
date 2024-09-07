'use client'
import React, {useEffect, useState} from 'react';
import Search from "~/app/(home)/search/search";
import AddButton from "~/app/(home)/search/addButton";


interface Props {
  addOdItem: (text: string) => void
}
const SearchSection = ({addOdItem}: Props) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (text === '') setIsButtonEnabled(false)
    else setIsButtonEnabled(true)
  }, [text]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };


  let className
  let searchBgColor = className = 'bg-slate-100'
  const addButtonClick = () => {
    addOdItem(text)
    setText('')
  }

  return (
    <section className='flex items-center justify-between'>
      <Search bgColor={searchBgColor} onChange={onChange} text={text}/>
      <AddButton isButtonEnabled={isButtonEnabled} addButtonClick={addButtonClick}/>
    </section>
  );
};

export default SearchSection;
