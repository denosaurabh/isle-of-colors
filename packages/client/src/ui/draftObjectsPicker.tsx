import { OBJECTS_DATA } from "../data/objects";
import { addDraftObject } from "../state/worldObjects";

export const ObjectsSidebar = () => {
  return (
    <div className="fixed top-2 left-2 w-[100px] h-[98vh] p-2 rounded-lg bg-slate-800 bg-opacity-25 backdrop-blur-md">
      <div className="rounded-lg bg-slate-700 flex flex-col gap-2 p-1.5 bg-opacity-70">
        {OBJECTS_DATA.map((o, i) => (
          <button
            key={i}
            className="text-slate-700 bg-slate-300 bg-opacity-70 p-2 rounded-lg cursor-pointer h-[76px] transition-all hover:bg-slate-200 hover:rotate-3 hover:shadow-xl active:shadow-sm active:rotate-1 active:bg-slate-300 active:translate-y-0.5 focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-slate-50"
            draggable
            onDragStart={() => {
              addDraftObject(o.id);
            }}
          >
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
};
