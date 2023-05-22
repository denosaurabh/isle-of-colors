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
        onValueChange={(val) => {
          if (!val) {
            return;
          }

          setActiveColor(val);
        }}
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
              <div className={amountClassName}>{amount.toFixed(0)}</div>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
};

const toggleGroupItemClasses =
  "relative hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[45px] w-[45px] items-center justify-center bg-white text-base leading-4 rounded-md focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

const amountClassName =
  "absolute top-[-10px] right-[-10px] bg-slate-100 font-light p-1 rounded-md shadow-md";
