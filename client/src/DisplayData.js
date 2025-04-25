import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }`

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            name
        }
    }`

const QUERY_MOVIE_BY_NAME = gql`
    query getMovieByName($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`

const CREATE_USER = gql`
    mutation CreateUser($input: CreateUser!) {
        createUser(input: $input) {
            id
            name
            age
            username
        }
    }
`

const DisplayData = () => {
    const [movieSearch, setMovieSearch] = useState("")
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("")
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS)
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
    const [getMovieByName, { data: movieDataByName, error: movieError }] = useLazyQuery(QUERY_MOVIE_BY_NAME)
    const [createUser] = useMutation(CREATE_USER)

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="age" onChange={(e) => setAge(Number(e.target.value))} />
                <input type="text" placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />
                <button onClick={() => {
                    createUser({
                        variables: {
                            input: {
                                name,
                                username,
                                age,
                                nationality
                            }
                        }
                    })
                    refetch()
                }}>
                    Submit
                </button>
            </div>
            <div>
                {data && data.users.map((user) => {
                    return <div>
                        <h1>Name: {user.name}</h1>
                        <h1>Username: {user.username}</h1>
                        <h1>age: {user.age}</h1>
                        <h1>Nationality: {user.nationality}</h1>
                    </div>
                })}
            </div>
            <div>
                {movieData && movieData.movies.map((movie) => {
                    return <div>
                        <h1>Movie: {movie.name}</h1>
                    </div>
                })}
            </div>

            <div>
                <input type="text" placeholder='Enter movie name' onChange={(e) => setMovieSearch(e.target.value)} />
                <button onClick={() => getMovieByName({ variables: { name: movieSearch } })}>Search</button>

                {movieDataByName && movieDataByName.movie && (
                    <div>
                        <h1>Movie: {movieDataByName.movie.name}</h1>
                        <h1>Year of Publication: {movieDataByName.movie.yearOfPublication}</h1>
                    </div>
                )}
                {movieError && <h1>Error fetching movie</h1>}
            </div>
        </>
    )
}

export default DisplayData