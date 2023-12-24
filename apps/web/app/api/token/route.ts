export const GET = (req, res) => {
  res.status(200).json({
    access_token: null,
    expires_in: 3600,
    token_type: "Bearer",
  });
};
