import { addBreadcrumb } from '@sentry/react-native';

const addInfoBreadcrumb = message =>
  addBreadcrumb({
    level: 'info',
    message,
  });

const addNavBreadcrumb = (prevRoute, nextRoute, data) =>
  addBreadcrumb({
    data,
    level: 'info',
    message: `From ${prevRoute} to ${nextRoute}`,
  });

export default {
  addInfoBreadcrumb,
  addNavBreadcrumb,
};
