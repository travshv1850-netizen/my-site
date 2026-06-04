import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

// 1時間ごとに再生成
export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    // APIキー未設定時はビルドをスキップし、リクエスト時に動的生成
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return { title: post.title, description: post.excerpt }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/blog" className="hover:text-gray-700 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-500">{post.category}</span>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-gray-400">{post.date}</span>
          <Link
            href={`/blog?category=${post.category}`}
            className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 hover:border-gray-300 transition-colors"
          >
            {post.category}
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">{post.title}</h1>
      </header>

      {/* 本文 */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />

      {/* フッターリンク */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Blog一覧に戻る
        </Link>
      </div>
    </div>
  )
}
