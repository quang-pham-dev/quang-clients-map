"use client";

import { PropsWithChildren } from "react";
import { ErrorBoundary as ErrorBoundaryWrapper } from "react-error-boundary";

import { ErrorFallback } from "./error-fallback";

const myErrorHandler = (error: Error) => {
  // TODO catch error to sentry
  return error;
};

export const ErrorBoundary = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <ErrorBoundaryWrapper
      FallbackComponent={ErrorFallback}
      onError={myErrorHandler}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};
