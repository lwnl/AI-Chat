import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePreferredModel = () => {
  const [model, setModel] = useState<string | null>(null);

  const { data: preModel } = useQuery({
    queryKey: ["initialModel"],
    queryFn: async () => {
      const res = await axios.post("/api/get-latest-model");

      const modelName = res.data?.modelName;
      if (!modelName) {
        throw new Error("No modelName returned from /api/get-latest-model");
      }

      return modelName;
    },
    retry: false, // 可选，避免无限重试
  });

  useEffect(() => {
    console.log('preModel:', preModel)
    const storedModel = localStorage.getItem("preferredModel");
    setModel(storedModel || preModel || null);
    if (!storedModel && preModel) {
      localStorage.setItem("preferredModel", preModel);
    }
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