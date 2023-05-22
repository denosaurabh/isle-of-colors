import { Footer } from "./Footer";
import { Header } from "./Header";
import { ObjectsSidebar } from "./DraftObjectsPicker";
import { FooterActions } from "./FooterActions";
import { Loading } from "./Loading";

export const UI = () => {
  return (
    <>
      <Loading />

      <Header />
      <ObjectsSidebar />
      <Footer />
      <FooterActions />
    </>
  );
};
