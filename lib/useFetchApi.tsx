import { useState, useEffect } from "react";

const useFetchApi = (url: string, headers: {} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchApiData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`Network response was not okay: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [url, headers]);

  return { data, loading, error };
};

export default useFetchApi;
