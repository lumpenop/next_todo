'use client'
import React, {useEffect, useRef, useState} from 'react';
import {todoListType} from "~/app/(home)/page";
import ListItem from "~/app/components/list-item";
import Image from "next/image";
import InputLabel from "~/app/components/input-label";
import Button from "~/app/components/button";

import { useRouter } from 'next/navigation'



const Items = ({params: {itemId}}: {params: {itemId: string}}) => {
  const prevMemo = useRef('')
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [item, setItem] = useState<todoListType>()
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const router = useRouter()

  const getItem = async () => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`)
    return response.json()
  }

  const uploadImage = async (formData: FormData) => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/images/upload`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  }
  useEffect(() => {
    if (prevMemo.current === memo) setIsButtonEnabled(false)
    else setIsButtonEnabled(true)
  }, []);

  useEffect(() => {
    prevMemo.current = memo
  }, [memo]);

  useEffect(() => {
    getItem().then(res => {
      setItem(res)
    }).catch(e => console.log(e))
  }, []);

  useEffect(() => {
    if (!item) return
    setItem({...item, imageUrl})
  }, [imageUrl]);

  useEffect(() => {
    if (item) setMemo(item.memo)
  }, [item]);

  const checkEnglish = (fileName: string): boolean => {
    const name = fileName.split('.')[0]
    console.log(name)
    const eng = /^[a-zA-Z]*$/;
    return eng.test(name)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    console.log('checkEnglish', file.name)
    if (!checkEnglish(file.name)) {
      alert('파일 이름은 영어만')
      return
    }
    if (file.size > maxSize) {
      alert('5mb 이내 파일만 가능')
      return
    }

    const formData = new FormData();
    formData.append("image", file);
    console.log(formData.get("image"));
    uploadImage(formData).then(res => {
      setImageUrl(res.url)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setImageSrc(e.target?.result);
        }
      };
    }).catch(e => console.log(e))
  };

  if (!item) return
  const {name, id, isCompleted} = item

  const modifyItem = async () => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ name, isCompleted, imageUrl, memo}),
    })
    response.json().then(res => console.log(res))
  }

  const deleteItem = async () => {
    const response = await fetch(`http://localhost:3000/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`, {method: 'DELETE'})
    if (response.status === 200) {
      router.push('/')
      response.json().then(res => console.log(res))
    }
  }

  const settingModifyColor = (isButtonEnabled: boolean) => {
    let className
    const modifyTextColor = className = 'text-slate-900'
    let modifyBgColor

    if (isButtonEnabled) {
      modifyBgColor = className = 'bg-lime-300'
    }
    else {
      modifyBgColor = className = 'bg-slate-300'
    }

    return {modifyTextColor, modifyBgColor}
  }
  const {modifyTextColor, modifyBgColor} = settingModifyColor(Boolean(imageSrc || memo))

  return (
    <div className={'w-full flex flex-col justify-center'}>
      <div className='w-[100%] flex flex-col'>
        <ListItem text={name} itemId={id} isComplete={isCompleted}/>
        <div className='flex w-full justify-between gap-1 pt-6'>
          <div
            className={`w-[430px] h-[350px] border-dashed border-slate-300 ${!imageSrc && 'border-2'} rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden`}>
            {imageSrc ? <Image src={imageSrc} width={400} height={300} alt='img'/> : <Image src={'/images/img.svg'} width={70} height={70} alt='img'/>}
            <InputLabel handleChange={handleChange} imgSrc={imageSrc} />
          </div>
          <div className='relative flex justify-center'>
            <Image src={'/images/memo.svg'} width={570} height={460} priority alt={'memo'} className={'relative top-0'} />
            <div className='w-full h-[350px] flex flex-col items-center justify-center gap-3 absolute top-0'>
              <h1 className='text-amber-800 font-bold'>Memo</h1>
              <textarea className='w-[500px] h-[250px] resize-none bg-transparent outline-none border-none ' name="memo" id="memo"  cols={30} rows={10} value={memo ? memo : ''} onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => setMemo(e.currentTarget.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3 justify-end pt-4'>
        <Button bgColor={modifyBgColor} textColor={modifyTextColor} onClick={modifyItem} >
          <Image src='/images/check.svg' width={16} height={16} alt={'plus images'}/>
          수정완료
        </Button>
        <Button bgColor={'bg-rose-500'} textColor={'text-slate-100'} onClick={deleteItem} >
          <Image src='/images/X.svg' width={16} height={16} alt={'plus images'}/>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default Items;
