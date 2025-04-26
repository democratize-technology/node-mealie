export function buildQueryParams<T extends Record<string, any>>(params?: T): string {
  if (!params) return '';

  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    // Skip undefined and null values
    if (value === undefined || value === null) {
      continue;
    }

    // Special handling for empty strings and 0 values - they should be included
    if (value === '' || value === 0) {
      queryParams.append(key, String(value));
      continue;
    }

    // Convert arrays to comma-separated strings
    if (Array.isArray(value)) {
      if (value.length > 0) {
        queryParams.append(key, value.join(','));
      }
      continue;
    }

    // Convert objects to JSON strings
    if (typeof value === 'object') {
      queryParams.append(key, JSON.stringify(value));
      continue;
    }

    // Convert everything else to string
    queryParams.append(key, String(value));
  }

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}
