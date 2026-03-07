export type InventoryItem = {
  id: string;
  name: string;
  unit: string;
  plannedQty: number;
  issuedQty: number;
  returnedQty: number;
  rate?: number;
};

export type EventStatus = "Upcoming" | "Ongoing" | "Completed";

export type Event = {
  id: string;
  title: string;
  customerName: string;
  phone?: string;
  venue: string;
  rooms: string[];
  start: string; // ISO
  end: string; // ISO
  status: EventStatus;
  inventory: InventoryItem[];
};

export type EnquiryStatus = "Open" | "Follow-up due" | "Converted" | "Closed";

export type Enquiry = {
  id: string;
  name: string;
  phone?: string;
  eventDate: string; // ISO date
  guests?: number;
  status: EnquiryStatus;
  source?: string;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  EventForm: { mode: "add" | "edit"; eventId?: string } | undefined;
  CheckIn: { eventId: string };
  CheckOut: { eventId: string };
  MissingInventory: { eventId: string };
};

export type TabsParamList = {
  BookedEvents: undefined;
  Enquiries: undefined;
  CompletedEvents: undefined;
  Inventory: undefined;
  Muhurt: undefined;
  Profile: undefined;
};
