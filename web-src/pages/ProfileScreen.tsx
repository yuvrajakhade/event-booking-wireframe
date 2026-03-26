import React from "react";
import {
  Building2,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";

type ProfileScreenProps = {
  onLogout: () => void;
};

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, px: 2 }}>
      <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
              <UserCircle2 size={40} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Event Manager
              </Typography>
              <Chip
                icon={<ShieldCheck size={18} style={{ marginLeft: 4 }} />}
                label="Admin"
                color="success"
                size="small"
                sx={{ mt: 0.5, fontWeight: 500 }}
              />
            </Box>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Mail size={18} />
              <Typography variant="body1">manager@example.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Phone size={18} />
              <Typography variant="body1">+91 99999 99999</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Building2 size={18} />
              <Typography variant="body1">Event Operations</Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogOut size={18} />}
            onClick={onLogout}
            sx={{ mt: 3, fontWeight: 600 }}
            fullWidth
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      <Card elevation={1} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Security
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Session status: Active
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last login: Today
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
