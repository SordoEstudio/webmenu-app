import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";

import { formatPrice } from "../utils/formatters";

// Estilos centralizados
const styles = {
  outOfStockText: {
    color: "grey",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
    flexShrink: 0,
    minWidth: "80px",
    flexDirection: "column",
  },
  listItemAvatar: {
    position: "relative",
    marginRight: 1,
  },
  avatar: (stock) => ({
    width: 60,
    height: 60,
    opacity: stock ? "100%" : "50%",
  }),
};

// Subcomponente para el precio y el estado de stock
const ProductPrice = ({ price, inStock, enableCart, onAddToCart = null }) => (
  <Box sx={styles.priceContainer}>
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        ...(inStock ? {} : styles.outOfStockText),
      }}
    >
      $ {formatPrice(price)}
    </Typography>
    {inStock && enableCart && onAddToCart !== null && onAddToCart}
    {!inStock && (
      <Chip
        size="small"
        label="agotado"
        sx={{ mt: 1, ...styles.outOfStockText }}
      />
    )}
  </Box>
);

const ProductComponent = ({ product }) => {
  const theme = useTheme();
  /* Validar Imagen */
  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http") || url.startsWith("/"));
  };

  const imageUrl = isValidImageUrl(product.image)
    ? product.image
    : theme.extras.defaultImage;

  const initialVariant =
    product.variants && product.variants.length > 0
      ? product.variants[0].variantsOptions.find((option) => option.default)
      : null;
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [currentPrice, setCurrentPrice] = useState(
    selectedVariant === null ? product.price : selectedVariant.price
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVariantChange = (variant) => {
    setCurrentPrice(variant.price);
    setSelectedVariant(variant);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: product.featured ? "primary.ultraLight" : "inherit",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <ListItemAvatar sx={styles.listItemAvatar}>
              <Avatar
                sx={styles.avatar(product.stock)}
                alt={product.primary}
                src={imageUrl}
                onError={(e) => {
                  e.target.onerror = null; // Evita un bucle infinito si la imagen de reemplazo también falla
                  e.target.src = theme.extras.defaultImage; // Carga la imagen por defecto
                }}
                onClick={handleOpenModal}
              />
            </ListItemAvatar>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  width: "100%",
                }}
                href={`/menu/${product.productCategoryId}/${product.id}`}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <ListItemText
                    primary={product.name}
                    primaryTypographyProps={{
                      sx: {
                        flexGrow: 1,
                        color: product.stock ? "primary.dark" : "grey",
                        fontWeight: product.featured ? "bold" : "inherit",
                      },
                    }}
                  />
                  {product.subtitle && (
                    <ListItemText
                      secondary={product.subtitle}
                      secondaryTypographyProps={{
                        sx: {
                          mt: 1,
                          color: product.stock ? "inherit" : "grey",
                        },
                      }}
                    />
                  )}
                </Box>
              </Link>
              <ProductPrice
                price={currentPrice}
                inStock={product.stock}
                enableCart={false}
                onAddToCart={null}
              />
            </Box>
          </Box>

          {/*           <Box>
            {product.variants?.variantsOptions &&
              (!enableFeature("carrito") ? (
                <SizeOptions
                  variants={product.variants[0].variantsOptions}
                  onVariantChange={handleVariantChange}
                />
              ) : (
                <SizeOptionsBadge
                  variants={product.variants[0].variantsOptions}
                  onVariantChange={handleVariantChange}
                />
              ))}
          </Box> */}
        </Box>

        <ImageModal
          open={isModalOpen}
          onClose={handleCloseModal}
          image={imageUrl}
          onError={(e) => {
            e.target.onerror = null; // Evita un bucle infinito si la imagen de reemplazo también falla
            e.target.src = theme.extras.defaultImage; // Carga la imagen por defecto
          }}
          description={product.name}
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

export default ProductComponent;
