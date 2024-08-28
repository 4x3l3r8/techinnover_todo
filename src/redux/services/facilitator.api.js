// import { getLoggedInUserId } from "@/helpers/utils";
import { baseApi } from "./api";

export const facilitatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilitators: builder.query({
      query: () => `/Facilitator/GetFacilitators`,
      providesTags: ["Facilitators"],
    }),
    getFacilitatorById: builder.query({
      query: (tagId) => `/Facilitator/${tagId}`,
      providesTags: (_result, _error, arg) => {
        return ["Facilitators", arg];
      },
    }),
    createFacilitator: builder.mutation({
      query: (body) => ({
        url: `/Facilitator/CreateFacilitator`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Facilitators"],
    }),
    deleteFacilitator: builder.mutation({
      query: (tagId) => ({
        url: `/Facilitator/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Facilitators"],
    }),
    UpdateFacilitator: builder.mutation({
      query: ({ facilitatorId, ...body }) => ({
        url: `/Facilitator/${facilitatorId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Facilitators"],
    }),
  }),
});

export const {
  useCreateFacilitatorMutation,
  useDeleteFacilitatorMutation,
  useGetAllFacilitatorsQuery,
  useGetFacilitatorByIdQuery,
  useUpdateFacilitatorMutation,
} = facilitatorApi;
