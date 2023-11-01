'use server'

import prisma from '@/lib/prismaClient'
import { newIssueSchema } from '@/lib/validationSchemas'

export async function createNewIssue(title: string, content: string) {
	const validation = newIssueSchema.safeParse({ title, content })

	if (!validation.success) {
		throw Error(validation.error.message)
	}

	const i = await prisma.issue.create({ data: { title, content } })
}
