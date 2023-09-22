/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing users.
 * @returns {Promise<[habit]>}
 *  a promise that resolves to a possibly empty array of users saved in the database.
 */
export async function listUsers(params,signal) {
  const url = new URL(`${API_BASE_URL}/users`);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );

  return await fetchJson(url, { headers, signal }, [])
}

/**
 * Retrieves all existing teams.
 * @returns {Promise<[teams]>}
 *  a promise that resolves to a possibly empty array of teams saved in the database.
 */
 export async function listTeams(params,signal) {
  const url = new URL(`${API_BASE_URL}/teams`);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );

  return await fetchJson(url, { headers, signal }, [])
}

/**
 * Saves user to the database.
 * There is no validation done on the user object, any object will be saved.
 * @param user
 *  the user to save, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<user>}
 *  a promise that resolves the saved user, which will now have an `id` property.
 */
 export async function createUser(user, signal) {

  const url = `${API_BASE_URL}/users/new`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: user}),
    signal,
  };

  return await fetchJson(url, options, {});
}