import { Footer, Header } from "@/components/common"

export default function About() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Header />
      <Article />
      <Footer />
    </main>
  )
}

function Article() {
  return (
    <article className="container prose prose-lg mx-auto mb-20 px-5 font-mono sm:prose-xl">
      <h2>About</h2>
    </article>
  )
}
