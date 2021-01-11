import '../styles/Header.css'
import { useContext } from "react";
import ThemeContext from '../context/ThemeContext'

const Header = (props) => {

  const color = useContext(ThemeContext)

  return (
    <header className={props.darkMode ? 'darkmode__header' : 'lightmode__header'}>
      <div className="logo">
        <p style={{ color }}>React Hooks</p>
      </div>

      <div className="darkmode__section">
        <button className={props.darkMode ? 'darkmode__button' : 'lightmode__button'} type="button" onClick={() => props.onClick()}>
          {props.darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  )
}

export default Header