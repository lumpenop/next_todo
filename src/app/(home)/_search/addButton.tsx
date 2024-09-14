'use client'
import React, {useState} from 'react';
import RoundedShadow from "~/app/components/rounded-shadow";
import Image from "next/image";
import Button from "~/app/components/button";


interface Props {
  isButtonEnabled: boolean
  addButtonClick: () => void
}


const settingColor = (isButtonEnabled: boolean) => {
  let className
  let textColor
  let bgColor
  let imageColor

  if (isButtonEnabled) {
    bgColor = className = 'bg-violet-600'
    textColor = className = 'text-slate-100'
  }
  else {
    bgColor = className = 'bg-slate-300'
    textColor = className = 'text-slate-900'
    imageColor = className = 'dark:invert'
  }

  return {textColor, bgColor, imageColor}
}

const AddButton = ({isButtonEnabled, addButtonClick}: Props) => {
  let text = '추가하기'
  const {textColor, bgColor, imageColor} = settingColor(isButtonEnabled)

  return (
    <>
      <Button onClick={addButtonClick} bgColor={bgColor} textColor={textColor}>
          <Image src='/images/plus.svg' width={16} height={16} className={imageColor} alt={'plus images'}/>
          {text}
      </Button>
    </>
  )
    ;
};

export default AddButton;
