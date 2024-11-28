import { DependableComponents, Element } from "../elements/Components";

export function isDependableComponent(element: Element): boolean {
    return DependableComponents[element.type as keyof typeof DependableComponents] !== undefined;
}
