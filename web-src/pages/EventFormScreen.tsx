import React from "react";
// import { RoomsDropdown } from "../components/RoomsDropdown";
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
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  IconButton,
  Popover,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  // Room group arrays for group-wise selection
  const phase1Rooms = [
    "Phase 1-101",
    "Phase 1-102",
    "Phase 1-103",
    "Phase 1-104",
    "Phase 1-105",
    "Phase 1-106",
    "Phase 1-107",
    "Phase 1-108",
    "Phase 1-109",
  ];
  const phase2Rooms = [
    "Phase 2-101",
    "Phase 2-102",
    "Phase 2-103",
    "Phase 2-104",
    "Phase 2-105",
    "Phase 2-106",
  ];
  const othersRooms = [
    "Others-101",
    "Others-102",
    "Others-103",
    "Others-104",
    "Others-105",
    "Others-106",
    "Others-107",
    "Others-108",
    "Others-109",
    "Others-110",
    "Others-201",
    "Others-202",
    "Others-203",
    "Others-204",
    "Others-205",
    "Others-206",
    "Others-207",
    "Others-208",
    "Others-209",
    "Others-210",
    "Others-301",
    "Others-302",
    "Others-303",
    "Others-304",
    "Others-305",
    "Others-306",
    "Others-307",
    "Others-308",
    "Others-309",
    "Others-310",
    "Others-401",
    "Others-402",
    "Others-403",
    "Others-404",
    "Others-405",
    "Others-406",
    "Others-407",
    "Others-408",
    "Others-409",
    "Others-410",
  ];
  const [roomsAnchorEl, setRoomsAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

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
                <MenuItem value="Phase 1">Phase 1</MenuItem>
                <MenuItem value="Phase 2">Phase 2</MenuItem>
              </TextField>
              {/* Group-wise Multi-Select Dropdown for Rooms */}
              <FormControl fullWidth required>
                <InputLabel id="rooms-multiselect-label">Rooms *</InputLabel>
                <OutlinedInput
                  label="Rooms *"
                  value={formData.rooms}
                  readOnly
                  endAdornment={
                    <IconButton
                      onClick={(e) => setRoomsAnchorEl(e.currentTarget)}
                      edge="end"
                      size="small"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                  onClick={(e) => setRoomsAnchorEl(e.currentTarget)}
                  sx={{ cursor: "pointer", background: "#fafbff" }}
                />
              </FormControl>
              <Popover
                open={Boolean(roomsAnchorEl)}
                anchorEl={roomsAnchorEl}
                onClose={() => setRoomsAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{ style: { minWidth: 320, maxWidth: 400 } }}
              >
                <Box sx={{ p: 2 }}>
                  {/* Phase 1 group */}
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Checkbox
                        checked={phase1Rooms.every((r) =>
                          formData.rooms.includes(r),
                        )}
                        indeterminate={
                          phase1Rooms.some((r) => formData.rooms.includes(r)) &&
                          !phase1Rooms.every((r) => formData.rooms.includes(r))
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateField(
                            "rooms",
                            checked
                              ? Array.from(
                                  new Set([...formData.rooms, ...phase1Rooms]),
                                )
                              : formData.rooms.filter(
                                  (r) => !phase1Rooms.includes(r),
                                ),
                          );
                        }}
                        size="small"
                      />
                      <Typography sx={{ fontWeight: 600 }}>
                        Phase 1 (9)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 1,
                      }}
                    >
                      {phase1Rooms.map((room) => (
                        <Box
                          key={room}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            checked={formData.rooms.includes(room)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateField(
                                "rooms",
                                checked
                                  ? [...formData.rooms, room]
                                  : formData.rooms.filter((r) => r !== room),
                              );
                            }}
                            size="small"
                          />
                          <ListItemText
                            primary={room.replace(/^[^-]+-/, "")}
                            sx={{ display: "inline" }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {/* Phase 2 group */}
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Checkbox
                        checked={phase2Rooms.every((r) =>
                          formData.rooms.includes(r),
                        )}
                        indeterminate={
                          phase2Rooms.some((r) => formData.rooms.includes(r)) &&
                          !phase2Rooms.every((r) => formData.rooms.includes(r))
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateField(
                            "rooms",
                            checked
                              ? Array.from(
                                  new Set([...formData.rooms, ...phase2Rooms]),
                                )
                              : formData.rooms.filter(
                                  (r) => !phase2Rooms.includes(r),
                                ),
                          );
                        }}
                        size="small"
                      />
                      <Typography sx={{ fontWeight: 600 }}>
                        Phase 2 (6)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 1,
                      }}
                    >
                      {phase2Rooms.map((room) => (
                        <Box
                          key={room}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            checked={formData.rooms.includes(room)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateField(
                                "rooms",
                                checked
                                  ? [...formData.rooms, room]
                                  : formData.rooms.filter((r) => r !== room),
                              );
                            }}
                            size="small"
                          />
                          <ListItemText
                            primary={room.replace(/^[^-]+-/, "")}
                            sx={{ display: "inline" }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {/* Others group */}
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Checkbox
                        checked={othersRooms.every((r) =>
                          formData.rooms.includes(r),
                        )}
                        indeterminate={
                          othersRooms.some((r) => formData.rooms.includes(r)) &&
                          !othersRooms.every((r) => formData.rooms.includes(r))
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateField(
                            "rooms",
                            checked
                              ? Array.from(
                                  new Set([...formData.rooms, ...othersRooms]),
                                )
                              : formData.rooms.filter(
                                  (r) => !othersRooms.includes(r),
                                ),
                          );
                        }}
                        size="small"
                      />
                      <Typography sx={{ fontWeight: 600 }}>
                        Others (40)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: 1,
                        maxHeight: 180,
                        overflowY: "auto",
                      }}
                    >
                      {othersRooms.map((room) => (
                        <Box
                          key={room}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            checked={formData.rooms.includes(room)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateField(
                                "rooms",
                                checked
                                  ? [...formData.rooms, room]
                                  : formData.rooms.filter((r) => r !== room),
                              );
                            }}
                            size="small"
                          />
                          <ListItemText
                            primary={room.replace(/^[^-]+-/, "")}
                            sx={{ display: "inline" }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Popover>
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
