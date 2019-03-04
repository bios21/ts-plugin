const paris_ts = (input: TemplateStringsArray): string => {
    return input.join('');
};

const another: any = null;

// Filter global properties (or for every objects)

const S1 = paris_ts``;

const S2 = another``;
