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
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  const router = useRouter();
  useEffect(() => {
    const channel = pusherClient.subscribe("iCenna");

    channel.bind("tc_updates", (data) => {
      initAuth();
    });

    const initAuth = async () => {
      const token = JSON.parse(window.localStorage.getItem(authConfig.storTokenKey));
      const currUser = window.localStorage.getItem(authConfig.storUserKeyName);

      if (token?.[authConfig.storAccessTokenKey]) {
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
            clearLocalStorage();
            setLoading(false);
            if (authConfig.onTokenExpiration === "logout" && !router.pathname.includes("login")) {
              await router.replace("/login");
            }
          });
      } else if (currUser) {
        const u = JSON.parse(currUser);
        console.log("u", u);
        if (u.action === 0) {
          clearLocalStorage();
        } else {
          setUser(u);
        }
        setLoading(false);
      } else {
        clearLocalStorage();
        await router.replace("/login");
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
    window.localStorage.setItem(
      authConfig.storTokenKey,
      JSON.stringify({
        [authConfig.storAccessTokenKey]: data.access_token,
      }),
    );
    window.localStorage.setItem(authConfig.storUserKeyName, JSON.stringify(data.user));
    setUser({ ...data.user });
  };

  const redirectUser = async (u) => {
    if (u?.action === 0) {
      const returnUrl = router.query.returnUrl;
      const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
      await router.replace(redirectURL);
    } else {
      const { provider, auth_token, ...rest } = router.query;
      await router.replace({
        pathname: "/login/confirm",
        query: rest,
      });
    }
  };

  const handleLogin = (params, errorCallback) => {
    setLoading(true);
    axios
      .post(authConfig.signOnEndpoint, params)
      .then(async (response) => {
        storeUser(response.data.data);
        redirectUser(response.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (errorCallback) errorCallback(err);
      });
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

  const handleVerifyOTP = (params, errorCallback) => {
    setLoading(true);
    axios
      .post("/icenna.user_api.auth.verify_otp", params)
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

  const handleLogout = (errorCallback) => {
    setLoading(true);
    axios
      .post("/icenna.user_api.auth.logout")
      .then(async (response) => {})
      .catch((err) => {
        console.log(err);
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        router.push("/login");
        clearLocalStorage();
        googleLogout();
        setLoading(false);
      });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    addMobile: handleAddMobile,
    verifyOTP: handleVerifyOTP,
    acceptTerms: handleAcceptTerms,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
