import { Result, ValidationError } from "express-validator";
export class CustomError extends Error {
    statusCode: number;
    data?: ValidationError[];

    constructor(message: string, name: string, statusCode: number, data?: ValidationError[]) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.data = data
    };
};