import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import TodoList from "~/app/(home)/_list/todo-list";
import StateSection from "~/app/(home)/_list/state-section";
import {todoListType} from "~/app/(home)/page";


interface Props {
  allList: todoListType[]
  setAllList:  Dispatch<SetStateAction<todoListType[]>>
  isLoading: boolean
}
const ListSection = ({allList, setAllList, isLoading}:Props) => {
  const [todoList, setTodoList] = useState<todoListType[]>([])
  const [doneList, setDoneList] = useState<todoListType[]>([])
  useEffect(() => {
    const todos = allList.filter(todo => !todo.isCompleted)
    const dones  = allList.filter(todo => todo.isCompleted)
    setTodoList(todos)
    setDoneList(dones)
  }, [allList]);
  let className
  let todoColor = className = 'bg-lime-300 text-green-700'
  let doneColor = className = 'bg-green-700 text-amber-300'

  useEffect(() => {

  }, []);

  return (
    <section className='grid gap-y-4 mt-10'>
      <StateSection todoColor={todoColor} doneColor={doneColor} />
      <TodoList doList={todoList} doneList={doneList} setDoList={setTodoList} setDoneList={setDoneList} isLoading={isLoading} />
    </section>
  );
};

export default ListSection;
