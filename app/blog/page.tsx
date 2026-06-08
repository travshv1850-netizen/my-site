import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, type Category } from '@/lib/posts'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: '筋トレ・仮想通貨・AI・アプリ開発・趣味・日常についての記事',
}

const categories: Category[] = ['筋トレ', '仮想通貨', 'AI', 'アプリ開発', '趣味', '日常']

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const allPosts = await getAllPosts()
  const selectedCategory = category as Category | undefined
  const posts = selectedCategory ? allPosts.filter((p) => p.category === selectedCategory) : allPosts

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xl font-bold mb-10 text-gray-900">Blog</h1>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-12">
        <Link
          href="/blog"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !selectedCategory
              ? 'bg-gray-900 text-white border-gray-900'
              : 'text-gray-500 border-gray-200 hover:border-gray-400'
          }`}
        >
          すべて
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${cat}`}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white border-gray-900'
                : 'text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* 記事一覧 */}
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">記事がありません。</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {posts.map((post) => (
            <li key={post.slug} className="py-7">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
