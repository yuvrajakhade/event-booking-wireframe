import React from "react";
import { mockEvents } from "../../src/data/mock";
import {
  AlertCircle,
  CalendarDays,
  MinusCircle,
  Search,
  ChevronRight,
} from "lucide-react";
import { DateRangeFilter } from "../components";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import Paper from "@mui/material/Paper";

export function InventoryOverviewScreen() {
  const navigate = useNavigate();
  const allItems = mockEvents.flatMap((event) => event.inventory);
  const totalMissing = allItems.reduce(
    (sum, item) => sum + Math.max(0, item.issuedQty - item.returnedQty),
    0,
  );
  const totalPlanned = allItems.reduce((sum, item) => sum + item.plannedQty, 0);
  const recoveryRate =
    totalPlanned === 0
      ? 0
      : Math.round(((totalPlanned - totalMissing) / totalPlanned) * 100);
  const [search, setSearch] = React.useState("");

  const missingByEvent = mockEvents
    .map((event) => {
      const missing = event.inventory
        .map((item) => ({
          name: item.name,
          qty: Math.max(0, item.issuedQty - item.returnedQty),
          unit: item.unit,
        }))
        .filter((item) => item.qty > 0);

      const total = missing.reduce((sum, item) => sum + item.qty, 0);

      return {
        id: event.id,
        title: event.title,
        customer: event.customerName,
        venue: event.venue,
        date: event.start.slice(0, 10),
        total,
        firstMissing: missing[0],
      };
    })
    .filter((event) => event.total > 0);

  // Filter events by search
  const filteredEvents = missingByEvent.filter((event) => {
    const q = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(q) ||
      event.customer.toLowerCase().includes(q) ||
      event.venue.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 5, px: 2 }}>
      <Card
        elevation={3}
        sx={{
          mb: 3,
          borderRadius: 4,
          boxShadow: "0 4px 24px rgba(39,48,66,0.08)",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="primary"
              sx={{ letterSpacing: 0.5 }}
            >
              Inventory Overview
            </Typography>
            <Chip
              icon={<AlertCircle size={18} />}
              color="error"
              label={`${totalMissing} Missing`}
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                px: 1.5,
                borderRadius: 2,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* No date filter for inventory, but keep layout consistent */}
        <Box sx={{ width: "100%" }}>
          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder="Search event/customer/venue"
            className="modern-search"
          />
        </Box>
      </Box>

      <Stack spacing={2}>
        {filteredEvents.length === 0 ? (
          <Card elevation={1} sx={{ borderRadius: 4, py: 4 }}>
            <CardContent>
              <Typography color="text.secondary" align="center">
                No inventory events found.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              elevation={2}
              sx={{
                borderRadius: 3,
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 8 },
              }}
              onClick={() => navigate(`/inventory/missing/${event.id}`)}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.customer} • {event.venue}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Chip
                    color="error"
                    label={event.total}
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
                {event.firstMissing && (
                  <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                    <MinusCircle size={18} />
                    <Typography variant="body2">
                      {event.firstMissing.name}: {event.firstMissing.qty}{" "}
                      {event.firstMissing.unit}
                    </Typography>
                  </Stack>
                )}
                <Button
                  variant="text"
                  endIcon={<ChevronRight size={18} />}
                  sx={{ mt: 1, fontWeight: 600 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/inventory/missing/${event.id}`);
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
}
