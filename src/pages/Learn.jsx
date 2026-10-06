import { Link } from 'react-router-dom'
import { educationalContent } from '../data/contents'

export default function Learn() {
  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>Aprenda a se proteger</h2>
        <div className="card-grid">
          {educationalContent.map((item) => (
            <Link key={item.id} to={`/app/aprender/${item.id}`} className="educational-card">
              <span className="eyebrow">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <span className="card-link">Saiba mais →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
