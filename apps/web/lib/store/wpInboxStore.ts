import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WpInboxStore {
  selectedChat: null | string;
  setSelectedChat: (chat: string) => void;
}

const useWpInboxStore = create<WpInboxStore>()(
  devtools(
    persist(
      (set) => ({
        selectedChat: null,
        setSelectedChat: (chat) => set({ selectedChat: chat }),
      }),
      { name: "wpInboxStore" },
    ),
  ),
);

export default useWpInboxStore;
