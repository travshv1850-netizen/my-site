import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const n2m = new NotionToMarkdown({ notionClient: notion })

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!
