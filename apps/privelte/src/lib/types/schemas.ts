import { z } from 'zod'

export const newMessageSchema = z.object({
	message: z.string().min(1).max(1000)
})

export type NewMessage = z.infer<typeof newMessageSchema>

export const newRoomSchema = z.object({
	id: z.string(),
	slots: z.coerce.number().min(2).max(10)
})

export const fetchMessagesSearchParams = z
	.object({
		newmessages: z.nullable(z.literal('')),
		lastmessageid: z.string()
	})
	.transform(({ newmessages, lastmessageid }) => ({
		newMessages: newmessages === '',
		lastMessageId: Number(lastmessageid)
	}))
	.refine(({ lastMessageId }) => !Number.isNaN(lastMessageId), {
		message: 'Invalid id'
	})
