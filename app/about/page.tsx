import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'shuについて',
}

const interests = ['筋トレ', '仮想通貨', 'AI', 'アプリ開発', 'コーヒー', '読書']

const links = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'X (Twitter)', href: 'https://x.com' },
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xl font-bold mb-10 text-gray-900">About</h1>

      <section className="mb-12">
        <p className="text-gray-700 leading-relaxed mb-4">
          フリーランスのWebエンジニアです。主にTypeScript / React / Next.jsを使ってプロダクトを開発しています。
          AIを活用したアプリケーション開発に特に興味があり、Claude APIやOpenAI APIを使ったプロトタイプを日々作っています。
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          仕事以外では筋トレと仮想通貨の勉強が日課。毎日継続することが得意で、気になったことは徹底的に深掘りするタイプです。
          このブログでは、そんな日々の学びや気づきをアウトプットする場所として使っています。
        </p>
        <p className="text-gray-700 leading-relaxed">
          お仕事の依頼やご質問は X（旧Twitter）のDMまでお気軽にどうぞ。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <span key={item} className="text-sm text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
          {['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Claude API / OpenAI API', 'Vercel / AWS'].map((skill) => (
            <span key={skill}>— {skill}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Links</h2>
        <div className="flex gap-5">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
