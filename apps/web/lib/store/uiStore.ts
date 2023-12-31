"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ToolbarVariant = "dense" | "regular";

interface UiStoreValues {
  appbarHeight: number;
  toolbarVariant: ToolbarVariant;
}

interface UiStoreFunctions {
  setAppbarHeight: (height: number) => void;
  setToolbarVariant: (variant: ToolbarVariant) => void;
  toggleToolbarVariant: () => void;
}

type UiStore = UiStoreValues & UiStoreFunctions;

const STORE_KEY = "uiStore";

const defaultValues: UiStoreValues = {
  appbarHeight: 42,
  toolbarVariant: "dense",
};

const getDefault = (): UiStoreValues => {
  if (typeof window === "undefined") return defaultValues;

  const localData = window?.localStorage?.getItem(STORE_KEY);

  if (localData) {
    return JSON.parse(localData).state as UiStoreValues;
  }

  return defaultValues;
};

const useUiStore = create<UiStore>()(
  devtools(
    persist(
      (set) => ({
        ...getDefault(),

        setAppbarHeight: (height) => set({ appbarHeight: height }),
        setToolbarVariant: (variant) => set({ toolbarVariant: variant }),
        toggleToolbarVariant: () =>
          set((state) => ({
            toolbarVariant:
              state.toolbarVariant === "dense" ? "regular" : "dense",
          })),
      }),
      {
        name: STORE_KEY,
        skipHydration: true,
        version: 1,
      },
    ),
  ),
);

export default useUiStore;
