import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

export function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    const movieUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa';

    const name = movie.title || 'Desconhecido';
    const genres = movie.genres?.name || 'Sem Gênero';

    return (
        <div className={styles['country-card']}>
            <div className={styles['image-container']}>
                <img src={movieUrl} alt={`Capa de ${name}`} />

                <button
                    className={styles['favorite-btn']}
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(movie);
                    }}
                    title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}>
                    {isFavorite ? '★' : '☆'}
                </button>

                <div className={styles.overlay}>
                    <h3>{name}</h3>
                    <p>📍 {genres}</p>
                    <Link to={`//${movie.id}`} className={styles['details-btn']}>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
