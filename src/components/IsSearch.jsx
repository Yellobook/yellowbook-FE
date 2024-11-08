import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { defaultDate, defaultYear } from "../atom";
import useDebounce from "../util/hooks/useDebounce";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const IsSearch = ({ searchResult, isLoading }) => {
  return (
    <div className="shadow-md py-2 px-2 absolute w-full z-50 bg-white">
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-2">
          <ClipLoader />
        </div>
      ) : (
        <>
          {searchResult.length > 0 ? (
            searchResult.map((res) => (
              <div className="flex items-center justify-between hover:bg-yellow transition-colors cursor-pointer">
                <div>{res.title}</div>
                <div>{res.date}</div>
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
};

export default IsSearch;
