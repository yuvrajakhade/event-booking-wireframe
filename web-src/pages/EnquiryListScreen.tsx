import React from "react";
import { mockRecords, sortRecordsByDateTime } from "../../src/data/mock";
import { EnquiryCard, DateRangeFilter } from "../components";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import SearchFilter from "../components/SearchFilter";

export function EnquiryListScreen() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [search, setSearch] = React.useState("");

  const enquiries = sortRecordsByDateTime(
    mockRecords.filter((record) => {
      if (record.eventSource !== "Enquiry") return false;
      if (record.eventDate) {
        const eventDate = new Date(record.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (eventDate < today) return false;
        if (fromDate && eventDate < fromDate) return false;
        if (toDate && eventDate > toDate) return false;
      }
      if (!search) return true;
      const haystack =
        `${record.customerName ?? ""} ${record.phone ?? ""}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    }),
  );

  const activeCount = enquiries.length;

  const isConvertDisabled = (enquiryDate?: string) =>
    Boolean(
      enquiryDate &&
      mockRecords.some(
        (record) =>
          record.eventSource === "Booking" && record.eventDate === enquiryDate,
      ),
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
              Enquiries
            </Typography>
            <Chip
              icon={<Users size={18} />}
              color="primary"
              label={`${activeCount} Active`}
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
            placeholder="Search name/phone"
            className="modern-search"
            sx={{ mb: 0 }}
          />
        </Box>
      </Box>

      {enquiries.length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 4, py: 4 }}>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No enquiries found.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={1.2}>
          {enquiries.map((enquiry) => (
            <EnquiryCard
              key={enquiry.id}
              enquiry={enquiry}
              isConvertDisabled={isConvertDisabled(enquiry.eventDate)}
              onConvert={() => navigate(`/events/new?enquiryId=${enquiry.id}`)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
