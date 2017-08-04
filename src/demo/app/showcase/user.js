export var UserRoles = ['Admin', 'Operator', 'Guest'];
var User = (function () {
    function User(name, email, password, confirmPassword, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
    }
    return User;
}());
export { User };
//# sourceMappingURL=user.js.map