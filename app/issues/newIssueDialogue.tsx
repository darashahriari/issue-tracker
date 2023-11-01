'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { newIssueSchema } from '@/lib/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { createNewIssue } from './_actions'

export function NewIssueDialogue() {
	const { control, handleSubmit, formState, reset } = useForm<z.infer<typeof newIssueSchema>>({
		resolver: zodResolver(newIssueSchema),
		defaultValues: {
			title: '',
			content: '',
		},
		mode: 'onChange',
		shouldUseNativeValidation: false,
	})
	const { toast } = useToast()

	async function onSubmit(data: z.infer<typeof newIssueSchema>) {
		try {
			await createNewIssue(data.title, data.content)
			reset()
			toast({
				description: (
					<div className="flex flex-row items-center ">
						<CheckCircledIcon width="25" height="25" color={'green'} className="mr-3" />
						{'Your task has been created.'}
					</div>
				),
			})
		} catch (e) {
			toast({
				variant: 'destructive',
				description: (
					<div className="flex flex-row items-center ">
						<CrossCircledIcon width="30" height="30" color={'white'} className="mr-3" />
						<div className="flex flex-col items-start ">
							<p> Oh! Something went wrong.</p>
							<p> {'' + e}</p>
						</div>
					</div>
				),
			})
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">New Issue</Button>
			</DialogTrigger>
			<DialogContent className="min-h-[450px] sm:max-w-[650px] md:min-h-[600px]">
				<DialogHeader className="mb-5">
					<DialogTitle>New Issue</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
					<Controller
						control={control}
						name="title"
						render={({ field }) => <Input disabled={formState.isSubmitting} placeholder="Issue Title" {...field} />}
					/>
					{formState.errors.title && <p className="text-red-500">{formState.errors.title.message}</p>}
					<Controller
						control={control}
						name="content"
						render={({ field }) => (
							<Textarea
								disabled={formState.isSubmitting}
								placeholder="Issue Description"
								className="min-h-[300px] sm:min-h-[400px]"
								{...field}
							/>
						)}
					/>
					{formState.errors.title && <p className="text-red-500">{formState.errors.title.message}</p>}
					<Button type="submit" disabled={!formState.isValid || formState.isSubmitting} className="md:max-w-[150px]">
						Create Issue {formState.isSubmitting && <Spinner />}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default NewIssueDialogue
