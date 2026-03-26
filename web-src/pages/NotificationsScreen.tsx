import React from "react";
import { mockEvents } from "../../src/data/mock";
import { Event } from "../../src/types";
import { BellOff } from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Alert,
  Box,
  Divider,
} from "@mui/material";

function listMissing(event: Event) {
  return event.inventory
    .map((item) => ({
      item,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter(({ missing }) => missing > 0);
}

export function NotificationsScreen() {
  const missing = mockEvents.flatMap((event) =>
    listMissing(event).map(({ item, missing: qty }) => ({
      id: `${event.id}-${item.id}`,
      event: event.title,
      item: item.name,
      qty,
    })),
  );

  const affectedEvents = new Set(missing.map((item) => item.event)).size;
  const totalMissingUnits = missing.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight={700} color="primary">
              Notifications
            </Typography>
            <Chip
              color="secondary"
              label={`${affectedEvents} Events • ${totalMissingUnits} Missing`}
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </CardContent>
      </Card>

      {missing.length === 0 ? (
        <Card elevation={1} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
          <CardContent>
            <BellOff size={48} style={{ color: "#bdbdbd", marginBottom: 8 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No notifications for today
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You will see Muhurt reminders here when a date matches today.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          <Alert severity="warning" sx={{ fontWeight: 500 }}>
            Active alerts: {missing.length} • Events: {affectedEvents} • Missing
            units: {totalMissingUnits}
          </Alert>
          {missing.map((notice) => (
            <Card key={notice.id} elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary.dark"
                >
                  {notice.event}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" color="error.main">
                  Missing {notice.qty} × {notice.item}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
