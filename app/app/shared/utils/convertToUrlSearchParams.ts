export const convertToUrlSearchParams = <T extends object>(params: T) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]: any) => {
    if (Array.isArray(value)) {
      value.forEach((value) => searchParams.append(key, value.toString()));
    } else {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams;
};