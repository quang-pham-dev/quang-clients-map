import * as React from "react";
import { FallbackProps } from "react-error-boundary";

import { Button } from "../ui/button";

export const ErrorFallback = ({
  error,
  resetErrorBoundary
}: Readonly<FallbackProps>) => {
  return (
    <div className="ext-center text-red-500">
      <h2 className="text-2xl font-bold">An error occurred:</h2>
      <p className="text-lg">{error.message}</p>

      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};
