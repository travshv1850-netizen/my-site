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
          <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-6 font-display">
            Engineer &amp; Maker
          </p>
          <h1
            className="font-display font-bold text-gray-900 leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
          >
            shu.
          </h1>
          <div className="w-12 h-px bg-gray-900 mb-6" />
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-10">
            Webエンジニア。AI・仮想通貨・筋トレが好き。
            <br />
            作ったり、学んだり、書いたり。
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <GithubIcon />
              GitHub
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <XIcon />X
            </Link>
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

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
