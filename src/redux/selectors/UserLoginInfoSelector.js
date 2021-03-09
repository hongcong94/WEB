import { createSelector } from "@reduxjs/toolkit";

const userLoginInfoSelector = (state) => state.UserLoginInfo;

const selectUserInfoSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo);

const selectTokenSelector = createSelector(
    userLoginInfoSelector,
    state => state.token);

const selectFullNameSelector = createSelector(
    selectUserInfoSelector,
    state => state.firstName + " " + state.lastName);

const selectRememberMeSelector = createSelector(
        userLoginInfoSelector,
        state => state.isRememberMe);

        // function
export const selectRememberMe = (state) => {
    return selectRememberMeSelector(state);
}

export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
}

export const selectToken = (state) => {
    return selectTokenSelector(state);
}

export const selectFullName = (state) => {
    return selectFullNameSelector(state);
}
    
