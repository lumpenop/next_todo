'use client'
import React, {useEffect, useState} from 'react';
import {todoListType} from "~/app/(home)/page";
import ListItem from "~/app/components/list-item";
import Image from "next/image";
import InputLabel from "~/app/components/input-label";

const Items = ({params: {itemId}}: {params: {itemId: string}}) => {
  const [item, setItem] = useState<todoListType>()
  const [imgSrc, setImgSrc] = useState<string>('');
  const [memo, setMemo] = useState<string>('')

  const getItem = async () => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`)
    return response.json()
  }
  useEffect(() => {
    getItem().then(res => setItem(res)).catch(e => console.log(e))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };

  if (!item) return
  const {name, id, isCompleted} = item

  return (
    <div className={'w-full flex justify-center'}>
      <div className='w-[100%] flex flex-col'>
        <ListItem text={name} itemId={id} isComplete={isCompleted}/>
        <div className='flex w-full justify-between gap-1 pt-6'>
          <div
            className={`w-[400px] h-[300px] border-dashed border-slate-300 ${!imgSrc && 'border-2'} rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden`}>
            {imgSrc ? <Image src={imgSrc} width={400} height={300} alt='img'/> : <Image src={'/images/img.svg'} width={70} height={70} alt='img'/>}
            <InputLabel handleChange={handleChange} imgSrc={imgSrc} />
          </div>
          <div className='w-[600px] h-[300px] relative flex items-center justify-center'>
            <Image src={'/images/memo.svg'} width={490} height={300} priority alt={'memo'} />
            <div className='w-full h-[300px] flex flex-col items-center justify-center gap-3 absolute top-0'>
              <h1 className='text-amber-800 font-bold'>Memo</h1>
              <textarea className='w-[440px] h-[300px] resize-none bg-transparent outline-none border-none ' name="memo" id="memo"  cols={30} rows={10} value={memo} onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => setMemo(e.currentTarget.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
