"use client";
//import { useMovie } from "../app/hooks/useMovie";
import InfoBanner from "./components/InfoBanner";
import AboutGEMNews from "./components/ui/AboutGEMNews";
import ArticleTile from "./components/ui/ArticleTile";
import SupportProject from "./components/ui/SupportProject";

export default function Home() {
  /* const { data, isPending, isFetching } = useMovie(); */

  /*  if (isPending) return <div>Is Loading!</div>; */

  return (
    <div>
      <InfoBanner />
      <ArticleTile />
      <AboutGEMNews />
      <SupportProject />
    </div>
  );
}
