import React, {Dispatch, SetStateAction, useState} from 'react';
import TodoState from "~/app/(home)/list/todo-state";
import ListItem from "~/app/(home)/list/list-item";
import TodoList from "~/app/(home)/list/todo-list";


interface Props {
  doList: string[]
  setDoList:  Dispatch<SetStateAction<string[]>>
  doneList: string[]
  setDoneList:  Dispatch<SetStateAction<string[]>>
}
const ListSection = ({doList, doneList, setDoList, setDoneList}:Props) => {
  let className
  let todoColor = className = 'bg-lime-300 text-green-700'
  let doneColor = className = 'bg-green-700 text-amber-300'

  return (
    <section className='grid gap-y-4 mt-10'>
      <div className='grid grid-cols-2 gap-10'>
        <div className='w-[500px]'>
          <TodoState text={'TO DO'} colors={todoColor}/>
        </div>
        <div className='w-[500px]'>
          <TodoState text={'DONE'} colors={doneColor}/>
        </div>
      </div>
      <TodoList doList={doList} doneList={doneList} setDoList={setDoList} setDoneList={setDoneList}/>
    </section>
  );
};

export default ListSection;
