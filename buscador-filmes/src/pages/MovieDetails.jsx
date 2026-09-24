import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import styles from './MovieDetails.module.css';

export function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p className={styles.loadingText}>Carregando dados do filme...</p>;
    if (!movie) return <p className={styles.loadingText}>Filme não encontrado.</p>;

    const movieUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa';
    const name = movie.title || 'Desconhecido';
    const release_date = movie.release_date || 'Desconhecido';
    const genres = movie.genres?.map((genre) => genre.name).join(', ') || 'Sem Gênero';
    const overview = movie.overview || 'Sem descrição disponível.';
    const tagline = movie.tagline || 'Sem tagline disponível.';
    const runtime = movie.runtime || 'Sem duração disponível.';
    const vote_average = movie.vote_average || 'Sem avaliação disponível.';

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    &larr; Voltar para Explorar
                </Link>

                <div className={styles.content}>
                    <div className={styles.imagesContainer}>
                        <img src={movieUrl} alt={`Capa de ${name}`} className={styles.flag} />

                        <div className={styles.infoContainer}>
                            <h1 className={styles.countryName}>{name}</h1>
                            <p className={styles.tagline}>{tagline}</p>

                            <div className={styles.detailsList}>
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>⌚ Duração:</strong>{' '}
                                    <span className={styles.detailValue}>{runtime} min</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>⭐ Avaliação:</strong>{' '}
                                    <span className={styles.detailValue}>{vote_average}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>💰 Lançamento:</strong>{' '}
                                    <span className={styles.detailValue}>{release_date}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}> Gênero:</strong>{' '}
                                    <span className={styles.detailValue}>{genres}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}> Resumo:</strong>{' '}
                                    <span className={styles.detailValue}>{overview}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
