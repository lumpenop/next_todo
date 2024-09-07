'use client'
import React, {Dispatch, SetStateAction, useState} from 'react';
import ListItem from "~/app/(home)/list/list-item";

interface Props {
  doList: string[]
  setDoList:  Dispatch<SetStateAction<string[]>>
  doneList: string[]
  setDoneList:  Dispatch<SetStateAction<string[]>>
}
const TodoList = ({doneList,doList,setDoneList,setDoList}: Props) => {
  const doItemClick = (index: number) => {
    const newDoneList = [...doneList]
    const doItem = doList[index]
    if (doItem) newDoneList.push(doItem)
    setDoneList(newDoneList)
    const filteredList = doList.filter((_, idx) => idx !== index)
    setDoList(filteredList)
  }
  const doneItemClick = (index) => {
    const newDoList = [...doList]
    const doneItem = doneList[index]
    if (doneItem) newDoList.push(doneItem)
    setDoList(newDoList)
    const filteredList = doneList.filter((_, idx) => idx !== index)
    setDoneList(filteredList)
  }
  return (
    <div className={`grid grid-cols-2 gap-x-10`}>
      <ul className={`w-full flex flex-col gap-2`}>
        {doList.map((item, index) => {
          return <li key={index}><ListItem text={item} onClick={() => doItemClick(index)} isDone={false}/></li>
        })}
      </ul>
      <ul className={`w-full flex flex-col gap-2`}>
        {doneList.map((item, index) => {
          return <li key={index}><ListItem text={item} onClick={() => doneItemClick(index)} isDone={true}/></li>
        })}
      </ul>
    </div>
  );
};

export default TodoList;
