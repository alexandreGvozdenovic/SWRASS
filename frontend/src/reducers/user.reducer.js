export default function(user = null, action) {
        if(action.type === 'authorizedUser') {
            let userUpdated = {name: action.user};
            return userUpdated;
        }
        else {
            return user;
        }
    }