import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Works',
  description: '作ったWebアプリやツールの一覧',
}

type Work = {
  title: string
  description: string
  tech: string[]
  url?: string
  repo?: string
  year: string
}

const works: Work[] = [
  {
    title: 'ポートフォリオサイト',
    description: 'このサイト。Next.js App Router + Tailwind CSS v4 + Markdownブログで構成。シンプルさを重視して設計した。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
  },
  {
    title: 'AI家計簿アシスタント',
    description: 'レシートの写真をアップロードするだけで自動でカテゴリ分類してくれるWebアプリ。Claude APIで画像解析を行い、月次レポートを生成する。',
    tech: ['Next.js', 'Claude API', 'Supabase'],
    year: '2025',
  },
  {
    title: '仮想通貨ポートフォリオトラッカー',
    description: '保有する仮想通貨の損益をリアルタイムで確認できるダッシュボード。複数取引所のAPIを統合してポートフォリオ全体を一元管理できる。',
    tech: ['React', 'Node.js', 'CoinGecko API'],
    year: '2024',
  },
  {
    title: 'ワークアウトログアプリ',
    description: 'トレーニングの記録・分析ができるモバイル対応Webアプリ。種目・重量・セット数を記録し、週次・月次のグラフで進捗を可視化。',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Recharts'],
    year: '2024',
  },
]

export default function WorksPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xl font-bold mb-3 text-gray-900">Works</h1>
      <p className="text-sm text-gray-500 mb-12">個人・趣味で作ったプロジェクトの一覧です。</p>

      <ul className="space-y-10">
        {works.map((work) => (
          <li key={work.title} className="border-b border-gray-100 pb-10 last:border-none last:pb-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-base font-medium text-gray-900">{work.title}</h2>
              <span className="text-xs text-gray-400 shrink-0 mt-0.5">{work.year}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{work.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {work.tech.map((t) => (
                <span key={t} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {work.url && (
                <Link href={work.url} className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  サイトを見る
                </Link>
              )}
              {work.repo && (
                <Link href={work.repo} className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
