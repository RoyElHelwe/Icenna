import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import axios from "../api/axios-instance";
import authConfig from "../configs/auth";
import { pusherClient } from "../lib/pusher";

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  storeUser: () => { },
  redirectUser: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  const router = useRouter();

  const getToken = () => {
    try {
      return JSON.parse(window.localStorage.getItem(authConfig.storTokenKey));
    } catch (e) {
      return undefined;
    }
  };

  const getUser = () => {
    try {
      return JSON.parse(window.localStorage.getItem(authConfig.storUserKeyName));
    } catch (e) {
      return undefined;
    }
  };

  useEffect(() => {
    const channel = pusherClient.subscribe("iCenna");

    channel.bind("tc_updates", (data) => {
      initAuth();
    });

    const initAuth = async () => {
      const token = getToken();
      const currUser = getUser();

      if (token) {
        setLoading(true);
        await axios
          .get(authConfig.meEndpoint)
          .then(async (response) => {
            setUser({ ...response.data.data });
            window.localStorage.setItem(
              authConfig.storUserKeyName,
              JSON.stringify(response.data.data),
            );
            setLoading(false);
          })
          .catch(async (e) => {
            setLoading(false);
            if (e?.response?.data?.message === "Not Authorized") {
              // Only remove token when it expires
              clearLocalStorage();
              if (authConfig.onTokenExpiration === "logout" && !router.pathname.includes("login")) {
                await router.replace("/login");
              }
            }
          });
      } else if (currUser) {
        // NTOE: In case the user removed the token you must logout to get new token
        setUser(currUser);
        setLoading(false);
      } else {
        clearLocalStorage();
        setLoading(false);
      }
    };
    initAuth();

    return () => {
      pusherClient.unsubscribe("iCenna");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem(authConfig.storUserKeyName);
    localStorage.removeItem(authConfig.storTokenKey);
    setUser(null);
  };

  const storeUser = (data) => {
    window.localStorage.setItem(authConfig.storTokenKey, JSON.stringify(data?.access_token));
    window.localStorage.setItem(authConfig.storUserKeyName, JSON.stringify(data?.user));
    setUser({ ...data?.user });
  };

  const redirectUser = async (u) => {
    if (u?.action === 0) {
      const returnUrl = router.query.returnUrl;
      const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/home";
      await router.replace(redirectURL);
    } else {
      const { provider, auth_token, ...rest } = router.query;
      await router.replace({
        pathname: "/login/confirm",
        query: rest,
      });
    }
  };

  const handleAddMobile = (params, errorCallback) => {
    setLoading(true);
    axios
      .post("/icenna.user_api.auth.add_mobile", params)
      .then(async (response) => {
        storeUser(response.data.data);
        await redirectUser(response.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (errorCallback) errorCallback(err);
      });
  };

  const handleAcceptTerms = (params, errorCallback) => {
    setLoading(true);
    axios
      .post("/icenna.user_api.auth.accept_terms", params)
      .then(async (response) => {
        storeUser(response.data.data);
        await redirectUser(response.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = async (errorCallback) => {
    const token = getToken();

    if (token) {
      axios
        .post("/icenna.user_api.auth.logout")
        .then(async (res) => { })
        .catch((err) => {
          console.log(err);
          if (errorCallback)
            errorCallback(err);
        })
    }
    await router.push("/login");
    clearLocalStorage();
    googleLogout();
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    addMobile: handleAddMobile,
    acceptTerms: handleAcceptTerms,
    logout: handleLogout,
    storeUser,
    redirectUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

