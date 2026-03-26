import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard, DateRangeFilter } from "../components";
import { CalendarDays, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import Paper from "@mui/material/Paper";

export function BookedEventsScreen() {
  const navigate = useNavigate();

  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [selectedRooms, setSelectedRooms] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  // Filter events by status and date range
  const filteredEvents = mockEvents.filter((event) => {
    if (event.status === "Completed") return false;
    const eventDate = new Date(event.start);
    if (fromDate && eventDate < fromDate) return false;
    if (toDate && eventDate > toDate) return false;
    return true;
  });

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 2, px: 1 }}>
      <Card
        elevation={3}
        sx={{
          mb: 1.5,
          borderRadius: 4,
          boxShadow: "0 4px 24px rgba(39,48,66,0.08)",
        }}
      >
        <CardContent sx={{ py: 1.5, px: 2 }}>
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
              Booked Events
            </Typography>
            <Chip
              icon={<CalendarDays size={18} />}
              color="primary"
              label={`${filteredEvents.length} Events`}
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1.5 }}>
        <Box sx={{ width: "100%", mb: 0.5 }}>
          <DateRangeFilter
            onFilter={(from, to) => {
              setFromDate(from);
              setToDate(to);
            }}
          />
        </Box>
        <Box sx={{ width: "100%", mt: 0 }}>
          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder="Search event/customer/venue"
            className="modern-search"
            sx={{ mb: 0 }}
          />
        </Box>
      </Box>

      {filteredEvents.length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 4, py: 4 }}>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No active booked events right now.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigate(`/events/${event.id}`)}
              onEdit={() => navigate(`/events/${event.id}/edit`)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
