import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCookies } from "../../util/LoginUtils.js";

export default function MobileTerm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tempToken] = useSearchParams();

  const agreeAll = (e) => {
    const term1 = document.getElementById("term-1");
    const term2 = document.getElementById("term-2");
    if (e.target.checked) {
      term1.checked = true;
      term2.checked = true;
    } else {
      term1.checked = false;
      term2.checked = false;
    }
  };
  const agree = (e) => {
    const agreeAll = document.getElementById("select-all");
    if (!e.target.checked) {
      agreeAll.checked = false;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let err;
    try {
      await getCookies(tempToken.get("token"));
    } catch (e) {
      err = e;
      console.log("제출시 에러!", e);
    } finally {
      if (localStorage.getItem("accessToken") && !err) {
        navigate("/");
      }
    }
  };
  return (
    <div className="px-3 py-7 flex flex-col justify-center">
      <div className="gmarketBold text-[30px] text-center text-orange tracking-widest">
        회원가입 약관 동의
      </div>
      <div className="gmarketLight text-center">
        나를 관리하고 함께 소통하는 옐로우북에 필요한 3개의 약관입니다!
      </div>

      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="flex gap-2 items-center border-b-2 border-neutral-300 py-3">
          <input
            id="select-all"
            type="checkbox"
            className="checkbox"
            onChange={agreeAll}
          />
          <label
            htmlFor="select-all"
            className="select-none group-checked:bg-orange"
          >
            모두 동의하기
          </label>
        </div>

        <div className="py-8 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <input
              id="term-1"
              type="checkbox"
              className="checkbox"
              onChange={agree}
              required
            />
            <label
              htmlFor="term-1"
              className="select-none group-checked:bg-orange"
            >
              서비스 이용 약관(필수)
            </label>
          </div>

          <div className="border-2 h-52 rounded-2xl px-5 py-2 border-orange">
            약관1
          </div>

          <div className="flex gap-2 items-center">
            <input
              id="term-2"
              type="checkbox"
              className="checkbox"
              onChange={agree}
              required
            />
            <label
              htmlFor="term-2"
              className="select-none group-checked:bg-orange"
            >
              개인정보 수집 및 이용 약관(필수)
            </label>
          </div>

          <div className="border-2 h-52 rounded-2xl px-5 py-2 border-orange">
            약관2
          </div>
        </div>

        <input
          className={`self-center ${
            isLoading ? "bg-gray" : "bg-yellow"
          } px-5 py-2 rounded-xl hover:bg-opacity-65 transition cursor-pointer`}
          type="submit"
          value={`${isLoading ? "로딩중 입니다..." : "옐로우북 시작하기"}`}
        />
      </form>
    </div>
  );
}
