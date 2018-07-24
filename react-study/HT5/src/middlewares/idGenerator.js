export default store => next => action => {
    const randomID = Math.random() * 10;
    next(randomID, action)
}