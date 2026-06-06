import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWorks } from '@/lib/works'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Works',
  description: '作ったWebアプリやツールの一覧',
}

export default async function WorksPage() {
  const works = await getAllWorks()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xl font-bold mb-3 text-gray-900">Works</h1>
      <p className="text-sm text-gray-500 mb-12">個人・趣味で作ったプロジェクトの一覧です。</p>

      {works.length === 0 ? (
        <p className="text-gray-400 text-sm">まだ作品はありません。</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6">
          {works.map((work) => (
            <li key={work.id} className="border border-gray-100 rounded-xl p-6">
              <h2 className="text-base font-medium text-gray-900 mb-2">{work.title}</h2>
              {work.description && (
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{work.description}</p>
              )}
              {work.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {work.url && (
                <Link
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4"
                >
                  サイトを見る →
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
