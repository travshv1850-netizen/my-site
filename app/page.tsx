import Link from 'next/link'
import { getAllPosts, type Category, type Post } from '@/lib/posts'

export const revalidate = 3600

type CategoryGroup = {
  label: string
  english: string
  categories: Category[]
  gradient: string
  accentColor: string
}

const categoryGroups: CategoryGroup[] = [
  {
    label: '筋トレ',
    english: 'Training',
    categories: ['筋トレ'],
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #c0392b 100%)',
    accentColor: '#c0392b',
  },
  {
    label: '仮想通貨',
    english: 'Crypto',
    categories: ['仮想通貨'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#764ba2',
  },
  {
    label: 'AI / アプリ開発',
    english: 'Tech',
    categories: ['AI', 'アプリ開発'],
    gradient: 'linear-gradient(135deg, #0abde3 0%, #10ac84 100%)',
    accentColor: '#10ac84',
  },
  {
    label: '趣味',
    english: 'Hobby',
    categories: ['趣味'],
    gradient: 'linear-gradient(135deg, #ffd32a 0%, #ff9f43 100%)',
    accentColor: '#ff9f43',
  },
]

export default async function HomePage() {
  const allPosts = await getAllPosts()

  return (
    <div>
      {/* ── Hero ── */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-8 py-24 md:py-32">
          <h1
            className="font-display font-bold text-gray-900 leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
          >
            shu.
          </h1>
          <div className="w-12 h-px bg-gray-900 mb-6" />
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-10">
            常に人生模索中のアラサー。AI・仮想通貨・筋トレ。
            <br />
            作ったり、学んだり、書いたり。
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/works"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Sections ── */}
      <div className="max-w-5xl mx-auto px-8 py-20 space-y-20">
        {categoryGroups.map((group) => {
          const posts = allPosts.filter((p) =>
            (group.categories as string[]).includes(p.category)
          )
          if (posts.length === 0) return null
          return (
            <section key={group.label}>
              {/* セクションヘッダー */}
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{group.label}</h2>
                  <span
                    className="font-display text-sm font-medium tracking-wider"
                    style={{ color: group.accentColor }}
                  >
                    {group.english}
                  </span>
                </div>
                <Link
                  href={`/blog?category=${group.categories[0]}`}
                  className="text-xs text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                >
                  すべて見る →
                </Link>
              </div>
              <div className="h-px bg-gray-100 mb-8" />

              {/* カードグリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} group={group} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function PostCard({ post, group }: { post: Post; group: CategoryGroup }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      {/* サムネイル */}
      <div
        className="w-full rounded-xl mb-4 overflow-hidden"
        style={{ aspectRatio: '16/9', background: group.gradient }}
      >
        <div className="w-full h-full flex items-end p-4">
          <span
            className="font-display text-xs font-semibold tracking-widest text-white/70 uppercase"
          >
            {group.english}
          </span>
        </div>
      </div>

      {/* メタ情報 */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: group.accentColor }}
        />
        <span className="text-xs text-gray-400">{post.category}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-gray-400">{post.date}</span>
      </div>

      {/* タイトル */}
      <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors leading-snug">
        {post.title}
      </h3>
    </Link>
  )
}
