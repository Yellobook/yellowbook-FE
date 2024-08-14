import axios from "axios";

export async function getUpComing(act) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/upcoming`,
      {
        headers: { Authorization: `Bearer ${act}` },
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

export async function getMonth(act) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/monthly`,
      {
        headers: { Authorization: `Bearer ${act}` },
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

export async function getDaily(act) {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/daily`,
      {
        headers: { Authorization: `Bearer ${act}` },
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
