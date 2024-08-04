export default {
  control: {
    fontSize: 14,
    whiteSpace: "nowrap", // 텍스트가 한 줄로 유지되도록 설정
    overflow: "hidden", // 넘치는 텍스트를 숨김
    textOverflow: "ellipsis", // 넘치는 텍스트를 '...'으로 표시
    boxSizing: "border-box",
  },

  '&singleLine': {
    display: "block",
    width: 180,
    highlighter: {
      padding: "1px",
      border: "2px inset transparent",
    },
    input: {
      padding: "1px",
      border: "2px inset",
      whiteSpace: "nowrap", // 텍스트가 한 줄로 유지되도록 설정
      overflow: "hidden", // 넘치는 텍스트를 숨김
      textOverflow: "ellipsis", // 넘치는 텍스트를 '...'으로 표시
      boxSizing: "border-box",
    },
  },
  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid #333",
      fontSize: 14,
      overflow: "auto",
    },
    item: {
      padding: "5px 10px",
      borderBottom: "1px solid #333",
      "&focused": {
        backgroundColor: "#F6A9C6",
      },
    },
  },
};
