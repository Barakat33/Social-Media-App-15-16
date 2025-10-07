export class AppError extends Error {
    constructor(message: string,
     public statusCode: number,
     public errorDetails?:Record<string,any>[]
    ){
        super(message);
    }
}
export class ConflictException extends AppError {
    constructor(message: string,erroeDetails?:Record<string,any>[]) {
        super(message, 409,erroeDetails );
    }
}

export class NotFoundException extends AppError {
    constructor(message: string,erroeDetails?:Record<string,any>[]) {
        super(message, 404,erroeDetails);
    }
}

export class NotAuthorizedException extends AppError {
    constructor(message: string,erroeDetails?:Record<string,any>[]) {
        super(message, 401,erroeDetails);
    }
}

export class BadRequestException extends AppError {
    constructor(message: string,erroeDetails?:Record<string,any>[]) {
        super(message, 400,erroeDetails);
    }
}

export class ForbiddenException extends AppError {
    constructor(message: string,erroeDetails?:Record<string,any>[]) {
        super(message, 403,erroeDetails);
    }
}

