import { ActionsPicker } from "./ActionsPicker";
import { ColorPicker } from "./ColorPicker";

export const FooterActions = () => {
  return (
    <div className="fixed bottom-2 left-[50vw] translate-x-[-50%] flex flex-col gap-3 items-center">
      <ColorPicker />
      <ActionsPicker />
    </div>
  );
};
