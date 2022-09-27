import { keyframes } from "@emotion/react";

export const pulse = keyframes`
0% {
  transform: translateX(3%);
}
100% {
  transform:translateX(0%); 
}
`;

export const shake = keyframes`
10%, 90% {
  transform: translate3d(-1px, 0, 0);
}

20%, 80% {
  transform: translate3d(2px, 0, 0);
}

30%, 50%, 70% {
  transform: translate3d(-4px, 0, 0);
}

40%, 60% {
  transform: translate3d(4px, 0, 0);
}
`;

export const blink = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: 0;
}
`;
