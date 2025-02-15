'use client'

import { KeyboardEvent, useState } from 'react'
import { Input } from '@/components/default/Input'
import { Trash2, Plus } from 'lucide-react' // Импортируем иконку Plus
import { Button } from '@/components/default/Button' // Импортируем компонент Button

interface TagInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
}

export const CreateTagInput = ({ tags, setTags }: TagInputProps) => {
  const [tagInput, setTagInput] = useState('')

  // Функция для добавления тега
  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('') // Очищаем поле ввода
    }
  }

  // Обработка нажатия Enter
  const handleTagKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      event.preventDefault()
      addTag()
    }
  }

  // Удаление тега
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <div className='mb-8'>
      <h1 className='font-semibold text-xl'>Тэги</h1>
      <div
        className={`flex flex-wrap gap-2 max-w-full ${tags.length > 0 && 'mt-4'}`}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className='px-3 py-1 text-sm border border-border rounded-full flex items-center gap-2'
          >
            {tag}
            <button
              type='button'
              className='opacity-50 font-semibold'
              onClick={() => removeTag(tag)}
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </span>
        ))}
      </div>
      <div className='flex gap-2 items-center'>
        <Input
          placeholder='Укажите тэги к задаче'
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyPress}
          className='placeholder:text-foreground placeholder:opacity-30 p-0 pb-6 pt-10 rounded-none bg-transparent text-lg border-0 border-b-[0.5px] border-b-border flex-1'
        />
        <Button
          size='icon'
          onClick={addTag}
          className='p-2 rounded-full hover:bg-primary/10 transition-colors'
          disabled={tagInput.trim() === ''}
        >
          <Plus className='w-6 h-6' />
        </Button>
      </div>
    </div>
  )
}
