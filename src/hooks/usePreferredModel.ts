import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePreferredModel = () => {
  const [model, setModel] = useState<string | null>(null);

  const { data: preModel } = useQuery({
    queryKey: ["initialModel"],
    queryFn: async () => {
      const res = await axios.post("/api/get-latest-model");
      return res.data.model as string;
    },
  });

  useEffect(() => {
    const storedModel = localStorage.getItem("preferredModel");
    setModel(storedModel || preModel || null);
  }, [preModel]);

  useEffect(() => {
    if (model) {
      localStorage.setItem("preferredModel", model);
    }
  }, [model]);

  const toggleModel = () => {
    setModel((prev) => (prev === "deepseek-v3" ? "gpt-4o" : "deepseek-v3"));
  };

  return { model, setModel, toggleModel };
};