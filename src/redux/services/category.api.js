import { baseApi } from "./api";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseCategories: builder.query({
      query: () => `/CourseCategories`,
      providesTags: ["Categories"],
    }),
    getCourseCategoryById: builder.query({
      query: (tagId) => `/CourseCategories/${tagId}`,
      providesTags: (_result, _error, arg) => {
        return ["Categories", arg];
      },
    }),
    createCourseCategory: builder.mutation({
      query: (body) => ({
        url: `/CourseCategories`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCourseCategory: builder.mutation({
      query: (tagId) => ({
        url: `/CourseCategories/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCourseCategory: builder.mutation({
      query: ({ categoryId, ...body }) => ({
        url: `/CourseCategories/${categoryId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
  useGetAllCourseCategoriesQuery,
  useGetCourseCategoryByIdQuery,
  useUpdateCourseCategoryMutation,
} = categoryApi;
