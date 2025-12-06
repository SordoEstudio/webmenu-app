"use client";

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";

const CategoryCard = ({ category, avatarView }) => {
  const theme = useTheme();
  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http") || url.startsWith("/"));
  };

  const imageUrl = isValidImageUrl(category.image)
    ? category.image
    : theme.extras.defaultImage;

  return (
    <Grid
      item
      xs={category.featured ? 12 : 6}
      sm={category.featured ? 12 : 4}
      md={category.featured ? 12 : 3}
    >
      <Link href={`/menu/${category.id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor:  "inherit",
            position: "relative",
          }}
        >
          {category.featured && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                px: 1,
                py: 0.5,
                borderBottomLeftRadius: 4,
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              <StarIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              Destacado
            </Box>
          )}
          {!avatarView ? (
            <CardMedia
              component="img"
              image={imageUrl}
              alt={category.name}
              sx={{
                height: category.featured ? 200 : 140, // Increased height for featured card
                objectFit: "cover",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: category.featured ? 80 : 56,
                height: category.featured ? 80 : 56,
                mt: 1,
                mx: "auto",
              }}
              alt={category.primary}
              src={imageUrl}
            />
          )}
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant={category.featured ? "h5" : "body1"}
              align="center"
              sx={{
                color: category.featured ? "primary.main" : "inherit",
                fontWeight: category.featured ? "bold" : "normal",
              }}
            >
              {category.name}
            </Typography>
            {category.featured && category.subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1 }}
              >
                {category.subtitle}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CategoryCard;
