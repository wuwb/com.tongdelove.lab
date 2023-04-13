import { useListFeaturesQuery } from "@/services/api";

export type AppFeatures = {
  emailVerification: boolean;
};

export const useFeatures = () => {
  const { data } = useListFeaturesQuery(null);
  const features = data?.data;

  return {
    isFeatureEnabled: (featureName: keyof AppFeatures) => {
      return features ? features[featureName] : false;
    },
  };
};
