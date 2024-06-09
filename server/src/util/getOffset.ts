const getOffset = (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    return offset;
};

export default getOffset;