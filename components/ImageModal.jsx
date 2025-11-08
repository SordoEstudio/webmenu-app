import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageModal = ({ open, onClose, image, description }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt={description}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
          {description && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 2 }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
