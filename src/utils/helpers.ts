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

export const searchTasks = (tasks: Task[], searchTerm: string): Task[] => {
  const lowercasedTerm = searchTerm.toLowerCase().trim();

  return tasks?.filter((task) => {
    // Search in name
    if (task.name.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in description (if it exists)
    if (task.description?.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in priority
    if (task.priority.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in status
    if (task.status.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in deadline (assuming it's a string in a searchable format)
    if (task.deadline.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in time
    if (task.time.toLowerCase().includes(lowercasedTerm)) return true;

    // If the search term is a valid date, compare it with the deadline
    const searchDate = new Date(searchTerm);
    if (!isNaN(searchDate.getTime())) {
      const taskDate = new Date(task.deadline);
      if (taskDate.toDateString() === searchDate.toDateString()) return true;
    }

    return false;
  });
};
