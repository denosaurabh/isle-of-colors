import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import {
  DraftWorldObject,
  updateDraftObjectPosition,
  updateDraftObjectRotation,
  userObjectsState,
} from "../state/worldObjects";
import { updateDisableCameraControls } from "../state/camera";
import { Model } from "./Model";

const getControlId = (objectId: string) => "control-" + objectId;
const getDraftObjectId = (objectId: string) => "draft-" + objectId;

export const DraftObjects = () => {
  const { draftObjects } = useSnapshot(userObjectsState);

  const { scene, camera, gl } = useThree();

  useEffect(() => {
    if (draftObjects.length) {
      draftObjects.map((d) => {
        // if control already exsist then return
        const controlObject = scene.getObjectByName(getControlId(d.id));
        if (controlObject) {
          if (d.status === "discard" || d.status === "saved") {
            // remove control
            controlObject?.detach();
            controlObject?.dispose();

            scene.remove(controlObject);

            // remove draft object
            // const draftObject = scene.getObjectByName(getDraftObjectId(d.id));
            // if (draftObject) {
            //   // draftObject?.dispose();
            //   // scene.remove(draftObject);
            // }
          }

          return;
        }

        const object = scene.getObjectByName(getDraftObjectId(d.id));

        if (!object) return;

        const control = new TransformControls(camera, gl.domElement);
        control.name = getControlId(d.id);
        control.attach(object);

        control.addEventListener("mouseDown", () => {
          updateDisableCameraControls(true);
        });
        control.addEventListener("mouseUp", (e) => {
          updateDisableCameraControls(false);

          updateDraftObjectPosition(d.id, {
            x: Number(object?.position.x),
            z: Number(object?.position.z),
          });

          console.log("r", object.rotation.y.toFixed(4));
          updateDraftObjectRotation(d.id, object.rotation.y.toFixed(4));
        });

        control.showY = false;
        scene.add(control);
      });
    }
  }, [draftObjects, draftObjects.map((d) => d.status), scene]);

  const onModelClick = useCallback(
    (dobj: DraftWorldObject) => {
      const controlObject = scene.getObjectByName(getControlId(dobj.id));

      if (controlObject) {
        if (dobj.status !== "editing") return;

        // console.log("mode", controlObject.mode);

        switch (controlObject.mode) {
          case "translate": {
            controlObject.setMode("rotate");

            controlObject.showY = true;
            controlObject.showX = false;
            controlObject.showZ = false;

            break;
          }
          case "rotate": {
            controlObject.setMode("translate");

            controlObject.showY = false;
            controlObject.showX = true;
            controlObject.showZ = true;

            break;
          }
        }
      }
    },
    [scene]
  );

  return (
    <>
      {draftObjects.map((dobj, i) => {
        if (dobj.status === "discard" || dobj.status === "saved") {
          return null;
        }

        return (
          <>
            <Model
              key={i}
              url={dobj.objectData.url}
              color="#fff"
              name={getDraftObjectId(dobj.id)}
              onClick={(e) => {
                e.stopPropagation();

                onModelClick(dobj);
              }}
            />
          </>
        );
      })}
    </>
  );
};
