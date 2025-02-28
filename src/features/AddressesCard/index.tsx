import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { AddressProps } from "src/types/adress-types";

interface Items {
  items: AddressProps[];
}

export const AddressPC: React.FC<Items> = ({ items }) => {
  const [show, setShow] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleShowDetails = (item: AddressProps) => {
    setSelectedAddress(item);
    setShow(true);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Box sx={{ width: "90%", mt: 4 }}>
      {/* Grid Layout for Address Cards */}
      <div className=" flex flex-row gap-5">
        {items.slice(startIndex, endIndex).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                height: "100%",
                width: { xs: "100%", sm: "100%", md: "auto" }, // Adjusts width based on screen size
                minWidth: "300px",
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.firstName || "Неизвестно"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor:
                          item.type === "receiver" ? "#91BB45" : "#FF6347",
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {item.type === "receiver" ? "Получатель" : "Отправитель"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Номер телефона: <strong>{item.phoneNumber}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Город: <strong>{item.city}</strong>
                  </Typography>
                </Box>
              </CardContent>

              {/* Details Button */}
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  mt: 2,
                  backgroundColor: "#220CF3",
                  "&:hover": { backgroundColor: "#1b06b8" },
                }}
                onClick={() => handleShowDetails(item)}
              >
                Подробнее
              </Button>
            </Card>
          </Grid>
        ))}
      </div>

      {/* Pagination Component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={Math.ceil(items.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* Popup with Address Details */}
      {show && selectedAddress && (
        <PopupCard
          item={selectedAddress}
          onClose={() => {
            setShow(false);
            setSelectedAddress(null);
          }}
        />
      )}
    </Box>
  );
};

// Popup Card Props Interface
interface PopupCardProps {
  item: AddressProps;
  onClose: () => void;
}

// Popup Card Component to Show Single Address
const PopupCard: React.FC<PopupCardProps> = ({ item, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: 5,
          p: 3,
          backgroundColor: "#fff",
          position: "relative",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#666",
          }}
        >
          <Close />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Детали Адреса
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Имя: </strong> {item.firstName || "Неизвестно"}
            </Typography>
            <Typography variant="body1">
              <strong>Тип: </strong>
              {item.type === "receiver" ? "Получатель" : "Отправитель"}
            </Typography>
            <Typography variant="body1">
              <strong>Номер телефона: </strong> {item.phoneNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Адрес: </strong>{" "}
              {`${item.street}, ${item.housing}, ${item.building}, ${item.apartment}`}
            </Typography>
            <Typography variant="body1">
              <strong>Город: </strong> {item.city}
            </Typography>
            <Typography variant="body1">
              <strong>Почтовый индекс: </strong> {item.postal_code}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
