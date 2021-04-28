import Dashboard from "../screens/dashboard";
import LoginScreen from "../screens/authentication/login";
import { connect } from "react-redux";
import React, { Suspense } from "react";
import Navbar from "../components/Navbar/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import lazyWithPreload from "./lazy-with-preload";
import ErrorBoundary from "./error-boundary";
import LoadingContainer from "./loading-container";
import Category from "../screens/category";
import Order from "../screens/order";
import Product from "../screens/product";
import ProductDetails from "../screens/product/product-details";
import CategoryCreate from "../screens/category/create";
import CategoryEdit from "../screens/category/edit";
import Register from "../screens/registration";
import ChangePassword from "../screens/authentication/change-password";
import RegisterStore from "../screens/registration/register-store";
import ProductCreate from "../screens/product/create";
import ProductBrandDetails from "../screens/product/product-brand-details";

export const preload = (route) => {
  const loadableComponent = route.component;
  if (loadableComponent && loadableComponent.preload) {
    loadableComponent.preload();
  }
};

export const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: LoginScreen
  },
  {
    key: "registration",
    path: "/register",
    component: Register
  }
];

export const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/",
    component: Dashboard
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/category/create",
    component: CategoryCreate
  },
  {
    path: "/category/:category_id/edit",
    component: CategoryEdit
  },
  {
    path: "/order",
    component: Order
  },
  {
    path: "/change-password",
    component: ChangePassword
  },
  {
    path: "/register-store",
    component: RegisterStore
  },
  {
    path: "/product/:seller_product_id/product-brand/:product_brand_id/details",
    component: ProductBrandDetails
  },
  {
    path: "/product/:seller_product_id/details",
    component: ProductDetails
  },
  {
    path: "/product/create",
    component: ProductCreate
  },
  {
    path: "/product",
    component: Product
  }
];

const PrivateRoute = ({ component: Component, isAuthenticated, currentUserRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : (
          <>
            <Navbar />
            <div className="ui container">
              <Component {...props} />
            </div>
          </>
        )
      }
    />
  );
};

const Navigation = (props) => {
  let isAuthenticated = props.isAuthenticated;
  const allOtherRoutes = privateRoutes.map((route, index) => {
    return (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={true}
        component={route.component}
        isAuthenticated={isAuthenticated}
      />
    );
  });

  const PublicRoutes = publicRoutes.map(({ route, key, ...rest }) => (
    <Route {...rest} key={key} component={rest.component} exact={true} />
  ));

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingContainer />}>
        <Switch>
          {PublicRoutes}
          {allOtherRoutes}
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    currentUserRole: state.session.authorization && state.session.authorization.role
  };
};

export default connect(mapStateToProps)(Navigation);
