import { props } from "ramda"

export const WriteIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 18L19.9999 19.094C19.4695 19.6741 18.7501 20 18.0001 20C17.2501 20 16.5308 19.6741 16.0004 19.094C15.4692 18.5151 14.75 18.1901 14.0002 18.1901C13.2504 18.1901 12.5311 18.5151 12 19.094M3 20H4.67454C5.16372 20 5.40832 20 5.63849 19.9447C5.84256 19.8957 6.03765 19.8149 6.2166 19.7053C6.41843 19.5816 6.59138 19.4086 6.93729 19.0627L19.5 6.49998C20.3285 5.67156 20.3285 4.32841 19.5 3.49998C18.6716 2.67156 17.3285 2.67156 16.5 3.49998L3.93726 16.0627C3.59136 16.4086 3.4184 16.5816 3.29472 16.7834C3.18506 16.9624 3.10425 17.1574 3.05526 17.3615C3 17.5917 3 17.8363 3 18.3255V20Z"
      stroke={props.color || "white"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const NotificationBellIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9987 19C14.9987 20.6569 13.6556 22 11.9987 22C10.3419 22 8.99874 20.6569 8.99874 19M13.7952 6.23856C14.2307 5.78864 14.4987 5.17562 14.4987 4.5C14.4987 3.11929 13.3795 2 11.9987 2C10.618 2 9.49874 3.11929 9.49874 4.5C9.49874 5.17562 9.76675 5.78864 10.2022 6.23856M17.9987 11.2C17.9987 9.82087 17.3666 8.49823 16.2414 7.52304C15.1162 6.54786 13.59 6 11.9987 6C10.4074 6 8.88132 6.54786 7.7561 7.52304C6.63089 8.49823 5.99874 9.82087 5.99874 11.2C5.99874 13.4818 5.43288 15.1506 4.72681 16.3447C3.92208 17.7056 3.51972 18.3861 3.53561 18.5486C3.55379 18.7346 3.58726 18.7933 3.73808 18.9036C3.86991 19 4.53225 19 5.85693 19H18.1406C19.4652 19 20.1276 19 20.2594 18.9036C20.4102 18.7933 20.4437 18.7346 20.4619 18.5486C20.4778 18.3861 20.0754 17.7056 19.2707 16.3447C18.5646 15.1506 17.9987 13.4818 17.9987 11.2Z"
      stroke="#FCFCFD"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const QuoteMessageIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9986 11.5C20.9986 16.1944 17.1931 20 12.4986 20C11.4219 20 10.3919 19.7998 9.4438 19.4345C9.27047 19.3678 9.1838 19.3344 9.11488 19.3185C9.04709 19.3029 8.99802 19.2963 8.92851 19.2937C8.85783 19.291 8.78029 19.299 8.62521 19.315L3.50419 19.8444C3.01595 19.8948 2.77183 19.9201 2.62782 19.8322C2.5024 19.7557 2.41697 19.6279 2.39423 19.4828C2.36812 19.3161 2.48477 19.1002 2.71808 18.6684L4.35374 15.6408C4.48844 15.3915 4.5558 15.2668 4.5863 15.1469C4.61643 15.0286 4.62371 14.9432 4.61408 14.8214C4.60432 14.6981 4.55022 14.5376 4.44202 14.2166C4.1545 13.3636 3.99865 12.45 3.99865 11.5C3.99865 6.80558 7.80423 3 12.4986 3C17.1931 3 20.9986 6.80558 20.9986 11.5Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const RepostIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 2L14 5M14 5L11 8M14 5H6.8C5.11984 5 4.27976 5 3.63803 5.32698C3.07354 5.6146 2.6146 6.07354 2.32698 6.63803C2 7.27976 2 8.11984 2 9.8V15.5C2 15.9644 2 16.1966 2.02567 16.3916C2.2029 17.7378 3.26222 18.7971 4.60842 18.9743C4.80337 19 5.03558 19 5.5 19M10 19H17.2C18.8802 19 19.7202 19 20.362 18.673C20.9265 18.3854 21.3854 17.9265 21.673 17.362C22 16.7202 22 15.8802 22 14.2V8.5C22 8.03558 22 7.80337 21.9743 7.60842C21.7971 6.26222 20.7378 5.2029 19.3916 5.02567C19.1966 5 18.9644 5 18.5 5M10 19L13 22M10 19L13 16"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const LikeIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
      fill="#F63D68"
      stroke="#F63D68"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const SelectImageIcon = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z"
      stroke="#F9FAFB"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)