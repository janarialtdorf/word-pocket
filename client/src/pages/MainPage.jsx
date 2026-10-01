import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import WordItem from '../components/WordItem';

const API_URL = 'http://localhost:3000/api/items';

function MainPage() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [errors, setErrors] = useState({});
  const [visibleMeaningIds, setVisibleMeaningIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadWords();
  }, []);

  async function loadWords() {
    try {
      setLoading(true);
      setErrorMessage('');

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Could not load vocabulary cards.');
      }

      setWords(await response.json());
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function validateForm() {
    const nextErrors = {};
    const trimmedWord = word.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedWord.length < 1 || trimmedWord.length > 60) {
      nextErrors.word = 'Word must be between 1 and 60 characters.';
    }

    if (trimmedMeaning.length < 1 || trimmedMeaning.length > 200) {
      nextErrors.meaning = 'Meaning must be between 1 and 200 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word.trim(), meaning: meaning.trim() }),
      });

      if (!response.ok) {
        throw new Error('Could not add the vocabulary card.');
      }

      setWord('');
      setMeaning('');
      setErrors({});
      await loadWords();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      setErrorMessage('');

      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Could not delete the vocabulary card.');
      }

      setVisibleMeaningIds((ids) => ids.filter((visibleId) => visibleId !== id));
      await loadWords();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function toggleMeaning(id) {
    setVisibleMeaningIds((ids) =>
      ids.includes(id)
        ? ids.filter((visibleId) => visibleId !== id)
        : [...ids, id]
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Vocabulary cards
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Stack spacing={2}>
          <TextField
            label="Word"
            value={word}
            onChange={(event) => setWord(event.target.value)}
            error={Boolean(errors.word)}
            helperText={errors.word || '1–60 characters'}
            inputProps={{ maxLength: 60 }}
            required
          />
          <TextField
            label="Meaning"
            value={meaning}
            onChange={(event) => setMeaning(event.target.value)}
            error={Boolean(errors.meaning)}
            helperText={errors.meaning || '1–200 characters'}
            inputProps={{ maxLength: 200 }}
            multiline
            minRows={3}
            required
          />
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Adding…' : 'Add vocabulary'}
          </Button>
        </Stack>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress aria-label="Loading vocabulary cards" />
        </Box>
      ) : (
        <Stack spacing={2}>
          {words.map((word) => (
          <WordItem
            key={word.id}
            word={word}
            isVisible={visibleMeaningIds.includes(word.id)}
            onToggle={() => toggleMeaning(word.id)}
            onDelete={() => handleDelete(word.id)}
          />
        ))}
          {!words.length && <Alert severity="info">No vocabulary cards yet.</Alert>}
        </Stack>
      )}
    </Container>
  );
}

export default MainPage;
