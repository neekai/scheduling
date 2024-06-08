export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, name: string, statusCode: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    };
};