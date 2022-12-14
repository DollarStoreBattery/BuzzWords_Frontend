import { keyframes } from "@emotion/react";

export const horizontalRock = keyframes`
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

export const pulseSmaller = keyframes`
0%{
  transform:scale(1);
}
30%{
  transform: scale(0.9);
}
100%{
  transform:scale(1);
}
`;

export const rocking = keyframes`
0%, 60%, 100%{
  transform: rotate(0) scale(1);
}
20%{
  transform:  rotate(-0.015turn) scale(1.05);
}
80%{
  transform:  rotate(0.015turn) scale(1.05);
}
`;

export const fadeIn = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`;

export const fadeInOutSlide = keyframes`
0% {
  opacity: 0;
  transform: scale(1.1);
}
10%, 70% {
  opacity: 1;
}
100% {
  opacity: 0;
  transform: scale(1)

}
`;
