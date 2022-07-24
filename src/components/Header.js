import { useRecoilValue } from "recoil";
import { DarkThemeAtom } from "../atom/theme";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserInfoAtom } from "../atom/atom";
import ModalOpen from "./Modal_prev";

import logolight from "../styles/logo/logoLight.svg";
import logodark from "../styles/logo/logoDark.svg";
import person from "../styles/icon/global/profile.svg";
import arrowdown from "../styles/icon/global/arrowDown.svg";
import write from "../styles/icon/detail/edit.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isDark = useRecoilValue(DarkThemeAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const detailsRef = useRef(null);
  const isLogin = localStorage.getItem("token");

  const details = detailsRef.current;

    if (details) {
      details.open = false;
    }
    const viewModal = () => {
      setIsModalOpen((prev) => !prev)
    }


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("retoken");
    localStorage.removeItem("id");
    window.location.replace("/");
    // const data = {
    //   userId: localStorage.getItem("id"),
    // };
    // try {
    //   await axios
    //     .post("http://13.125.213.81/user/signup/addInfo", data)
    //     .then((res) => console.log(res, "로그아웃"));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
  
  {isModalOpen ? <ModalOpen viewModal={viewModal}/> : null}

    <Wrap>
      <ContentWrap>
        <div onClick={() => {navigate("/")}}>
        {isDark? <Img src={logodark} alt="" /> :<Img src={logolight} alt="" />}
        </div>
        <User>
     
          {!isLogin ? (
            <Contain>
              
              <span onClick={viewModal}>로그인 </span> 
             
           
            </Contain>
            
          ) : (
            <>
            <StyledLink to="/write"><img src={write} alt="" />게시글 작성 </StyledLink>
              {/* <StyledLink to="/write">게시글 작성</StyledLink> */}
              <Details ref={detailsRef}>
                <Summary>
                  <Profile src={userInfo?.profileImg || person} alt="" />
                  <img src={arrowdown} alt="" style={{ width: "15px" }} />
                </Summary>
                <Select>
                  <Option2>
                  <p onClick={()=>navigate("/write")}>게시글 작성</p>
                  </Option2>
                  <Option>
                      <p onClick={()=>navigate("/mypage")}>마이페이지</p>
                  </Option>
                  <Option>
                    <p onClick={logout}>로그아웃</p>
                  </Option>
                </Select>
              </Details>
            </>
          )}
        </User>
        
      </ContentWrap>
      
    </Wrap>
    
    </>
  );
};

const Wrap = styled.div`
  background-color: ${(props) => props.theme.BackGroundColor};
  width: 100%;
  height: 90px;
  margin-bottom:10px;
  display: flex;
  align-items: center;
  p {
    font-size: 16px;
  }

`;

const Img = styled.img`
  width: 167px;
  height: 46px;
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media  (max-width: 1200px) {
    margin: 0px 40px;
  }
`;

const Contain = styled.div`
  position: relative;
  display: flex;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:180px;

  @media screen and (max-width:500px){
    justify-content:flex-end;
    width:100px;
  }
`;

const Profile = styled.img`
width:30px;
height:30px;
border-radius:50%;
margin-right:10px;
`;

const Details = styled.details`
  position: relative;
`;

const Summary = styled.summary`
  cursor: pointer;
  list-style: none;
  img {
    width: 48px;
    height: 48px;
  }
`;

const Select = styled.ul`
  width: 100px;
  height: 80px;
  z-index: 10;
  border-radius: 8px;
  position: absolute;
  right: 0;

  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.inputBoxBackground};
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);
  @media screen and (max-width: 500px){
    height:120px;
  }


  button {
    border: none;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    padding: 3px 0;
  }
`;

const StyledLink = styled(Link)`
img {
padding-right:5px;
}
  text-decoration: none;
  color: #777777;
  font-weight:500;

  @media screen and (max-width:500px){
    display:none;
  }
`;

const Option = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 13px;
  padding-bottom: 10px;
`;

const Option2 = styled(Option)`
@media screen and (min-width:501px) {
  display:none;
}
`;

export default Header;
