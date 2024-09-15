'use client'
import React, {Dispatch, SetStateAction, useState} from 'react';
import ListItem from "~/app/components/list-item";
import {todoListType} from "~/app/(home)/page";
import NotTodo from "~/app/components/not-todo";
import TodoState from "~/app/(home)/_list/todo-state";

interface Props {
  doList: todoListType[]
  setDoList:  Dispatch<SetStateAction<todoListType[]>>
  doneList: todoListType[]
  setDoneList:  Dispatch<SetStateAction<todoListType[]>>
  isLoading: boolean
}
let className
let todoColor = className = 'bg-lime-300 text-green-700'
let doneColor = className = 'bg-green-700 text-amber-300'

const TodoList = ({doneList,doList,setDoneList,setDoList, isLoading}: Props) => {
  const patchItem = async (item: todoListType) => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${item.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ name: item.name, isCompleted: !item.isCompleted, imageUrl: '', memo: ''}),
    })
    return response.json()
  }

  const doItemClick = async (index: number) => {
    const newDoneList = [...doneList]
    const doItem = doList[index]
    console.log(doItem.id)

    const response = await patchItem(doItem)
    console.log(JSON.stringify(response))
    if (doItem) newDoneList.push(doItem)
    setDoneList(newDoneList)
    const filteredList = doList.filter((_, idx) => idx !== index)
    setDoList(filteredList)
  }
  const doneItemClick = async (index: number) => {
    const newDoList = [...doList]
    const doneItem = doneList[index]
    console.log(doneItem.id)
    const response = await patchItem(doneItem)
    console.log(JSON.stringify(response))
    if (doneItem) newDoList.push(doneItem)
    setDoList(newDoList)
    const filteredList = doneList.filter((_, idx) => idx !== index)
    setDoneList(filteredList)
  }
  return (
    <div className={`flex tablet:flex-col mobile:flex-col gap-10`}>
      <div className='flex flex-col gap-4 w-[500px] mobile:w-[340px]'>
        <div className='w-full'>
          <TodoState text={'TO DO'} colors={todoColor}/>
        </div>
        <ul className={`w-full mobile:w-200px flex flex-col gap-2`}>
          {!isLoading && doList.length === 0 && <NotTodo type={'todo'}/>}
          {doList.map((item, index) => {
            return <li key={index}>
              <ListItem itemId={item.id} text={item.name} onClick={() => doItemClick(index)} isComplete={false}/>
            </li>
          })}
        </ul>
      </div>
      <div className='flex flex-col gap-4 w-[500px] mobile:w-[340px]'>
        <div className='w-full'>
          <TodoState text={'DONE'} colors={doneColor}/>
        </div>
        <ul className={`w-full mobile:w-200px flex flex-col gap-2`}>
          {!isLoading && doneList.length === 0 && <NotTodo type={'done'}/>}
          {doneList.map((item, index) => {
            return <li key={index}>
              <ListItem itemId={item.id} text={item.name} onClick={() => doneItemClick(index)} isComplete={true}/>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
