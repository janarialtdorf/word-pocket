import { useCallback, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import WordItem from '../components/WordItem';
import '../components/MainPage.css';

function MainPage() {
  const [visibleDefinitionId, setVisibleDefinitionId] = useState(null);
  const [words, setWords] = useState([]);
  const [activeWord, setActiveWord] = useState(-1);
  const [sort, setSort] = useState('id,asc');

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((res) => res.json())
      .then((json) => setWords(json));
  }, [page, sort]);

  const showByWord = useCallback(
    (wordId, currentPage) => {
      setActiveWord(wordId);
      setPage(currentPage);

      fetch(
        `http://localhost:3000/word-definitions`
      )
        .then((res) => res.json())
        .then((json) => {
          setWords(json.content);
          setTotalPages(json.totalPages);
        });
    },
    [wordsByPage, sort]
  );

  useEffect(() => {
    showByWord(activeWord, 0);
  }, [showByWord, activeWord]);

  function updatePage(newPage) {
    showByWord(activeWord, newPage);
  }

  return (
    <div>
      <div className="sort">
        <button onClick={() => setSort('name,asc')}>Sort A-Z</button>
        <button onClick={() => setSort('name,desc')}>Sort Z-A</button>
      </div>

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

      <div className="movement">
        <button disabled={page === 0} onClick={() => updatePage(page - 1)}>
          Previous
        </button>
        <span>{page + 1}</span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => updatePage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MainPage;