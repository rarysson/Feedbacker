export default (httClient) => ({
  getMe: async () => {
    const response = await httClient.get("/users/me");

    return {
      data: response.data,
    };
  },
});
