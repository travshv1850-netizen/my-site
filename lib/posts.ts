import { isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { remark } from 'remark'
import html from 'remark-html'
import { notion, n2m, DATABASE_ID } from './notion'

export type Category = '筋トレ' | '仮想通貨' | 'AI' | 'アプリ開発' | '趣味'

export type Post = {
  slug: string
  title: string
  date: string
  category: Category
  excerpt: string
  content?: string
}

function isConfigured(): boolean {
  const key = process.env.NOTION_API_KEY
  return !!key && key !== 'your_notion_api_key_here'
}

function pageToPost(page: PageObjectResponse): Post {
  const props = page.properties

  const titleProp = props['名前']
  const title =
    titleProp.type === 'title' ? (titleProp.title[0]?.plain_text ?? '') : ''

  const slugProp = props['slug']
  const slug =
    slugProp.type === 'rich_text' ? (slugProp.rich_text[0]?.plain_text ?? '') : ''

  const dateProp = props['date']
  const date =
    dateProp.type === 'date' ? (dateProp.date?.start ?? '') : ''

  const categoryProp = props['category']
  const category = (
    categoryProp.type === 'select' ? (categoryProp.select?.name ?? '') : ''
  ) as Category

  const excerptProp = props['excerpt']
  const excerpt =
    excerptProp.type === 'rich_text'
      ? (excerptProp.rich_text[0]?.plain_text ?? '')
      : ''

  return { slug, title, date, category, excerpt }
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isConfigured()) return []

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'date', direction: 'descending' }],
  })

  return response.results.filter(isFullPage).map(pageToPost)
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (!isConfigured()) throw new Error(`Post not found: ${slug}`)

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        { property: 'slug', rich_text: { equals: slug } },
        { property: 'published', checkbox: { equals: true } },
      ],
    },
  })

  const page = response.results.find(isFullPage)
  if (!page) throw new Error(`Post not found: ${slug}`)

  const post = pageToPost(page)

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)
  const processed = await remark().use(html).process(mdString.parent)

  return { ...post, content: processed.toString() }
}

export async function getPostsByCategory(category: Category): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((p) => p.category === category)
}
