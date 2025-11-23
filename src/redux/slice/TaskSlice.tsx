import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/TaskTypes";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
