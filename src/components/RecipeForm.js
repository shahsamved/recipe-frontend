import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const RecipeForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, summary, image };
    onAdd(newRecipe);
    setTitle('');
    setSummary('');
    setImage('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Recipe
      </Button>
    </Box>
  );
};

export default RecipeForm;
