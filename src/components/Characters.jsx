import { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import Seacrcher from './Searcher'
import useCharacters from '../hooks/useCharacter'
import '../styles/Characters.css'

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character'

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    case 'DELETE_TO_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(items => items.id !== action.payload)
      };
    default:
      return {
        ...state,
      }
  }
}

const Characters = () => {

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
  const [search, setSearch] = useState('')
  const SearchInput = useRef(null)

  const characters = useCharacters(API)

  const addCharacterToFavorite = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  const handleClickRemove = (id) => {
    dispatch({ type: 'DELETE_TO_FAVORITE', payload: id })
  }

  /*  const handleSearch = () => {
    setSearch(SearchInput.current.target.value)
    console.log(SearchInput.current.target.value)
   } */

  const handleSearch = useCallback(() => {
    setSearch(SearchInput.current.value);
  }, [])

  /*   const filterUsers = characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLocaleLowerCase())
    }) */

  const filterUsers = useMemo(() => characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLocaleLowerCase())
  }),
    [characters, search]
  )

  return (
    <>
      {console.log(SearchInput)}
      <div className="character__wrapper">
        {favorites.favorites.length > 0
          ? (
            <div className="favorites">
              <h2>Your Favorites</h2>
              <ul className='favorites__list' >
                {favorites.favorites.map((favCharacter) => (
                  <li key={favCharacter.id}>
                    <div className="favorite__card">
                      <img className='favorite__image' src={favCharacter.image} alt="" />
                      <div className="favorite__info fadeInUp">
                        <p>{favCharacter.name}</p>
                        <p> {favCharacter.status === 'Dead' ? 'RIP' : ''} {favCharacter.status}</p>
                        <button className='character__button' onClick={() => handleClickRemove(favCharacter.id)}>Delete to favorites</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
          : ''
        }

        <div className="searcher__container">
          {<Seacrcher value={search} reference={SearchInput} onChange={handleSearch} />}
        </div>

        <div className="characters__container">
          <h2>Characters</h2>
          <ul className="characters__list">
            {filterUsers.map(character => (
              <li key={character.id}>
                <div className="character__card">
                  <img className='character__image' src={character.image} alt="" />
                  <div className="character__info fadeInUp">
                    <p>{character.name}</p>
                    <p> {character.status === 'Dead' ? 'RIP' : ''} {character.status}</p>
                    <button
                      className='character__button'
                      type='button'
                      onClick={() => addCharacterToFavorite(character)} >Add to favorite</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Characters