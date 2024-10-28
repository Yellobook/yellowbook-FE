import { atom } from "recoil";

export const isMobile = atom({
  key: "isUserMobile",
  default: true,
});

export const profile = atom({
  key: "userInfo",
  default: {},
});

export const initEvents = atom({
  key: "events",
  default: [
    {
      day: 1,
      titles: ["제품 10개 수정"],
    },
  ],
});

export const upcomingSchedule = atom({
  key: "upcoming schedule",
  default: {},
});

export const teamBuild = atom({
  key: "teamBuild",
  default: {
    name: "test by yc",
    phoneNumber: "012345678",
    address: "idk",
    role: "ADMIN",
  },
});

export const teamIdState = atom({
  key: "teamIdState",
  default: null,
});

export const defaultDate = atom({
  key: "defaultDate",
  default: new Date().getMonth(),
});

export const defaultYear = atom({
  key: "defaultYear",
  default: new Date().getFullYear(),
});
