export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://sukeltajat.fi";
};

export const getApiBaseUrl = () => {
  return process.env.WORDPRESS_API_URL || "https://sukeltajat.fi/wp";
};
