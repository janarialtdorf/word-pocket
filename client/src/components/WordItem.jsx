import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export default function WordItem({ word, isVisible, onToggle, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h6">
          {word.word}
        </Typography>

        {isVisible && (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {word.meaning}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button onClick={onToggle}>
          {isVisible ? 'Hide meaning' : 'Show meaning'}
        </Button>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
