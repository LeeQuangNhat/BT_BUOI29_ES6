export default class ListUser {
    listUser = [];
    addUserToList = function (User) {
        this.listUser.push(User);
    };
    deleteUser = function (index) {
        this.listUser.splice(index, 1);
    };
    updateUser = function (User, index) {
        this.listUser[index] = User;
    };
}