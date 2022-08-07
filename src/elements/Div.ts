import type { ElementTreeData } from "../libs/et/index";

export const Div = (
  className: string,
  children: ElementTreeData
): ElementTreeData => {
  return [
    {
      type: "div",
      attrs: {
        className: className,
      },
      children: children,
    },
  ];
};
