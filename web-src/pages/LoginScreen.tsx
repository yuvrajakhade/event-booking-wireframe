import React from "react";
import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";

type LoginScreenProps = {
  onLogin: () => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    onLogin();
  };

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.phone ||
      !signUpData.password ||
      !signUpData.confirmPassword
    )
      return;
    if (signUpData.password !== signUpData.confirmPassword) return;
    onLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f7f7f7",
      }}
    >
      <Card sx={{ minWidth: 340, maxWidth: 400, mx: 2, p: 2 }} elevation={3}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            {showSignUp ? "Create Account" : "Welcome Back"}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {showSignUp
              ? "Register to manage your events"
              : "Sign in to manage your events"}
          </Typography>
          {!showSignUp ? (
            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => setShowSignUp(true)}
                  fullWidth
                  startIcon={<UserPlus size={18} />}
                >
                  Don't have an account? Sign Up
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Button
                type="button"
                variant="text"
                onClick={() => setShowSignUp(false)}
                startIcon={<ArrowLeft size={18} />}
                sx={{ mb: 2 }}
              >
                Back to Login
              </Button>
              <Box component="form" onSubmit={handleSignUp}>
                <Stack spacing={2}>
                  <TextField
                    label="Full Name"
                    type="text"
                    value={signUpData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    placeholder="yourname@example.com"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    placeholder="Create a strong password"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Re-enter your password"
                    required
                    fullWidth
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ShieldCheck size={16} />
                    <Typography variant="caption" color="text.secondary">
                      By registering, you agree to our Terms & Conditions
                    </Typography>
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ fontWeight: 600 }}
                  >
                    Create Account
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </CardContent>
        {/* Footer removed as requested */}
      </Card>
    </Box>
  );
}
