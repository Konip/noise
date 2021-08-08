module.exports = class UserDto {
    email;
    id;
    isActivated;
    username;
    number;
    firstName;
    lastName;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username;
        this.number = model.number;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}
