const BASE_URL = import.meta.env.BASE_URL ?? undefined;

const resolvePath = (path: string) => {
  const relativeUrl = BASE_URL ? `${BASE_URL}${path}` : path;
  return {
    path,
    relativeUrl,
  };
};

export const routesConfiguration = {
  baseUrl: BASE_URL,

  index: resolvePath(""),
  classic: resolvePath("classic"),
  multiRootViaHook: resolvePath("multi-root-via-hook"),
  multiRootViaManualInitialization: resolvePath(
    "multi-root-via-manual-initialization"
  ),
};

console.log(routesConfiguration);
