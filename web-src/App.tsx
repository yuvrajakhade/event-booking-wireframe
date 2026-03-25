import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MuhurtProvider } from "./MuhurtContext";
import { AppLayout } from "./layouts/AppLayout";
import { InstallPrompt } from "./components/InstallPrompt";
import {
  LoginScreen,
  BookedEventsScreen,
  EnquiryListScreen,
  CheckInScreen,
  CheckOutScreen,
  CompletedEventsScreen,
  InventoryOverviewScreen,
  MuhurtScreen,
  NotificationsScreen,
  ProfileScreen,
  EventDetailsScreen,
  EventFormScreen,
  MissingInventoryScreen,
} from "./pages";

const AUTH_KEY = "eventflow/authenticated";

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(
    window.localStorage.getItem(AUTH_KEY) === "true",
  );

  const onLogin = React.useCallback(() => {
    window.localStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
  }, []);

  const onLogout = React.useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }, []);

  if (!authenticated) {
    return <LoginScreen onLogin={onLogin} />;
  }

  return (
    <MuhurtProvider>
      <InstallPrompt />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<BookedEventsScreen />} />
          <Route path="/events/new" element={<EventFormScreen mode="add" />} />
          <Route
            path="/events/:eventId/edit"
            element={<EventFormScreen mode="edit" />}
          />
          <Route path="/events/:eventId/check-in" element={<CheckInScreen />} />
          <Route
            path="/events/:eventId/check-out"
            element={<CheckOutScreen />}
          />
          <Route path="/events/:eventId" element={<EventDetailsScreen />} />
          <Route path="/enquiries" element={<EnquiryListScreen />} />
          <Route path="/completed" element={<CompletedEventsScreen />} />
          <Route path="/inventory" element={<InventoryOverviewScreen />} />
          <Route
            path="/inventory/missing/:eventId"
            element={<MissingInventoryScreen />}
          />
          <Route path="/muhurt" element={<MuhurtScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route
            path="/profile"
            element={<ProfileScreen onLogout={onLogout} />}
          />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </AppLayout>
    </MuhurtProvider>
  );
}
