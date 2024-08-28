// import { getLoggedInUserId } from "@/helpers/utils";
import { baseApi } from "./api";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => `/Tags`,
      providesTags: ["Tags"],
    }),
    getTagById: builder.query({
      query: (tagId) => `/Tags/${tagId}`,
      providesTags: (_result, _error, arg) => {
        return ["Tags", arg];
      },
    }),
    createTag: builder.mutation({
      query: (body) => ({
        url: `/Tags`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Tags"],
    }),
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `/Tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),
    UpdateTag: builder.mutation({
      query: ({ name, tagId }) => ({
        url: `/Tags/${tagId}`,
        method: "PUT",
        body: {
          name,
          isActive: true,
        },
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useGetAllTagsQuery, useGetTagByIdQuery, useCreateTagMutation, useDeleteTagMutation, useUpdateTagMutation } = tagApi;
