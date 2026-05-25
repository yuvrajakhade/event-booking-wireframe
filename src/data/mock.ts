import type { RecordItem } from "../types";

export const getDefaultInventory = () => [
  {
    id: "bedsheet",
    name: "Bedsheet",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "extra-bed",
    name: "Extra Bed",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "runner",
    name: "Runner",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "pillows",
    name: "Pillows",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "cushion",
    name: "Cushion",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "duvets",
    name: "Duvets",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "towels",
    name: "Towels",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
  {
    id: "napkins",
    name: "Napkins",
    plannedQty: 0,
    issuedQty: 0,
    returnedQty: 0,
  },
];

const fixedInventory = getDefaultInventory();

export const mockRecords: RecordItem[] = [
  {
    id: "evt_1",
    title: "Amit Mehra's Birthday Party",
    customerName: "Amit Mehra",
    phone: "+91-98765-43210",
    altPhone: "+91-98765-43212",
    venue: "Phase 1",
    rooms: ["Phase 1-101", "Phase 1-102"],
    eventDate: "2026-05-27",
    eventTime: "18:00",
    eventType: "Birthday",
    eventSource: "Booking",
    inventory: fixedInventory,
  },
  {
    id: "evt_2",
    title: "Sharma Wedding Reception",
    customerName: "Sharma Family",
    phone: "+91-91234-56789",
    altPhone: "+91-91234-56791",
    venue: "Phase 2",
    rooms: ["Phase 2-101", "Phase 2-102", "Others-101"],
    eventDate: "2026-05-29",
    eventTime: "19:30",
    eventType: "Wedding",
    eventSource: "Booking",
    inventory: fixedInventory,
  },
  {
    id: "evt_3",
    title: "Tata Digital Partner Meet",
    customerName: "Priya Sharma",
    phone: "+91-98111-22334",
    altPhone: "+91-98111-22339",
    venue: "Phase 1",
    rooms: ["Phase 1-101", "Phase 1-102"],
    eventDate: "2026-06-09",
    eventTime: "10:00",
    eventType: "Corporate",
    eventSource: "Booking",
    inventory: fixedInventory,
  },
  {
    id: "evt_4",
    title: "Sharma Wedding Reception",
    customerName: "Amit Jain",
    phone: "+91-99222-33445",
    altPhone: "+91-99222-33449",
    venue: "Phase 2",
    rooms: ["Phase 2-101", "Phase 2-102", "Others-101"],
    eventDate: "2026-06-18",
    eventTime: "17:00",
    eventType: "Wedding",
    eventSource: "Enquiry",
    inventory: fixedInventory,
  },
  {
    id: "evt_5",
    title: "Tata Digital Partner Meet",
    customerName: "Sana Kapoor",
    phone: "+91-99333-44556",
    altPhone: "+91-99333-44559",
    venue: "Phase 1",
    rooms: ["Phase 1-103"],
    eventDate: "2026-06-15",
    eventTime: "09:30",
    eventType: "Corporate",
    eventSource: "Enquiry",
    inventory: fixedInventory,
  },
  {
    id: "evt_6",
    title: "Sharma Wedding Reception",
    customerName: "Rajesh Gupta",
    phone: "+91-99444-55667",
    altPhone: "+91-99444-55679",
    venue: "Phase 2",
    rooms: ["Phase 2-103"],
    eventDate: "2026-06-11",
    eventTime: "14:00",
    eventType: "Wedding",
    eventSource: "Enquiry",
    inventory: fixedInventory,
  },
  {
    id: "evt_7",
    title: "Mumbai Startup Expo",
    customerName: "Neha Reddy",
    phone: "+91-99555-66778",
    altPhone: "+91-99555-66789",
    venue: "Phase 1",
    rooms: ["Others-202", "Others-203"],
    eventDate: "2026-04-16",
    eventTime: "11:00",
    eventType: "Conference",
    eventSource: "Booking",
    inventory: fixedInventory,
  },
  {
    id: "evt_8",
    title: "Tata Digital Partner Meet",
    customerName: "Vikram Singh",
    phone: "+91-99666-77889",
    altPhone: "+91-99666-77899",
    venue: "Phase 1",
    rooms: ["Phase 1-104", "Phase 1-105"],
    eventDate: "2026-03-10",
    eventTime: "08:30",
    eventType: "Corporate",
    eventSource: "Booking",
    inventory: fixedInventory,
  },
  {
    id: "evt_9",
    title: "Sharma Wedding Reception",
    customerName: "Pooja Nair",
    phone: "+91-99777-88990",
    altPhone: "+91-99777-88999",
    venue: "Phase 2",
    rooms: ["Phase 2-104"],
    eventDate: "2026-04-05",
    eventTime: "16:00",
    eventType: "Wedding",
    eventSource: "Enquiry",
    inventory: fixedInventory,
  },
];

export function createMockRecordId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

type MockRecordDraft = Omit<RecordItem, "id">;

function normalizeCompletedFlag(record: MockRecordDraft, existingId?: string) {
  if (!existingId) {
    return {
      ...record,
      completed: false,
    };
  }

  const existingRecord = mockRecords.find((item) => item.id === existingId);

  return {
    ...record,
    completed: record.completed ?? existingRecord?.completed === true,
  };
}

export function saveMockRecord(record: MockRecordDraft, existingId?: string) {
  const normalizedRecord = normalizeCompletedFlag(record, existingId);

  const savedRecord: RecordItem = {
    ...normalizedRecord,
    id: existingId ?? createMockRecordId(),
  };

  if (existingId) {
    const existingIndex = mockRecords.findIndex(
      (item) => item.id === existingId,
    );

    if (existingIndex !== -1) {
      mockRecords[existingIndex] = savedRecord;
      return savedRecord;
    }
  }

  mockRecords.push(savedRecord);
  return savedRecord;
}

export function saveMockRecordUpdate(
  existingRecord: RecordItem,
  updates: Partial<RecordItem>,
) {
  return saveMockRecord(
    {
      ...existingRecord,
      ...updates,
    },
    existingRecord.id,
  );
}

export function getRecordDate(record: RecordItem) {
  return record.eventDate ?? "";
}

export function sortRecordsByDateTime(records: RecordItem[]) {
  return [...records].sort((a, b) => {
    const timeA = getRecordDateTimeValue(a);
    const timeB = getRecordDateTimeValue(b);
    return timeA - timeB;
  });
}

function getRecordDateTimeValue(record: RecordItem) {
  if (!record.eventDate) return Number.POSITIVE_INFINITY;

  const parsed = new Date(`${record.eventDate}T${record.eventTime ?? "00:00"}`);

  return Number.isNaN(parsed.getTime())
    ? Number.POSITIVE_INFINITY
    : parsed.getTime();
}

export function isRecordCompleted(record: RecordItem) {
  if (record.completed === true) {
    return true;
  }

  const date = getRecordDate(record);
  return Boolean(date) && new Date(date) < new Date();
}
