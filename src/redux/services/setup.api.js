import { baseApi } from "./api";

export const setupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStates: builder.query({
      query: () => ({
        url: `/Setup/GetStates`,
        method: "GET",
      })
    }),
    getLgasByState: builder.query({
      query: (stateId) => ({
        url: `/Setup/GetLGAs/${stateId}`,
        method: "GET",
      })
    }),
  }),
});

export const { useGetStatesQuery, useGetLgasByStateQuery } = setupApi;
