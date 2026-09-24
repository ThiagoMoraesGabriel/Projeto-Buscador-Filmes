import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const GENRE_NAMES = {
    12: 'Aventura',
    14: 'Fantasia',
    16: 'Animação',
    18: 'Drama',
    27: 'Terror',
    28: 'Ação',
    35: 'Comédia',
    36: 'História',
    37: 'Faroeste',
    53: 'Thriller',
    80: 'Crime',
    99: 'Documentário',
    878: 'Ficção Científica',
    9648: 'Mistério',
    10402: 'Música',
    10749: 'Romance',
    10751: 'Família',
    10752: 'Guerra',
    10770: 'Cinema TV',
};

export function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    const movieUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa';

    const name = movie.title || 'Desconhecido';
    const genres =
        movie.genres?.map((genre) => genre.name).join(', ') ||
        movie.genre_ids
            ?.map((id) => GENRE_NAMES[id])
            .filter(Boolean)
            .join(', ') ||
        'Sem Gênero';

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
                    <Link to={`/filme/${movie.id}`} className={styles['details-btn']}>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
