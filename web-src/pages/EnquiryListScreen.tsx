import React from "react";
import { mockEnquiries } from "../../src/data/mock";
import { EnquiryCard, DateRangeFilter } from "../components";
import { Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import Paper from "@mui/material/Paper";

export function EnquiryListScreen() {
  const navigate = useNavigate();
  const activeCount = mockEnquiries.filter(
    (item) => item.status !== "Closed",
  ).length;
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [search, setSearch] = React.useState("");

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
            placeholder="Search name/phone"
            className="modern-search"
          />
        </Box>
      </Box>

      {mockEnquiries.length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 4, py: 4 }}>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No enquiries found.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {mockEnquiries.map((enquiry) => (
            <EnquiryCard
              key={enquiry.id}
              enquiry={enquiry}
              onView={() => navigate("/events/evt_1")}
              onConvert={() => navigate(`/events/new?enquiryId=${enquiry.id}`)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
