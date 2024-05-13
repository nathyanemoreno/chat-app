export const ENV_VARIABLES = {
  SALT_ROUNDS: process.env.SALT_ROUNDS ?? 10,
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD ?? "default",
  TESTER_DEFAULT_PASSWORD: process.env.TESTER_DEFAULT_PASSWORD ?? "default",
};
