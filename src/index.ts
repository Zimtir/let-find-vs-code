import { Extension } from "./extension";

const extension = new Extension();

/**
 * Returns the activate function for extension.
 *
 * @param context - look at {@link vscode.ExtensionContext}
 * @returns The activate function
 *
 */
export const activate = extension.activate;

/**
 * Returns the deactivate function for extension.
 *
 * @returns The deactivate function
 *
 */
export const defactivate = extension.deactivate;
