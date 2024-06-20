import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";

type AuthType = {
  name: string;
  access_token: string;
  refresh_token: string;
  last_bottle_creation: Date;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

type AuthActionType =
  | {
      type: "UPDATE_DATA";
      payload: {
        name: string;
        access_token: string;
        refresh_token: string;
        last_bottle_creation: Date;
      };
    }
  | { type: "UPDATE_LAST_BOTTLE_CREATION"; payload: Date }
  | { type: "DELETE_DATA" };

const AuthDispatchContext = createContext<
  React.Dispatch<AuthActionType> | undefined
>(undefined);

const AuthReducer = (state: AuthType, action: AuthActionType): AuthType => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        ...action.payload,
        last_bottle_creation: state.last_bottle_creation || new Date(0),
      };
    case "DELETE_DATA":
      sessionStorage.clear();
      return {
        name: "",
        access_token: "",
        refresh_token: "",
        last_bottle_creation: new Date(0),
      };
    case "UPDATE_LAST_BOTTLE_CREATION":
      return {
        ...state,
        last_bottle_creation: action.payload,
      };
    default:
      throw new Error(
        `Unhandled action type: ${(action as AuthActionType).type}`
      );
  }
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    name: "",
    access_token: "",
    refresh_token: "",
    last_bottle_creation: new Date(0),
  });

  useEffect(() => {
    if (
      state.access_token.length === 0 &&
      sessionStorage.getItem("name") !== null &&
      sessionStorage.getItem("access_token") !== null &&
      sessionStorage.getItem("refresh_token") !== null &&
      sessionStorage.getItem("name")!.length !== 0 &&
      sessionStorage.getItem("access_token")!.length !== 0 &&
      sessionStorage.getItem("refresh_token")!.length !== 0 &&
      sessionStorage.getItem("last_bottle_creation") !== null
    ) {
      dispatch({
        type: "UPDATE_DATA",
        payload: {
          name: sessionStorage.getItem("name")!,
          access_token: sessionStorage.getItem("access_token")!,
          refresh_token: sessionStorage.getItem("refresh_token")!,
          last_bottle_creation: new Date(
            sessionStorage.getItem("last_bottle_creation")!
          ),
        },
      });
    }
    if (
      state.access_token.length !== 0 &&
      state.name.length !== 0 &&
      state.refresh_token.length !== 0 &&
      state.last_bottle_creation
    ) {
      sessionStorage.setItem("name", state.name);
      sessionStorage.setItem("access_token", state.access_token);
      sessionStorage.setItem("refresh_token", state.refresh_token);
      sessionStorage.setItem(
        "last_bottle_creation",
        state.last_bottle_creation.toISOString() || ""
      );
    }
  }, [
    state.access_token,
    state.last_bottle_creation,
    state.name,
    state.refresh_token,
  ]);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};
