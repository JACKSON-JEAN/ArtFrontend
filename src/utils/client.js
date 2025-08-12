import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  // uri: `http://localhost:4000/graphql`,
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  headers: {
    "Apollo-Require-Preflight": "true" // Required for file uploads
  }
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const refreshTokens = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation RefreshToken($refreshToken: String!) {
  refreshTokens(refreshToken: $refreshToken){
    accessToken
    refreshToken
  }
}
          `,
        variables: {
            refreshToken: refreshToken
        },
      }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    const { accessToken, refreshToken: newRefreshToken } = data.refreshTokens;

    // Update tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken; // Return the new access token
  } catch (error) {
    // Clear tokens and redirect to login if refresh fails
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
    throw error;
  }
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // Handle token expiration errors
        if (err.extensions?.code === 'UNAUTHENTICATED' && err.message === 'Token expired') {
          // Return an observable to handle the token refresh and retry the operation
          return new Observable((observer) => {
            refreshTokens()
              .then((newAccessToken) => {
                // Update the operation headers with the new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newAccessToken}`,
                  },
                });
  
                // Retry the request with the new token
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
  
                forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                // Redirect to login if refresh fails
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                observer.error(error);
              });
          });
        }
  
        // Handle unauthorized access errors
        if (err.extensions?.code === 'FORBIDDEN' || err.message === 'Unauthorized: Insufficient permissions') {
          // Redirect to unauthorized page
          window.location.href = '/unauthorized';
          return;
        }
      }
    }
});

const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(uploadLink)), // Chain the links
    cache: new InMemoryCache(),
});

export default client;
