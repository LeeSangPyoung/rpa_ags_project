
let navigateFunction: (path: string) => void;

export const setNavigate = (navFn: (path: string) => void) => {
  navigateFunction = navFn;
};

export const navigate = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  } 
};
