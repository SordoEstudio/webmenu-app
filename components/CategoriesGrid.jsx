import React from "react";
import { Grid, Container } from "@mui/material";
import CategoryCard from "@/components/CategoryCard.jsx";

const CategoriesGrid = ({ categories, avatarView }) => {
  /*   console.log(categories);
   */ return (
    <Container sx={{ py: 1, mb: 4 }}>
      <Grid container spacing={2}>
        {categories.map(
          (category) =>
            category.visible && (
              <CategoryCard
                key={category.id}
                category={category}
                avatarView={avatarView}
              />
            )
        )}
      </Grid>
    </Container>
  );
};

export default CategoriesGrid;
