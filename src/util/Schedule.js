import axios from "axios";

export async function getUpComing(tempToken) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/upcoming`,
      {
        token: tempToken,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data.data);
      return res.data;
    })
    .catch((e) => console.log("upcoming err", e));
  return res;
}

export async function getMonth(tempToken) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/monthly`,
      {
        token: tempToken,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data.data);
      return res.data;
    })
    .catch((e) => console.log("getMonth Err", e));
  return res;
}

export async function getDaily(tempToken) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/daily`,
      {
        token: tempToken,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((e) => console.log("getDaily Err", e));
  return res;
}
