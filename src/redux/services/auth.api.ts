import { baseApi } from "./api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/User/Login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/User/Register",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.query({
      query: (userId) => ({
        url: `/User/VerifyUser/${userId}`,
        method: "PUT",
      }),
    }),
    getUsers: builder.query({
      query: () => `/User/GetUsers`,
      providesTags: ["Applicants"],
    }),
    resendEmail: builder.mutation({
      query: (email) => ({
        url: `/User/ResendEmailVerificationLink?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyQuery, useGetUsersQuery, useResendEmailMutation } = authApi;
