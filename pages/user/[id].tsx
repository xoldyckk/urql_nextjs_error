import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, gql, CombinedError } from "urql";

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
    }
  }
`;

export default function User() {
  const nextRouter = useRouter();
  const [shouldPauseUseQuery, setShouldPauseUseQuery] = useState(true);

  const [{ fetching, data, error }] = useQuery({
    query: USER_QUERY,
    variables: {
      id: nextRouter.query.id,
    },
    pause: shouldPauseUseQuery,
  });

  const errorHandler = (error: CombinedError) => {
    if (error.graphQLErrors.length > 0) {
      if (
        error.graphQLErrors[0].extensions.code === "NOT_FOUND" &&
        // @ts-ignore
        error.graphQLErrors[0].extensions.path.includes("id")
      ) {
        return "User not found.";
      }
    }

    return "Something went wrong.";
  };

  useEffect(() => {
    if (nextRouter.isReady) {
      setShouldPauseUseQuery(false);
    }
  }, [nextRouter.isReady]);

  return (
    <div
      style={{
        fontSize: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span>
        {fetching
          ? "Fetching..."
          : error
          ? errorHandler(error)
          : data
          ? `User id: ${data.user.id}`
          : null}
      </span>
      <button style={{ fontSize: "32px" }} onClick={() => nextRouter.back()}>
        Go to previous page
      </button>
    </div>
  );
}
