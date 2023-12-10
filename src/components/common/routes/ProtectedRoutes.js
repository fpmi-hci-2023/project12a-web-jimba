import React from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes'; // Route list
import { CircleLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
        display: block;
        margin: 8rem auto;
        border-color: red;
`;

const ProtectedRoutes = () => (
    <Switch>
      <Suspense
        fallback={
            <div className='sweet-loading'>
            <CircleLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={'#61dafb'}
              loading={true}
            />
          </div>
        }
      >
        {routes.map(({ component: Component, path, exact }) => (
          <Route
            path={`/${path}`}
            key={path}
            exact={exact}
          >
            <Component />
          </Route>
        ))}
      </Suspense>
    </Switch>
  );

export default ProtectedRoutes;
