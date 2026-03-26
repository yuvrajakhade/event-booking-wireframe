import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../../src/data/mock";
import { AlertCircle, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

type MissingRow = {
  id: string;
  name: string;
  unit: string;
  issuedQty: number;
  returnedQty: number;
  missing: number;
};

type MissingInventoryLocationState = {
  missingRows?: MissingRow[];
};

export function MissingInventoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography color="error" variant="h6">
              Missing inventory record not found.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const fallbackRows: MissingRow[] = event.inventory
    .map((item) => ({
      id: item.id,
      name: item.name,
      unit: item.unit,
      issuedQty: item.issuedQty,
      returnedQty: item.returnedQty,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter((item) => item.missing > 0);

  const state =
    (location.state as MissingInventoryLocationState | null) ?? null;
  const missingRows = state?.missingRows ?? fallbackRows;

  // Optionally filter missingRows by event date if available
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
      <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={() => navigate(-1)}
              size="small"
              color="primary"
            >
              <ArrowLeft size={20} />
            </IconButton>
            <Typography variant="h5" fontWeight={700} color="primary">
              Missing Items
            </Typography>
            <Chip
              icon={<AlertCircle size={16} />}
              color="error"
              label={`${missingRows.length} Missing Items`}
              sx={{ fontWeight: 600, ml: 2 }}
            />
          </Stack>
        </CardContent>
      </Card>

      {missingRows.length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography color="text.secondary">
              No missing items in this event.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ borderRadius: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f5f5f5" }}>
                <TableCell>Name</TableCell>
                <TableCell align="center">Missing</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Issued</TableCell>
                <TableCell align="center">Returned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missingRows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.missing}</TableCell>
                  <TableCell align="center">{item.unit}</TableCell>
                  <TableCell align="center">{item.issuedQty}</TableCell>
                  <TableCell align="center">{item.returnedQty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
