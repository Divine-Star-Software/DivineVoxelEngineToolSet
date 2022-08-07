export const H1 = (className, text) => {
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
