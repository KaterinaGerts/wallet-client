import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import { HomeTab } from './pages/HomeTab/HomeTab';
import { CurrencyPage } from './pages/CurrencyPage/CurrencyPage';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import Header from 'components/Header';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App() {
  //проверка на текущего пользователя (не удалять)
  // const isFetchingCurrentUser = useSelector(authSelectors.getisFetchingCurrent);
  const isFetchingCurrentUser = true; //заглушка для рендера приватных роутов

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <>
          <Routes>
            <Route path="/" exact element={<Navigate to="/home" />} />
            <Route
              path="/login"
              element={
                // <PublicRoute restricted>
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                // <PublicRoute restricted>
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/login">
                  <Header />
                  <HomeTab />
                </PrivateRoute>
              }
            />
            <Route
              path="/diagram"
              element={
                <PrivateRoute redirectTo="/login">
                  <Header />
                  {/* //страница с диаграммой DashboardPage*/}
                </PrivateRoute>
              }
            />
            <Route
              path="/currency"
              element={
                <PrivateRoute redirectTo="/login">
                  <Header />
                  <CurrencyPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      ) : (
        <Header />
      )}
    </>
  );
}

export default App;
