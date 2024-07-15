import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Container, Typography, Box, Card, CardContent, Link, Button, TextField, Snackbar, Alert } from '@mui/material';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios.get('/spoonacular/recipes/')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      axios.get(`/spoonacular/recipes/search/?query=${searchQuery}`)
        .then(response => {
          setRecipes(response.data);
        })
        .catch(error => {
          console.error('Error searching recipes:', error);
        });
    } else {
      fetchRecipes();
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/recipes/${id}/`)
      .then(response => {
        console.log('Recipe deleted successfully:', response);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        setLocalRecipes(localRecipes.filter(recipe => recipe.id !== id));
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
        // If the recipe is from Spoonacular API, just remove it from the state
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      });
  };

  const handleAdd = (newRecipe) => {
    axios.post('/recipes/', newRecipe)
      .then(response => {
        console.log('Recipe added successfully:', response);
        setLocalRecipes([...localRecipes, response.data]);
        setShowForm(false);
        setShowSuccess(true);
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recipes
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          <TextField
            label="Search Recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Box>
        {[...recipes, ...localRecipes].map(recipe => (
          <Card key={recipe.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {recipe.summary.replace(/<\/?[^>]+(>|$)/g, "")}
              </Typography>
              {recipe.image &&
                <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', marginBottom: '10px' }} />
              }
              <Link href={`https://www.youtube.com/results?search_query=${recipe.title}`} target="_blank">
                Watch on YouTube
              </Link>
              <Button sx={{ marginLeft: '10px' }} variant="contained" color="secondary" onClick={() => handleDelete(recipe.id)}>
                Delete Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
        <Button onClick={toggleForm} variant="contained" color="primary" sx={{ mt: 2 }}>
          {showForm ? 'Close Form' : 'Add Recipe'}
        </Button>
        {showForm && <RecipeForm onAdd={handleAdd} />}
        <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Recipe added successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default RecipeList;
