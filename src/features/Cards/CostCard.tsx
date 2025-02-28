import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface PackageItem {
  cost: number;
  name: string;
  weight: number;
  country: string;
  quantity: number;
}

interface CostCardProps {
  onCostClick: () => void;
  price: string;
  packageCurrent: {
    departure: string;
    items: PackageItem[];
  };
  country: any;
  courier: boolean;
  insurance: boolean;
  address: any;
}

export const CostCard: React.FC<CostCardProps> = ({
  onCostClick,
  packageCurrent,
  price,
  country,
  insurance,
  courier,
  address,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0); // Для управления вкладками

  const handleClick = () => {
    onCostClick();
  };

  if (!packageCurrent.items) {
    return <>В вашей посылке нет предметов, пожалуйста добавьте его</>;
  }

  // Calculate total weight and total cost
  // const totalWeight = packageCurrent.items
  //   .reduce((acc, item) => acc + item.weight, 0)
  //   .toFixed(2); // Fixed to 2 digits

  const totalCost = packageCurrent.items
    .reduce((acc, item) => acc + item.cost * 0.05, 0)
    .toFixed(2); // Fixed to 2 digits

  // Handle dialog open and close
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  // Управление вкладками
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const priceNumber = parseFloat(price.replace(/[^\d.]/g, ""));
  const finalInsuranceCost = (insurance ? parseFloat(totalCost) : 0).toFixed(2);
  const lastPrice = (
    priceNumber +
    parseFloat(finalInsuranceCost) +
    (courier ? 3 : 0)
  ).toFixed(2);

  // Store the updated package price with 2 decimals
  localStorage.setItem("packagePrice", `€${lastPrice}`);

  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 4, // Increased padding for a cleaner look
          boxShadow: 6, // Slightly elevated box-shadow
          borderRadius: 3,
          backgroundColor: "#f9fafb",
          border: "1px solid #e0e0e0",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#220CF3",
              textAlign: "center",
              marginBottom: 3, // Add more spacing below the title
            }}
          >
            Посылка из {country.from} в {country.to}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2, // Increase spacing between sections
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Содержимое:
            </Typography>
            <Typography variant="body1">
              <a className="text-main underline" onClick={handleDialogOpen}>
                Подробнее
              </a>
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Цена со страховкой:
            </Typography>
            <Typography variant="body1">
              €{(priceNumber + parseFloat(finalInsuranceCost)).toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Курьер:
            </Typography>
            <Typography variant="body1">
              €{courier ? "3.00" : "0.00"}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Всего:
            </Typography>
            <Typography variant="body1">€{lastPrice}</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              backgroundColor: "#220CF3",
              color: "#fff",
              textTransform: "none",
              padding: "8px 16px", // Added more padding for a nicer look
              "&:hover": {
                backgroundColor: "#1E0AD1",
              },
            }}
          >
            Далее
          </Button>
        </CardContent>
      </Card>

      {/* Объединенное диалоговое окно */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Детали посылки и адреса</DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Содержимое" />
            <Tab label="Адрес" />
          </Tabs>
          <Divider sx={{ marginY: 2 }} />
          {tabValue === 0 && (
            <Box>
              <Table>
                <TableBody>
                  {packageCurrent.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">€{item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="body1">
                Тип адреса:{" "}
                {address.type === "receiver" ? "Получатель" : "Отправитель"}
              </Typography>
              <Typography variant="body1">
                Имя: {address.firstName || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Телефон: {address.phoneNumber}
              </Typography>
              <Typography variant="body1">
                Улица: {address.street || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Дом: {address.housing || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Квартира: {address.apartment || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Город: {address.city || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Почтовый индекс: {address.postal_code || "Не указана"}
              </Typography>
              <Typography variant="body1">
                Страна: {address.country || "Не указана"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{ backgroundColor: "#220CF3", color: "#fff" }}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
