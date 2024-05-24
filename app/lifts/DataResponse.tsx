import { useEffect } from "react";
import useFetchApi from "@/lib/useFetchApi";

interface DataResponseProps {
  finalURL: string;
  headers: { "X-Api-Key"?: string }; // Adjusted type for headers prop
  onLiftsLoaded: Function;
  setIsLoading: Function;
}
const DataResponse = ({
  finalURL,
  headers,
  onLiftsLoaded,
  setIsLoading,
}: DataResponseProps) => {
  //custom hook for making fetch request
  const { data: lifts, loading, error } = useFetchApi(finalURL, headers);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (!loading && !error) {
      // When lifts data is loaded, pass it to the parent component using the callback function
      onLiftsLoaded(lifts);
      setIsLoading(false);
    }
  }, [loading, error, lifts, onLiftsLoaded, setIsLoading]);

  if (error) return <p>Error: {error}</p>;
};

export default DataResponse;
