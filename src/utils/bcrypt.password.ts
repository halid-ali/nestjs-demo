export class BcryptPassword {
    private static bcrypt = require('bcrypt');
    private static saltRounds = 10;
    private static salt = this.bcrypt.genSaltSync(this.saltRounds);

    public static encryptPassword(password: string) {
        return this.bcrypt.hashSync(password, this.salt);
    }

    public static checkPassword(userPassword: string, givenPassword: string) {
        return this.bcrypt.compareSync(givenPassword, userPassword);
    }
}
