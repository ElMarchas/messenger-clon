import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext([]);

export const ContextProvider = ({ children }) => {
  const [gifts, setGifts] = useState(() => {
    [
      {
        id: 1,
        gift: "Mone222222y",
        units: "3",
        picture: "dolares.webp",
        receiver: "El Marchas",
        price: "9999",
      },
      {
        id: 2,
        gift: "Joji Disc",
        units: "1",
        picture: "joji.jpg",
        receiver: "El Marchas",
        price: "500",
      },
      {
        id: 3,
        gift: "carnitas de a peso",
        units: 1,
        picture: "default.png",
        receiver: "El Marchas",
        price: 1,
      },
    ];
  });
  const addGift = (gift) => {
    setGifts([...gifts, gift]);
  };

  const deleteGift = (index) => {
    return setGifts(gifts.filter((gift, _index) => _index !== index));
  };

  const deleteAllGifts = () => {
    return setGifts([]);
  };
  const updateGift = (id, newValues) => {
    setGifts(gifts.map((gift) => (gift.id === id ? newValues : gift)));
  };

  const totalPrice = () => {
    return gifts
      .reduce((accumulator, gift) => accumulator + gift.units * gift.price, 0)
      .toFixed(2);
  };

  /*///////////////////////////////////
   ************** ASSETS **************
   */ ///////////////////////////////*/

  const getDate = (epochDate, nowDate) => {
    let derivatedDate = nowDate - epochDate;
    //ahora, minutos, horas, dias, semanas, años
    /*los primeros 10 digitos son los chidos, los otros 3 son ms
        1 minute 60 seconds
        1 hour	3600 seconds
        1 day	86400 seconds
        1 week	604800 seconds
        1 month (30.44 days) 	2629743 seconds
        1 year (365.24 days) 	 31556926 seconds
      */
    if (derivatedDate < 60000) return Math.floor(derivatedDate / 1000) + "s";
    if (derivatedDate < 3600000)
      return Math.floor(derivatedDate / (1000 * 60)) + "m";
    if (derivatedDate < 86400000)
      return Math.floor(derivatedDate / (1000 * 60 * 60)) + "h";
    if (derivatedDate < 604800000)
      return Math.floor(derivatedDate / (1000 * 60 * 60 * 24)) + "d";
    if (derivatedDate < 31556926000)
      return Math.floor(derivatedDate / (1000 * 60 * 60 * 24 * 7)) + "w";
    return Math.floor(derivatedDate / (1000 * 60 * 60 * 24 * 7 * 52)) + "y";
  };

  const [isOpenSideMenu, setisOpenSideMenu] = useState(() => {
    const savedisOpenSM = localStorage.getItem("isOpenSideMenu");
    return savedisOpenSM ? JSON.parse(savedisOpenSM) : false;
  });

  const [isOpenRightPanel, setisOpenRightPanel] = useState(() => {
    const savedisOpenRP = localStorage.getItem("isOpenRightPanel");
    return savedisOpenRP ? JSON.parse(savedisOpenRP) : false;
  });

  const handleisOpenSideMenu = () => {
    if (windowSize.width < 950 && !isOpenSideMenu) return;
    localStorage.setItem("isOpenSideMenu", !isOpenSideMenu);
    setisOpenSideMenu(!isOpenSideMenu);
  };

  const handleisOpenRightPanel = () => {
    if (windowSize.width < 950 && !isOpenRightPanel) return;
    localStorage.setItem("isOpenRightPanel", !isOpenRightPanel);
    setisOpenRightPanel(!isOpenRightPanel);
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      if (windowSize.width < 950) {
        if (isOpenRightPanel) {
          localStorage.setItem("isOpenRightPanel", false);
          setisOpenRightPanel(false);
        }
        if (isOpenSideMenu) {
          localStorage.setItem("isOpenSideMenu", false);
          setisOpenSideMenu(false);
        }
      }
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  /*///////////////////////////////////
   *********** USER CONTEXT ***********
   */ ///////////////////////////////*/
  const [userData, setuserData] = useState([]);
  const [recommendedUsers, setrecommendedUsers] = useState([]);
  const [friendsList, setfriendsList] = useState([]);
  const [notifications, setnotifications] = useState({
    notifications: [],
    unread: 0,
  });
  const [friendsRequests, setfriendsRequests] = useState([]);

  const [isLoggedIn, setisLoggedIn] = useState(false);

  /*///////////////////////////////////
   *** ESTE WEY ES PELIGROSO CUIDADO ***
   */ ///////////////////////////////*/
  const toggleisLoggedIn = (id) => {
    setisLoggedIn(!isLoggedIn);
  };

  const logOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6660/api/user/logout",
        { withCredentials: true }
      );
      window.location.reload(false);
      console.log(response.data);
      //setisLoggedIn(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const logInSingIn = async (loginForm, isLogin) => {
    let response;
    if (isLogin) {
      try {
        response = await axios.post(
          "http://localhost:6660/api/user/login",
          loginForm,
          { withCredentials: true }
        );
      } catch (error) {
        return ["error", error.response.data.message];
      }
    } else {
      try {
        response = await axios.post(
          "http://localhost:6660/api/user/singup",
          loginForm,
          { withCredentials: true }
        );
      } catch (error) {
        if (error.response.data.message?.split(" ")[0] === "E11000")
          return ["error", "That user already exists"];
        else return ["error", "Something is broken"];
      }
    }
    setuserData(response.data);
    getUsers(response.data.nickName);
    return ["ok", "Ok"];
  };

  const getUsers = async (user) => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:6660/api/user/notifications/" + user,
        { withCredentials: true }
      );
      setnotifications(response.data);
    } catch (error) {
      return console.log(error);
    }
    try {
      response = await axios.get(
        "http://localhost:6660/api/user/recommended/" + user,
        { withCredentials: true }
      );
      setrecommendedUsers(response.data);
    } catch (error) {
      return console.log(error);
    }
    try {
      response = await axios.get(
        "http://localhost:6660/api/user/friends/" + user,
        { withCredentials: true }
      );
      setfriendsList(response.data);
    } catch (error) {
      return console.log(error);
    }
    try {
      response = await axios.get(
        "http://localhost:6660/api/user/requests/" + user,
        { withCredentials: true }
      );
      setfriendsRequests(response.data);
    } catch (error) {
      return console.log(error);
    }
  };

  const getAuth = async () => {
    try {
      const response = await axios.get("http://localhost:6660/api/user/auth", {
        withCredentials: true,
      });
      setisLoggedIn(true);
      setuserData(response.data);
      getUsers(response.data.nickName);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/add",
        { request: user.nickName },
        { withCredentials: true }
      );
      setrecommendedUsers(
        recommendedUsers.filter((_user) => _user.nickName !== user.nickName)
      );
      setnotifications(response.data.data);
      if (response.data.status === "friends")
        setfriendsList((friendsList) => [...friendsList, user]);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const blockUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/block",
        { request: user.nickName },
        { withCredentials: true }
      );
      setfriendsList(
        friendsList.filter((_user) => _user.nickName !== user.nickName)
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const deleteFriend = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/deletefriend",
        { request: user.nickName },
        { withCredentials: true }
      );
      setfriendsList(
        friendsList.filter((_user) => _user.nickName !== user.nickName)
      );
      setrecommendedUsers((friendsList) => [...friendsList, user]);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const changeUserAvatar = async (changeAvatar) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/avatar/",
        { data: changeAvatar },
        { withCredentials: true }
      );
      setuserData({ ...userData, avatar: changeAvatar });
    } catch (error) {
      return console.log(error);
    }
  };

  const handlesetNotifications = async (notifications) => {
    setnotifications(notifications);
  };

  const updateUserNotifications = async (notifi) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/notifications/",
        notifi,
        { withCredentials: true }
      );
      handlesetNotifications(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  };

  const updateUserBio = async (Bio) => {
    try {
      const response = await axios.post(
        "http://localhost:6660/api/user/bio/",
        { data: Bio },
        { withCredentials: true }
      );
      setuserData({ ...userData, bio: Bio });
    } catch (error) {
      return console.log(error);
    }
  };

  /*///////////////////////////////////
   ********* RIGHT PANEL DATA *********
   */ ///////////////////////////////*/

  const [rightPanelData, setrightPanelData] = useState([]);

  const handlesetrightPanelData = (data, type) => {
    if (!isOpenRightPanel) handleisOpenRightPanel();
    if (type === "friend") {
      setrightPanelData({ ...data, type: "friend" });
    }
    if (type === "chat") {
      setrightPanelData({ ...data, type: "chat" });
    }
  };

  return (
    <Context.Provider
      value={{
        userData,
        isLoggedIn,
        toggleisLoggedIn,
        logOut,
        logInSingIn,
        recommendedUsers,
        friendsList,
        notifications,
        friendsRequests,
        addUser,
        blockUser,
        deleteFriend,
        setnotifications,
        setuserData,
        changeUserAvatar,
        handlesetNotifications,
        updateUserNotifications,
        updateUserBio,
        isOpenSideMenu,
        handleisOpenSideMenu,
        isOpenRightPanel,
        handleisOpenRightPanel,

        getDate,

        rightPanelData,
        handlesetrightPanelData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
