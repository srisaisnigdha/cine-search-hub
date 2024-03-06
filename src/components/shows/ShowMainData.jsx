const ShowMainData = ({ image, name, rating, summary, genres }) => {
    return <div>
        <img src={image ? image.original : 'not-found-image.png'} alt={name} />

        <div>
            <h1>{name}</h1>
            <div>{rating.average || 'N/A'}</div>
            <div dangerouslySetInnerHTML={{ __html: summary }} />

            <div>
                {/* since genres ia an array */}
                Genres:
                {genres.map(genre => (
                    <span key={genre}>{genre}</span>  // the genres are unique, so used it as a key
                ))}
            </div>

        </div>
    </div>
}
export default ShowMainData;