import { isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion, WORKS_DATABASE_ID } from './notion'

export type Work = {
  id: string
  title: string
  description: string
  url: string
  tags: string[]
}

function isConfigured(): boolean {
  const key = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_WORKS_DATABASE_ID
  return !!key && key !== 'your_notion_api_key_here' && !!dbId
}

function pageToWork(page: PageObjectResponse): Work {
  const props = page.properties

  const titleProp = props['名前']
  const title =
    titleProp.type === 'title' ? (titleProp.title[0]?.plain_text ?? '') : ''

  const descriptionProp = props['description']
  const description =
    descriptionProp.type === 'rich_text'
      ? (descriptionProp.rich_text[0]?.plain_text ?? '')
      : ''

  const urlProp = props['url']
  const url =
    urlProp.type === 'rich_text' ? (urlProp.rich_text[0]?.plain_text ?? '') : ''

  const tagsProp = props['tags']
  const tags =
    tagsProp.type === 'multi_select'
      ? tagsProp.multi_select.map((t) => t.name)
      : []

  return { id: page.id, title, description, url, tags }
}

export async function getAllWorks(): Promise<Work[]> {
  if (!isConfigured()) return []

  const response = await notion.databases.query({
    database_id: WORKS_DATABASE_ID,
    filter: {
      property: 'published',
      checkbox: { equals: true },
    },
  })

  return response.results.filter(isFullPage).map(pageToWork)
}
