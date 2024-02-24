const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
    // no need of 'id'here because the we will not have separate page for actors unlike shows

    return <div>

        <div>
            <img src={image} alt={name} />
        </div>
        <h1>{name} {!!gender && `(${gender})`} </h1>
        <p>{country ? `Comes from ${country}` : 'Country not known'}</p>
        {!!birthday && <p>Born {birthday}</p>}
        <p>{deathday ? `Died ${deathday}` : 'Alive'}</p>

    </div>
}

export default ActorCard