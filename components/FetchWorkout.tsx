import useSWR from "swr";

const fetcher = async (args: {
  url: string;
  headers: { "X-Api-Key"?: string };
}) => {
  const { url, headers } = args;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return res.json();
};

interface FetchWorkoutProps {
  finalURL: string;
  headers: {
    "X-Api-Key"?: string;
  };
}

function FetchWorkout({ finalURL, headers }: FetchWorkoutProps) {
  const { data, error, isValidating } = useSWR(
    { url: finalURL, headers },
    fetcher
  );

  if (isValidating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h1>Workout Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default FetchWorkout;
