export class User {
    constructor(
        public username: string,
        public email: string,
        public password_digest: string,
        public firstName: string,
        public lastName: string
    ) { }
}