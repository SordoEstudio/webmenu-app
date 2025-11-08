"use client";

import React from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";

const CategoryComponent = ({ category, avatarView }) => {
  const theme = useTheme(); // Accede al tema para obtener el logo
  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http") || url.startsWith("/"));
  };

  const imageUrl = isValidImageUrl(category.image)
    ? category.image
    : theme.extras.defaultImage;
  return (
    category.visible && (
      <Link href={`/menu/${category.id}`} style={{ textDecoration: "none" }}>
        <ListItem
          sx={{
            backgroundColor: category.featured
              ? "primary.ultraLight"
              : "inherit",
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  mr: 1,
                  borderRadius: !avatarView ? 1 : "50%",
                }}
                alt={category.primary}
                src={imageUrl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = theme.extras.defaultImage;
                }}
              />
            </ListItemAvatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant={category.featured ? "h6" : "body1"}
                        sx={{
                          color: category.featured
                            ? "primary.dark"
                            : "primary.main",
                          fontWeight: category.featured ? "bold" : "normal",
                          textDecoration: "none",
                        }}
                      >
                        {category.name}
                      </Typography>
                    }
                    sx={{ flexGrow: 1 }}
                  />
                </Box>

                {category.subtitle && (
                  <ListItemText secondary={category.subtitle} sx={{ mt: 1 }} />
                )}
              </Box>
            </Box>
          </Box>
        </ListItem>
        <Divider variant="middle" component="li" />
      </Link>
    )
  );
};

export default CategoryComponent;
