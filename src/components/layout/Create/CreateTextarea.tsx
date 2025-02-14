'use client'

import { ChangeEvent } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/default/Form'
import { Textarea } from '@/components/default/Textarea'

interface CreateTextareaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  label: string
  placeholder: string
  value: string
  error: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, fieldName: string) => void
}

export const CreateTextarea = ({
  control,
  name,
  label,
  placeholder,
  value,
  error,
  onChange,
}: CreateTextareaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='group relative'>
          <FormLabel
            className={`group-focus-within:opacity-100 absolute top-4 left-0 ${
              error
                ? 'group-focus-within:text-destructive text-destructive opacity-100'
                : value !== ''
                  ? 'text-foreground opacity-100'
                  : 'opacity-50'
            }`}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              onChange={e => {
                onChange(e, name)
                field.onChange(e)
              }}
              value={field.value}
              className={`placeholder:text-foreground placeholder:opacity-30 p-0 pb-6 pt-10 rounded-none bg-transparent text-lg border-0 border-b-[0.5px] ${
                error ? 'border-b-destructive' : 'border-b-border'
              } ${value !== '' && 'border-b-foreground'} focus:border-b-foreground`}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
