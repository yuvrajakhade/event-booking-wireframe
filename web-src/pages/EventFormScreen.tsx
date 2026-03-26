import React from "react";
import { RoomsDropdown } from "../components/RoomsDropdown";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { mockEnquiries, mockEvents } from "../../src/data/mock";
import { CalendarDays, Save, X } from "lucide-react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Grid,
} from "@mui/material";

export function EventFormScreen({ mode = "add" }: { mode?: "add" | "edit" }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const enquiryId = searchParams.get("enquiryId");

  const existingEvent =
    mode === "edit"
      ? mockEvents.find((event) => event.id === eventId)
      : undefined;
  const enquiry = enquiryId
    ? mockEnquiries.find((item) => item.id === enquiryId)
    : undefined;
  // New form state for all fields in the screenshot
  const [formData, setFormData] = React.useState({
    title: existingEvent?.title || "",
    customer: existingEvent?.customerName || "",
    phone: existingEvent?.phone || "",
    altPhone: existingEvent?.altPhone || "",
    eventType: existingEvent?.eventType || "",
    venue: existingEvent?.venue || "",
    rooms: existingEvent?.rooms || [],
    eventSource: existingEvent?.eventSource || "Enquiry",
    confirmed: existingEvent?.confirmed || false,
    startDate: existingEvent?.start?.slice(0, 10) || "",
    startTime: existingEvent?.start?.slice(11, 16) || "",
    endDate: existingEvent?.end?.slice(0, 10) || "",
    endTime: existingEvent?.end?.slice(11, 16) || "",
  });

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Save logic here
    alert("Event " + (mode === "edit" ? "updated" : "created") + "! (Demo)");
    navigate(-1);
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Card sx={{ mb: 3 }}>
          <CardHeader
            avatar={
              <Box
                sx={{
                  background: "#7266F0",
                  borderRadius: 2,
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "white" }} />
              </Box>
            }
            title={<Typography variant="h6">Basic Information</Typography>}
          />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Title *"
                placeholder="Event title"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Customer *"
                placeholder="Customer name"
                value={formData.customer}
                onChange={(e) => updateField("customer", e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Phone"
                placeholder="+91..."
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                fullWidth
              />
              <TextField
                label="Alternative Number"
                placeholder="+91..."
                value={formData.altPhone}
                onChange={(e) => updateField("altPhone", e.target.value)}
                fullWidth
              />
              <TextField
                select
                label="Event Type *"
                value={formData.eventType}
                onChange={(e) => updateField("eventType", e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="">Select event type...</MenuItem>
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                select
                label="Venue *"
                value={formData.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="">Select venue...</MenuItem>
                <MenuItem value="Hall A">Hall A</MenuItem>
                <MenuItem value="Lawn 1">Lawn 1</MenuItem>
                <MenuItem value="Convention Center B">
                  Convention Center B
                </MenuItem>
                <MenuItem value="Banquet Hall">Banquet Hall</MenuItem>
                <MenuItem value="Open Ground">Open Ground</MenuItem>
              </TextField>
              <RoomsDropdown
                selectedRooms={formData.rooms}
                onChange={(rooms) => updateField("rooms", rooms)}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Event Source *
                </Typography>
                <ToggleButtonGroup
                  value={formData.eventSource}
                  exclusive
                  onChange={(_e, value) =>
                    value && updateField("eventSource", value)
                  }
                  aria-label="event source"
                >
                  <ToggleButton value="Enquiry">Enquiry</ToggleButton>
                  <ToggleButton value="Booking">Booking</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            avatar={
              <Box sx={{ background: "#1CC8C8", borderRadius: 2, p: 1 }}>
                <CalendarDays size={24} color="#fff" />
              </Box>
            }
            title={<Typography variant="h6">Event Schedule</Typography>}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField("startTime", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<X size={16} />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Save size={16} />}
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
