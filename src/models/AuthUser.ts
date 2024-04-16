export class AuthUser {
    constructor(
        public email: string,
        public id: number,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token(): string {
        return this._token;
    }

    isValidToken(): boolean {
        return !!this._tokenExpirationDate && new Date() < this._tokenExpirationDate;
    }
}

