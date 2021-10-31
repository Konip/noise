export = class UserDto {
    email:string;
    id:string;
    isActivated:boolean;
    username:string;
    number:number;
    firstName:string;
    lastName:string;

    constructor(model:any) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username;
        this.number = model.number;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}
