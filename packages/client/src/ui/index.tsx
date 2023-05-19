import { CharacterPos } from "./CharacterPos";
import { Footer } from "./footer";
import { Header } from "./header";
import { ObjectsSidebar } from "./objects";

export const UI = () => {
  return (
    <>
      <CharacterPos />

      <Header />
      <ObjectsSidebar />
      <Footer />
    </>
  );
};
