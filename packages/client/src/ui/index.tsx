import { Footer } from "./Footer";
import { Header } from "./Header";
import { ObjectsSidebar } from "./DraftObjectsPicker";
import { FooterActions } from "./FooterActions";

export const UI = () => {
  return (
    <>
      <Header />
      <ObjectsSidebar />
      <Footer />
      <FooterActions />
    </>
  );
};
