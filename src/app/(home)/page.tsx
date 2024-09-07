'use client'
import SearchSection from "~/app/(home)/search/search-section";
import ListSection from "~/app/(home)/list/list-section";
import {useState} from "react";

const Home = () => {
    // ide 에서 className='' 규칙을 사용하여 자동 완성 기능을 사용하기 위한..
  const [doList, setDoList] = useState<string[]>(['test', 'test1' , 'test3'])
  const [doneList, setDoneList] = useState<string[]>(['test', 'test1' , 'test3'])

  const addOdItem = (text: string) => {
    setDoList([...doList, text])
  }

  return (
      <div>
        <div className='w-screen flex justify-center'>
          <div className='min-w-[1014px] pt-6'>
            <SearchSection addOdItem={addOdItem} />
            <ListSection doList={doList} setDoList={setDoList} doneList={doneList} setDoneList={setDoneList} />
          </div>
        </div>
      </div>
  )
}
export default Home
