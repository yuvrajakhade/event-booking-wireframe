import React from "react";

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

const STORAGE_KEY = "eventflow/muhurt-dates";

const initialMuhurtDates: MuhurtDate[] = [
  { id: "1", date: "2026-03-15", description: "Holi Celebration" },
  { id: "2", date: "2026-04-14", description: "New Year (Hindi Calendar)" },
];

const MuhurtContext = React.createContext<MuhurtContextValue | undefined>(
  undefined,
);

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function MuhurtProvider({ children }: { children: React.ReactNode }) {
  const [muhurtDates, setMuhurtDates] = React.useState<MuhurtDate[]>(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialMuhurtDates;
    try {
      return JSON.parse(raw) as MuhurtDate[];
    } catch {
      return initialMuhurtDates;
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(muhurtDates));
  }, [muhurtDates]);

  const today = toIsoDate(new Date());
  const todayMuhurtDates = React.useMemo(
    () => muhurtDates.filter((item) => item.date === today),
    [muhurtDates, today],
  );

  const addMuhurtDate = React.useCallback(
    ({ date, description }: AddMuhurtDateInput) => {
      setMuhurtDates((current) => [
        ...current,
        { id: Date.now().toString(), date, description },
      ]);
    },
    [],
  );

  const removeMuhurtDate = React.useCallback((id: string) => {
    setMuhurtDates((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({ muhurtDates, todayMuhurtDates, addMuhurtDate, removeMuhurtDate }),
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
