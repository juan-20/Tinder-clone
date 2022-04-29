
const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUsers = { ...users };
    delete newUsers[userLoggedIn];

    // ele faz o objeto virar um array com ids
    const [id, user] = Object.entries(newUsers).flat();
    return { id, ...user };
}
export default getMatchedUserInfo;
