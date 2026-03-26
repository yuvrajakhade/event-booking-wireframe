import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard, DateRangeFilter } from "../components";
import { CheckCircle2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import Paper from "@mui/material/Paper";

export function CompletedEventsScreen() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [search, setSearch] = React.useState("");
  const completedEvents = mockEvents.filter((event) => {
    if (event.status !== "Completed") return false;
    const eventDate = new Date(event.start);
    if (fromDate && eventDate < fromDate) return false;
    if (toDate && eventDate > toDate) return false;
    return true;
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
              Completed Events
            </Typography>
            <Chip
              icon={<CheckCircle2 size={18} />}
              color="success"
              label={`${completedEvents.length} Done`}
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
        <Box sx={{ width: "100%", mb: 1 }}>
          <DateRangeFilter
            onFilter={(from, to) => {
              setFromDate(from);
              setToDate(to);
            }}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder="Search completed events..."
            className="modern-search"
          />
        </Box>
      </Box>

      {completedEvents.length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 4, py: 4 }}>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No completed events yet.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {completedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              mode="completed"
              onPress={() => navigate(`/events/${event.id}`)}
              onView={() => navigate(`/events/${event.id}`)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
