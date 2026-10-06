import { Link } from 'react-router-dom'

export default function EducationalCard({ item }) {
  return (
    <Link to={`/app/aprender/${item.id}`} className="educational-card">
      <span className="eyebrow">{item.category}</span>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <span className="card-link">Saiba mais →</span>
    </Link>
  )
}
