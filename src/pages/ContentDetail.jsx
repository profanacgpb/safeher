import { Link, useParams } from 'react-router-dom'
import { educationalContent } from '../data/contents'

export default function ContentDetail() {
  const { id } = useParams()
  const content = educationalContent.find((item) => item.id === id)

  if (!content) {
    return (
      <main className="page-shell">
        <section className="content-section">
          <h2>Conteúdo não encontrado</h2>
          <Link to="/app/aprender" className="secondary-button">VOLTAR</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="content-section content-detail">
        <h2>{content.title.toUpperCase()}</h2>
        <p>{content.content}</p>
        <Link to="/app/aprender" className="secondary-button">VOLTAR</Link>
      </section>
    </main>
  )
}
