export default function WordItem({ word, isVisible, onToggle }) {
  return (
    <div className="word-item">
      <div>{word.word}</div>

      <button onClick={onToggle}>
        {isVisible ? 'Hide definition' : 'Show definition'}
      </button>

      {isVisible && (
        <div className="definition">{word.definition}</div>
      )}
    </div>
  );
}