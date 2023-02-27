export class BcryptPassword {
    private static bcrypt = require('bcrypt');
    private static saltRounds = 10;
    private static salt = this.bcrypt.genSalt(this.saltRounds);

    public static async encryptPassword(password: string) {
        return await this.bcrypt.hash(password.toString(), parseInt(this.salt));
    }

    public static async checkPassword(userPassword: string, givenPassword: string) {
        return await this.bcrypt.compare(givenPassword, userPassword);
    }
}
