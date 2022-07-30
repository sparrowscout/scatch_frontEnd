import { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import {
  useDeleteAlert,
  useDeleteAlertAll,
  useGetMessageAlert,
  useGetUnreadAlert,
  usePostReadAlert,
} from "../hook/useNotification";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { ReactComponent as Remove } from "../styles/icon/detail/remove.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import { alertListAtom, newAlertListAtom } from "../atom/atom";
import {ReactComponent as Bell } from "../styles/icon/header/bell.svg";
import {ReactComponent as NewBell} from "../styles/icon/header/newBell.svg";

const Sse = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const token = localStorage.getItem("token")
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const setAlert = useSetRecoilState(alertListAtom);
  const [newAlert, setNewAlert] = useRecoilState(newAlertListAtom);
  const [unread,setUnread] = useState(); // 보류
  const queryClient = useQueryClient();
  const { data: alertList } = useGetMessageAlert();
  const { data: alertUnreadList} = useGetUnreadAlert();
  const { mutateAsync: removeAlert } = useDeleteAlert();
  const { mutateAsync: removeAllAlert } = useDeleteAlertAll();
  const { mutateAsync: readAlert } = usePostReadAlert();

  const allList = alertList?.data;
  const unreadList = alertUnreadList?.data.count;
  //console.log(unread)

  useEffect(() => {

    if (token) {
      const sse = new EventSource("https://dogfaw.dasole.shop/subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sse.addEventListener("message", (e) => {
        if (e.type === "message" && e.data.startsWith("{")) {
          setAlert((prev) => [JSON.parse(e.data)]);
          queryClient.invalidateQueries("alertList");
        }
      });

      sse.addEventListener("error", (e) => {
        if (e) {
          sse.close();
        }
      });
    }
  }, [token]);

  useEffect(() => {
  
    if (token) {
      setNewAlert(allList);
      setUnread(unreadList);
    }
  }, [allList,unreadList,setUnread]);

  const messageDelete = async (id) => {
    await removeAlert(id);
    queryClient.invalidateQueries("alertList");
  };

  const messageAllDelete = async () => {
    await removeAllAlert();
    queryClient.invalidateQueries("alertList");
  };

  const messageRead = async (id, url, status) => {
    window.location.href = url;
    //console.log(id, url, status);
    await readAlert(id);
    queryClient.invalidateQueries("alertList");
  };

  const openAlert = () => {
    console.log(alertOpen)
    setAlertOpen((prev) => !prev);
  };




  return (
    <>
    <div>
    {/* <Wrap>
    { unread === 0 ? <BellIcon onClick={openAlert}/> : <NewBell onClick={openAlert}/>}
    { alertOpen && <AlertContent>
      <h4>나의 알림</h4> */}
      {newAlert?.length === 0 ? (
        <p>아직 알림이 없어요!</p>
      ) : (
        <>
          <AllDelete onClick={messageAllDelete}>
            <RemoveIcon />
            <span>전체삭제</span>
          </AllDelete>

          {newAlert?.map((list) => {
            return (
              <ul key={list.id}>
                <ListWrap>
                  <List
                    status={list.status}
                    onClick={() => {
                      messageRead(list.id, list.url, list.status);
                    }}
                  >
                    {list.notificationContent}
                  </List>
                  <span
                    onClick={() => {
                      messageDelete(list.id);
                    }}
                  >
                    <RemoveIcon />
                   
                  </span>
                </ListWrap>
              </ul>
            );
          })}
        </>
      )}
    {/* </AlertContent>}
   
    
    </Wrap> */}
    </div>
    </>
  );
};

// const Wrap = styled.div`
// position:relative;
// cursor: pointer;
// `;


// const AlertContent =  styled.div`

// border-radius:8px;
// width:250px;
// height:300px;
// padding:16px;
// position:absolute;
// top:40px;
// right:-30px;
// border: ${(props) => props.theme.border};
//   background-color: ${(props) => props.theme.inputBoxBackground};
//   box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);

// h4 {
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: flex-start;
//   }

// `;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  
  span {
    padding-left: 8px;
    /* cursor: pointer; */
    
  }

  /* padding-top:5px;
overflow-y: auto;

&::-webkit-scrollbar {
  width: 0px;
  height: 9px;
} */

`;

const List = styled.li`
cursor: pointer;
/* padding-top:10px; */
position:relative;
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.status ? "0.5" : "1")};


`;

const AllDelete = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 32px;
  border-radius: 50px;
  border: ${(props) => props.theme.alertBorder};
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  span {
    color: ${(props) => props.theme.removeBtnColor};
    font-size: 0.875rem;
  }
`;

const RemoveIcon = styled(Remove)`
  stroke: ${(props) => props.theme.removeBtnColor};
`;

// const BellIcon = styled(Bell)`
// stroke:black;
// `;

export default Sse;
