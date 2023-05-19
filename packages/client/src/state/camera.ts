import { proxy } from "valtio";

export const cameraState = proxy({ disableControls: false });

export const updateDisableCameraControls = (bol: boolean) => {
  cameraState.disableControls = bol;
};
