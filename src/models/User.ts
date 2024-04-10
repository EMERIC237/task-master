export class User {
    constructor(
        public username: string,
        public email: string,
        public password_digest: string,
        public firstName: string,
        public lastName: string
    ) { }
}



export class UserAccount {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public password_confirmation: string,
        public first_name: string,
        public last_name: string,
        public id?: number
    ) { }
}
