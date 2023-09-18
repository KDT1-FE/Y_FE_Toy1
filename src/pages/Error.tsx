import * as React from 'react';
import { useRouteError } from 'react-router-dom';

interface IRouteError {
  statusText: string;
  status: number;
}

export function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>{`${(error as IRouteError).status} ${
      (error as IRouteError).statusText
    }`}</div>
  );
}
