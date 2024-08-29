import { Task } from "@/components/Calendar/types";

export const simulateImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a fake URL or ID
      const fakeUrl = `https://fake-image-host.com/${file.name}-${Date.now()}.jpg`;
      resolve(fakeUrl);
    }, 1000); // Simulate upload time
  });
};

const STORAGE_KEY = "taskManagerTasks";

export const loadTasksFromStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
