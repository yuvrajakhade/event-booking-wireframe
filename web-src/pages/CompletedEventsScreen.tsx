import React from "react";
import {
  mockRecords,
  isRecordCompleted,
  sortRecordsByDateTime,
} from "../../src/data/mock";
import { EventCard, DateRangeFilter } from "../components";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import { useNavigate } from "react-router-dom";

export function CompletedEventsScreen() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [search, setSearch] = React.useState("");

  const completedEvents = sortRecordsByDateTime(
    mockRecords.filter((record) => {
      if (!isRecordCompleted(record)) return false;
      const recordDate = new Date(record.eventDate ?? "");
      if (fromDate && recordDate < fromDate) return false;
      if (toDate && recordDate > toDate) return false;
      if (!search) return true;
      const haystack =
        `${record.customerName ?? ""} ${record.title} ${record.venue}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    }),
  );

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
            placeholder="Search completed events..."
            className="modern-search"
            sx={{ mb: 0 }}
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
              onClick={() => navigate(`/inventory/missing/${event.id}`)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
