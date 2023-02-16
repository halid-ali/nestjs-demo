export class BcryptPassword {
    private static bcrypt = require('bcrypt');
    private static saltRounds = 10;
    private static salt = this.bcrypt.genSaltSync(this.saltRounds);

    public static encryptPassword(password: string) {
        return this.bcrypt.hashSync(password, this.salt);
    }

    public static checkPassword(userPassword: string, givenPassword: string) {
        const hash = this.bcrypt.hashSync(givenPassword, this.salt);
        return this.bcrypt.compareSync(userPassword, hash);
    }
}
