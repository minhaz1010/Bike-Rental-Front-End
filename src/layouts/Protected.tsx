import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";
import { InvalidTokenError, jwtDecode, JwtPayload } from "jwt-decode";
import { logOutAUser } from "@/redux/features/auth/authSlice";

const Protected = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    // * if expired then jaa login e jaa 
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      dispatch(logOutAUser())
      return <Navigate to="/login" replace />;
    }

  } catch (error) {
    if (error instanceof InvalidTokenError) {
      // * if token is malformed jaaa login e jaa
      dispatch(logOutAUser())
      return <Navigate to="/login" replace />;

    } else {
      console.error('An unknown error occurred Protected');
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default Protected;