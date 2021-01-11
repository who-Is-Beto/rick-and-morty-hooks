import Header from './components/Header'
import { useState } from 'react'
import Character from './components/Characters'


function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'darkmode__app' : 'lightmode__app'}>
      <Header
        darkMode={darkMode}
        onClick={() => setDarkMode(!darkMode)}
      />

      <Character />


    </div>
  );
}

export default App;
