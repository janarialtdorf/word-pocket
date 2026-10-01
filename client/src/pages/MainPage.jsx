import { useCallback, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import WordItem from '../components/WordItem';
import '../components/MainPage.css';

function MainPage() {
  const [visibleDefinitionId, setVisibleDefinitionId] = useState(null);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((res) => res.json())
      .then((json) => setWords(json));
  }, []);

  return (
    <div>

      <div className="wordlist">
        {words.map((word) => (
          <WordItem
            key={word.wordId}
            word={word}
            isVisible={visibleDefinitionId === word.wordId}
            onToggle={() =>
              setVisibleDefinitionId((id) =>
                id === word.wordId ? null : word.wordId
              )
            }
          />
        ))}
      </div>
      
    </div>
  );
}

export default MainPage;