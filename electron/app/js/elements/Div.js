export const Div = (className, children) => {
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
