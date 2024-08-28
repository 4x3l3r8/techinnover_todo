import { toast } from "@/components/Common";
import { logoutAction } from "@/helpers/constants";
import { createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../services/course.api";

const initialCourseCreationState = {
  step: 0,
  selectedModuleId: null,
  selectedLessonId: null,
  viewType: "module", // "module" | "lesson"
  courseInfo: {
    id: null,
    title: "",
    enrollmentCode: "",
    description: "",
    tags: [],
    image: null,
  },
  courseContents: {
    modules: [
      {
        id: null,
        index: null,
        name: "",
        lessons: [
          {
            id: null,
            index: null,
            type: "", // "file" | "text"
            name: "",
            content: null,
          },
        ],
      },
    ],
    lastUpdated: new Date().toLocaleString(),
  },
};

const courseCreation = createSlice({
  name: "CourseWizard",
  initialState: initialCourseCreationState,
  reducers: {
    prevStep: (state) => {
      // don't proceed if step is first
      if (state.step !== 0) {
        state.step -= 1;
      }
    },
    nextStep: (state) => {
      // don't proceed if step is last
      if (state.step !== 3) {
        state.step += 1;
      }
    },
    jumpToStep: (state, action) => {
      state.step = action.payload;
    },
    updateCourseInfo: (state, action) => {
      state.courseInfo = action.payload;
    },
    /* The `addNewModule` function is a reducer action that adds a new module to the course contents. */
    addNewModule: (state) => {
      const modules = state.courseContents.modules;
      const newModuleToBeAdded = {
        // index: modules[modules.length - 1].index + 1,  ------ to be added in the conditional
        name: "New",
        lessons: [
          {
            index: null,
            id: null,
            type: "",
            name: "",
            content: null, // can be string or base64 file
          },
        ],
      };

      if (modules.length > 0 && state.courseContents.modules[0].index !== null) {
        modules.push({ ...newModuleToBeAdded, index: modules[modules.length - 1].index + 1 });

        //   then set the new module Id as active ID
        state.selectedModuleId = modules[modules.length - 1].index;
      } else {
        state.courseContents.modules = [{ ...newModuleToBeAdded, index: 0 }];

        //   then set the new module Id as active ID
        state.selectedModuleId = 0;
      }

      // set the view to module
      state.viewType = "module";
    },
    removeModule: (state, action) => {
      const newModuleList = state.courseContents.modules.filter((module) => module.index !== action.payload);
      state.courseContents.modules = newModuleList;
    },
    updateModuleName: (state, action) => {
      state.courseContents.modules.find((module) => module.index === state.selectedModuleId).name = action.payload;
    },
    setActiveModule: (state, action) => {
      state.selectedModuleId = action.payload;
    },
    /* The `addNewLesson` function is a reducer action that adds a new lesson to the course contents. */
    addNewLesson: (state, action) => {
      // get active module
      const activeModule = state.courseContents.modules.find((module) => module.index === state.selectedModuleId);

      const newLessonToBeAdded = {
        type: action.payload,
        name: "New Lesson",
        content: null,
      };

      if (activeModule.lessons.length > 0 && activeModule.lessons[0].index !== null) {
        activeModule.lessons.push({ ...newLessonToBeAdded, index: activeModule.lessons[activeModule.lessons.length - 1].index + 1 });

        // then set active lesson to newly added lesson
        state.selectedLessonId = activeModule.lessons[activeModule.lessons.length - 1].index;
      } else {
        activeModule.lessons = [{ ...newLessonToBeAdded, index: 0 }];

        // set new lesson index to active lesson
        state.selectedLessonId = 0;
      }

      // change content view type to lesson mode
      // state.viewType = "lesson";
    },
    removeLesson: (state, action) => {
      const newLessonList = state.courseContents.modules
        .find((module) => module.index === state.selectedModuleId)
        .lessons.filter((lesson) => lesson.index !== action.payload);

      state.courseContents.modules.find((module) => module.index === state.selectedModuleId).lessons = newLessonList;
    },
    setActiveLesson: (state, action) => {
      state.selectedLessonId = action.payload;
    },
    updateLessonName: (state, action) => {
      state.courseContents.modules
        .find((module) => module.index === state.selectedModuleId)
        .lessons.find((lesson) => lesson.index === state.selectedLessonId).name = action.payload;
    },
    updateView: (state, action) => {
      state.viewType = action.payload;
    },
    updateLessonContent: (state, action) => {
      state.courseContents.modules
        .find((module) => module.index === state.selectedModuleId)
        .lessons.find((lesson) => lesson.index === state.selectedLessonId).content = action.payload;
    },
    setCourse: (state, { payload }) => {
      state.step = 0;
      state.courseInfo = {
        tags: payload.tags?.split(","),
        description: payload.courseDescription,
        id: payload.courseId,
        enrollmentCode: payload.enrollmentCode,
        image: payload.coverImage,
        title: payload.courseName,
      };
      state.courseContents.modules = payload.courseModules.map((module, index) => {
        return {
          id: module.courseModuleId,
          index,
          name: module.courseModuleTitle,
          lessons: module.courseTopics.map((lesson, index) => {
            return {
              index,
              id: lesson.courseTopicId,
              name: lesson.courseTopicTitle,
              content: lesson.content,
              // type: MediaTypeGetter[lesson.mediaType],
              type: lesson.mediaType.toLowerCase(),
            };
          }),
        };
      });
      state.selectedLessonId = 0;
      state.selectedModuleId = 0;
      state.courseContents.lastUpdated = payload.dateUpdated;
    },
    resetCourseCreationState: () => initialCourseCreationState,
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, () => {
      return initialCourseCreationState;
    });
    builder.addMatcher(courseApi.endpoints.createCourse.matchFulfilled, (state, { payload }) => {
      state.courseInfo = {
        id: payload.data.courseId,
        tags: payload.data.tags.split(","),
        description: payload.data.courseDescription,
        name: payload.data.courseName,
        enrollmentCode: payload.data.enrollmentCode,
        image: payload.data.coverImage,
      };
      if (state.step === 0) {
        state.step += 1;
      }
      toast({
        status: "success",
        title: "Operation Complete",
        description: "Course created successfully!",
      });
    });
    builder.addMatcher(courseApi.endpoints.createCourse.matchRejected, (state) => {
      if (state.step === 1) {
        state.step -= 1;
      }
      toast({
        status: "error",
        title: "Error",
        description: "Failed to create course",
      });
    });
  },
});

export default courseCreation.reducer;

export const { ...actions } = courseCreation.actions;

export const selectCourseCreationState = (state) => state.courseCreation;
