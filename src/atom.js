import { atom } from "recoil";

export const isMobile = atom({
  key: "isUserMobile",
  default: true,
});

export const initEvents = atom({
  key: "isMobile",
  default: [
    {
      date: new Date(2024, 6, 7),
      line: "제품 10개 수정",
      color: "green",
    },
    {
      date: new Date(2024, 6, 14),
      line: "제품 10개 수정",
      color: "orange",
    },
    {
      date: new Date(2024, 6, 14),
      line: "wow",
      color: "yellow",
    },
    {
      date: new Date(2024, 6, 20),
      line: "제품 10개 수정",
      color: "gray",
    },
  ],
});

export const teamBuild = atom({
  key: "teamBuild",
  default: {
    teamName: "",
    mode: "",
    companyInfo: {
      companyName: "",
      companyNumber: "",
      companyAddress: "",
    },
    user: {
      userName: "username",
      userEmail: "",
    },
  },
});
