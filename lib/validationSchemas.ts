import * as z from 'zod'

export const newIssueSchema = z.object({
	title: z
		.string()
		.min(1, {
			message: 'Title must be at least 1 character.',
		})
		.max(160, {
			message: 'Title must not be longer than 160 characters.',
		}),
	content: z.string().min(1, {
		message: 'Description must be at least 1 character.',
	}),
})
