import instance from "./axios";
import Login from "../components/Login";

let debounce = null;

// 로그인 정보를 보내면 토큰을 받음.
export const login = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(() => {
    instance
      .post("/user/login", props)
      .then((res) => {
        console.log(res);
        const accessToken = res.data.data.token.accessToken;
        const refreshToken = res.data.data.token.refreshToken;
        const id = res.data.data.userId;
        if (accessToken !== null) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("retoken", refreshToken);
          localStorage.setItem("id", id);
          window.alert("로그인 성공 :)");
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("로그인 실패 :(");
      });
  }, 500);
};

// 회원가입 정보
export const register = (props, setModalContent = { setModalContent }) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(async () => {
    await instance
      .post("/user/signup", props)
      .then((res) => {
        window.alert("회원 가입 성공 :)");
        window.location.replace(<Login setModalContent={setModalContent} />);
      })
      .catch((err) => {
        window.alert("회원 가입 실패 :(");
      });
  }, 500);
};

// 닉네임 중복 확인
export const nickCheck = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(async () => {
    await instance
      .post("/user/nickname", props)
      .then((res) => {
        window.alert("중복되지 않은 닉네임입니다. :)");
      })
      .catch((err) => {
        window.alert("중복된 닉네임입니다. :(");
      });
  }, 500);
};
