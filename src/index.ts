import { Extension } from "./extension";

const extension = new Extension();

export const activate = extension.activate;
export const defactivate = extension.deactivate;
