'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useSearchParams } from 'next/navigation'

import * as z from 'zod'

import { useToast } from '@/hooks/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { BidSchema } from '@/schemas/bid'

import { Button } from '@/components/default/Button'
import { Form } from '@/components/default/Form'

import { CreateInput } from '@/components/layout/Create/CreateInput'
import { CreateTextarea } from '@/components/layout/Create/CreateTextarea'
import { CreateTagInput } from '@/components/layout/Create/CreateTagInput'

import { PulseLoader } from 'react-spinners'

export const CreateForm = () => {
  const { toast } = useToast()

  const [isPending, setIsPending] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([])

  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof BidSchema>>({
    resolver: zodResolver(BidSchema),
    defaultValues: {
      token: searchParams.get('token') || '',
      title: '',
      description: '',
      budgetFrom: 5000,
      budgetTo: 10000,
      deadlineDays: 3,
      qtyFreelancers: 1,
    },
  })

  useEffect(() => {
    const token = form.watch('token')
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [form.watch('token')])

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      form.setValue('token', savedToken)
    }
  }, [form])

  const onSubmit = async (values: z.infer<typeof BidSchema>) => {
    const finalData = { ...values, tags }

    setIsPending(true)

    try {
      const rules = JSON.stringify({
        budget_from: finalData.budgetFrom,
        budget_to: finalData.budgetTo,
        deadline_days: finalData.deadlineDays,
        qty_freelancers: finalData.qtyFreelancers,
      })

      const queryParams = new URLSearchParams({
        token: finalData.token,
        title: finalData.title,
        description: finalData.description,
        tags: tags.join(','),
        budget_from: finalData.budgetFrom.toString(),
        budget_to: finalData.budgetTo.toString(),
        deadline: finalData.deadlineDays.toString(),
        reminds: '3',
        all_auto_responses: 'false',
        rules: rules,
      }).toString()

      const response = await fetch(
        `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?${queryParams}`,
        {
          method: 'GET',
        },
      )

      if (response.ok) {
        toast({
          title: 'Задача создана',
          description: 'Код: 200',
        })
      } else {
        toast({
          title: 'Произошла ошибка',
          description: 'Код: 401',
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string,
  ) => {
    const { value } = event.target
    form.setValue(fieldName as keyof z.infer<typeof BidSchema>, value)
  }

  return (
    <div className='max-sm:p-0 max-sm:px-6 max-sm:min-h-screen max-sm:overflow-auto max-sm:border-none max-sm:rounded-none max-sm:flex max-sm:items-center max-sm:justify-center p-8 w-full max-w-[36rem] border border-border rounded-3xl shadow-2xl'>
      <div className='max-h-[80vh] overflow-y-auto'>
        <div className='mb-6 max-sm:mb-2'>
          <h1 className='font-bold text-3xl max-sm:text-2xl'>Создать задачу</h1>
          <p className='font-semibold text-lg opacity-50 mt-1 max-sm:text-base'>
            Что нужно сделать?
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='max-sm:max-h-[40rem] h-fit max-h-[30rem] overflow-y-scroll'>
              <div>
                <div className='mb-8'>
                  <CreateInput
                    control={form.control}
                    name='token'
                    label='Токен'
                    placeholder='Вставьте токен'
                    value={form.watch('token')}
                    error={!!form.formState.errors.token}
                    onChange={onChange}
                  />
                </div>
                <div className='mb-8'>
                  <CreateInput
                    control={form.control}
                    name='title'
                    label='Название'
                    placeholder='Что нужно?'
                    value={form.watch('title')}
                    error={!!form.formState.errors.title}
                    onChange={onChange}
                  />
                  <CreateTextarea
                    control={form.control}
                    name='description'
                    label='Описание'
                    placeholder='Подробнее о задаче'
                    value={form.watch('description')}
                    error={!!form.formState.errors.description}
                    onChange={onChange}
                  />
                </div>
                <CreateTagInput tags={tags} setTags={setTags} />
                <div className='mb-8'>
                  <h1 className='font-semibold text-xl'>Правила</h1>
                  <div className='flex gap-4 mt-4'>
                    <CreateInput
                      control={form.control}
                      name='budgetFrom'
                      label='Бюджет (от)'
                      placeholder='Мин. 5 000 ₽'
                      type='number'
                      value={form.watch('budgetFrom')}
                      error={!!form.formState.errors.budgetFrom}
                      onChange={onChange}
                    />
                    <CreateInput
                      control={form.control}
                      name='budgetTo'
                      label='Бюджет (до)'
                      placeholder='Макс. 1 000 000 ₽'
                      type='number'
                      value={form.watch('budgetTo')}
                      error={!!form.formState.errors.budgetTo}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <CreateInput
                  control={form.control}
                  name='deadlineDays'
                  label='Дедлайн (в днях)'
                  placeholder='Сколько дней?'
                  type='number'
                  value={form.watch('deadlineDays')}
                  error={!!form.formState.errors.deadlineDays}
                  onChange={onChange}
                />
                <div className='mt-8'>
                  <CreateInput
                    control={form.control}
                    name='qtyFreelancers'
                    label='Фрилансеры'
                    placeholder='Сколько человек?'
                    type='number'
                    value={form.watch('qtyFreelancers')}
                    error={!!form.formState.errors.qtyFreelancers}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <Button
              size='xl'
              className='max-sm:w-9/12 mt-8 w-7/12 text-lg transition-all duration-300 hover:-translate-y-[2px] active:scale-95'
              type='submit'
              disabled={!form.formState.isValid}
            >
              {isPending ? <PulseLoader color='white' /> : 'Создать задачу'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
