export interface Database {
	public: {
		Tables: {
			message: {
				Row: {
					content: string
					id: number
					room_id: string
				}
				Insert: {
					content: string
					id?: number
					room_id: string
				}
				Update: {
					content?: string
					id?: number
					room_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'message_room_id_fkey'
						columns: ['room_id']
						isOneToOne: false
						referencedRelation: 'room'
						referencedColumns: ['id']
					}
				]
			}
			room: {
				Row: {
					id: string
					slots: number
				}
				Insert: {
					id: string
					slots: number
				}
				Update: {
					id?: string
					slots?: number
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
