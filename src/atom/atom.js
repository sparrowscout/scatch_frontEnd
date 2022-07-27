import { atom } from "recoil";
import Login from "../components/Login";

export const UserInfoAtom = atom({
  key: "UserInfo",
  default: {
    stacks:[],
    username:"",
    profileImg:null,
    nickname:""
  }
});

export const modalChange = atom({
  key: "modalChange",
  default: <Login />,
});

export const alertListAtom = atom({
  key: "alertList",
  default: [],
});

export const newAlertListAtom = atom({
  key: "newAlertList",
  default: [],
});
