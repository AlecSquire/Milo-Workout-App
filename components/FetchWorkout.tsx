import useSWR from "swr";

const fetcher = ({
  url,
  headers,
}: {
  url: string;
  headers: { "X-Api-Key"?: string };
}) =>
  fetch(url, { headers }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json();
  });

function FetchWorkout(finalURL: string, headers: { "X-Api-Key"?: string }) {
  const { data, error, isValidating } = useSWR(
    { url: finalURL, headers },
    fetcher
  );

  return {
    data,
    isLoading: isValidating,
    isError: !!error,
  };
}

export default FetchWorkout;
