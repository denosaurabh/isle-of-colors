import { useSnapshot } from "valtio";
import { characterState, setActiveColor } from "../state/character";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export const ColorPicker = () => {
  const { activeColor, colorInventory } = useSnapshot(characterState);

  return (
    <div className="w-fit h-fit p-2 rounded-lg bg-slate-800 bg-opacity-25 backdrop-blur-md">
      <ToggleGroup.Root
        className="flex gap-2 bg-mauve6 rounded space-x-px"
        type="single"
        // defaultValue="center"
        value={activeColor}
        onValueChange={setActiveColor}
        aria-label="Text alignment"
      >
        {Object.entries(colorInventory).map(([color, amount], i) => {
          return (
            <ToggleGroup.Item
              key={i}
              className={toggleGroupItemClasses}
              value={color}
              style={{ backgroundColor: color }}
            >
              {amount}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
};

const toggleGroupItemClasses =
  "hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[40px] w-[40px] items-center justify-center bg-white text-base leading-4 rounded-md focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";
