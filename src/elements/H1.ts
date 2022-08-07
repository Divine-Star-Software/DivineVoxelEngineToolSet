import type { ElementTreeData } from "../libs/et/index";

export const H1 = (className: string, text: string): ElementTreeData => {
  return [
    {
      type: "h1",
      attrs: {
        className: className,
      },
      text: text,
    },
  ];
};
