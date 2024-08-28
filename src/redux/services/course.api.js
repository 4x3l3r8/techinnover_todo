import { baseApi } from "./api";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => `/Course/GetCourses`,
      providesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (id) => `/Course/${id}`,
      providesTags: (success, error, arg) => ["Courses", arg],
    }),
    getCourseCurriculumByCourseId: builder.query({
      query: (id) => `/Course/GetCourseCurriculumModulesWithLessons/${id}`,
      providesTags: (success, error, arg) => ["Courses", arg],
    }),
    editCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/Course/${id}`,
        method: "PUT",
        body,
      }),
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: `/Course/CreateCourse`,
        method: "PUT",
        body,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/Course/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllCoursesQuery, useGetCourseByIdQuery, useEditCourseMutation, useCreateCourseMutation, useDeleteCourseMutation, useGetCourseCurriculumByCourseIdQuery } = courseApi;
