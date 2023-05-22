import { useSnapshot } from "valtio";
import { characterState, setActiveActionMode } from "../state/character";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export const ActionsPicker = () => {
  const { activeActionMode } = useSnapshot(characterState);

  const onValueChange = (val: string) => {
    switch (val) {
      case "paint": {
        setActiveActionMode("paint");
        break;
      }
      case "scoop": {
        setActiveActionMode("scoop");
        break;
      }
    }
  };

  return (
    <div className="w-fit h-fit p-2 rounded-lg bg-slate-800 bg-opacity-25 backdrop-blur-md">
      <ToggleGroup.Root
        className="inline-flex bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA7 space-x-px"
        type="single"
        defaultValue="paint"
        value={activeActionMode}
        onValueChange={onValueChange}
        aria-label="Action Mode"
      >
        <ToggleGroup.Item
          className={toggleGroupItemClasses}
          value="paint"
          aria-label="Left aligned"
        >
          Paint
        </ToggleGroup.Item>
        <ToggleGroup.Item
          className={toggleGroupItemClasses}
          value="scoop"
          aria-label="Center aligned"
        >
          Scoop
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
};

const toggleGroupItemClasses =
  "hover:bg-slate-200 color-mauve11 data-[state=on]:bg-slate-600 data-[state=on]:text-slate-100 flex h-[35px] w-fit px-3 items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";
