import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from "react-native";

export type MuhurtDate = {
  id: string;
  date: string;
  description: string;
};

type AddMuhurtDateInput = {
  date: string;
  description: string;
};

type MuhurtContextValue = {
  muhurtDates: MuhurtDate[];
  todayMuhurtDates: MuhurtDate[];
  addMuhurtDate: (input: AddMuhurtDateInput) => void;
  removeMuhurtDate: (id: string) => void;
};

const DAILY_NOTICE_STORAGE_KEY = "@event_ui/muhurt_daily_notice";

const initialMuhurtDates: MuhurtDate[] = [
  {
    id: "1",
    date: "2026-03-15",
    description: "Holi Celebration",
  },
  {
    id: "2",
    date: "2026-04-14",
    description: "New Year (Hindi Calendar)",
  },
];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const MuhurtContext = React.createContext<MuhurtContextValue | undefined>(
  undefined,
);

export function MuhurtProvider({ children }: { children: React.ReactNode }) {
  const [muhurtDates, setMuhurtDates] =
    React.useState<MuhurtDate[]>(initialMuhurtDates);

  const today = toIsoDate(new Date());

  const todayMuhurtDates = React.useMemo(
    () => muhurtDates.filter((item) => item.date === today),
    [muhurtDates, today],
  );

  React.useEffect(() => {
    const showTodayReminder = async () => {
      if (!todayMuhurtDates.length) {
        return;
      }

      const lastNotifiedDate = await AsyncStorage.getItem(
        DAILY_NOTICE_STORAGE_KEY,
      );
      if (lastNotifiedDate === today) {
        return;
      }

      const occasions = todayMuhurtDates
        .map((item) => item.description)
        .join(", ");
      const message =
        todayMuhurtDates.length === 1
          ? `Today's Muhurt: ${occasions}`
          : `Today's Muhurt dates: ${occasions}`;

      Alert.alert("Muhurt Reminder", message);
      await AsyncStorage.setItem(DAILY_NOTICE_STORAGE_KEY, today);
    };

    showTodayReminder();
  }, [today, todayMuhurtDates]);

  const addMuhurtDate = React.useCallback(
    ({ date, description }: AddMuhurtDateInput) => {
      setMuhurtDates((current) => [
        ...current,
        {
          id: Date.now().toString(),
          date,
          description,
        },
      ]);
    },
    [],
  );

  const removeMuhurtDate = React.useCallback((id: string) => {
    setMuhurtDates((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({
      muhurtDates,
      todayMuhurtDates,
      addMuhurtDate,
      removeMuhurtDate,
    }),
    [muhurtDates, todayMuhurtDates, addMuhurtDate, removeMuhurtDate],
  );

  return (
    <MuhurtContext.Provider value={value}>{children}</MuhurtContext.Provider>
  );
}

export function useMuhurt() {
  const context = React.useContext(MuhurtContext);

  if (!context) {
    throw new Error("useMuhurt must be used within a MuhurtProvider");
  }

  return context;
}
