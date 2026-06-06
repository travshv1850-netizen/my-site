import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'shuについて',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xl font-bold mb-10 text-gray-900">About</h1>

      <section className="space-y-5">
        <p className="text-gray-700 leading-relaxed font-medium">はじめまして。</p>
        <p className="text-gray-700 leading-relaxed">
          場所を選ばず生きていける力を身につけたいと思いながら、日々試行錯誤しているアラサーです。
        </p>
        <p className="text-gray-700 leading-relaxed">
          現在はリゾートバイトをしながら、仮想通貨やAIを活用した開発を学んでいます。どちらもまだ勉強中ですが、未来の働き方やお金との向き合い方を考える中で、自然と興味を持つようになりました。
        </p>
        <p className="text-gray-700 leading-relaxed">
          ケトルベルを使った筋トレで頭だけでなく体も鍛えながら、少しずつ理想の生活に近づけるよう取り組んでいます。
        </p>
        <div>
          <p className="text-gray-700 leading-relaxed mb-2">このブログでは、</p>
          <ul className="text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>— AIを使った開発の記録</li>
            <li>— 仮想通貨について学んだこと</li>
            <li>— 筋トレの記録</li>
            <li>— リゾートバイト生活での気づき</li>
            <li>— 作ったものや挑戦したこと</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-2">などを残していきます。</p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          完成された知識を発信するというより、「模索している過程」をそのまま記録する場所です。
        </p>
        <p className="text-gray-700 leading-relaxed">
          同じように何かを学んでいる方や、これから新しいことに挑戦したい方の参考になれば嬉しいです。
        </p>
      </section>
    </div>
  )
}
