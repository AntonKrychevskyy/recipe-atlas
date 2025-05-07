import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { AxiosError } from 'axios';
import { useToaster } from './useToaster';
import { NotificationType } from '../constants';

export const useToastOnError = (
  requestName: string,
  isError: boolean,
  error: AxiosError | Error | null
) => {
  const navigate = useNavigate();
  const { addToast } = useToaster();

  useEffect(() => {
    if (!isError) return;

    const statusCode = (error as AxiosError)?.response?.status;
    const message = error?.message;
    const summarySuffix = statusCode ? ` with ${statusCode} status code` : '';

    if (isError && statusCode === 404) {
      navigate('/not-found');
      return addToast({
        type: NotificationType.error,
        title: `Failed to load ${requestName}`,
        summary: `${requestName} request failed with status 404 - Not Found.`,
        details: `${requestName} request failed with error 404 - Not Found. ${message}`,
      });
    }

    addToast({
      type: NotificationType.error,
      title: `Failed to load ${requestName}`,
      summary: `${requestName} request failed${summarySuffix}.`,
      details: `${requestName} request failed${summarySuffix}. ${message}`,
    });
  }, [isError, error]);
};
