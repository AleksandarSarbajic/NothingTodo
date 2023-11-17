import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
 
&, &.light-mode{

  @font-face {
    font-family: 'NDOT 47 (inspired by NOTHING)';
    src: local('NDOT 47 (inspired by NOTHING) Regular'), local('NDOT47inspiredbyNOTHING'),
        url('data:font/woff2;charset=utf-8;base64,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') format('woff2'),
        url('data:font/woff;charset=utf-8;base64,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') format('woff'),
        url('src/fonts/NDOT47inspiredbyNOTHING.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}

 
  @font-face {
  font-family: "NotoSans";
  src: local("NotoSans"), url("src/fonts/NotoSansMono_Condensed-Regular.ttf") format('truetype');
  font-weight: 400;
  font-style: normal;
 }
 @font-face {
  font-family: "NotoSansMedium";
  src: local("NotoSansMedium"), url("src/fonts/NotoSansMono_Condensed-Medium.ttf") format('truetype');
  font-weight: 500;
  font-style: normal;
 }
  @font-face {
  font-family: "NotoSans";
  src: local("NotoSans"), url("src/fonts/NotoSansMono_Condensed-SemiBold.ttf") format('truetype');
  font-weight: 600;
  font-style: normal;
 }

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
 
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #C3322Fff;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --bg-color: #111721;
  --color-opacity-100: rgba(255, 255, 255, 0.1);
  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 1rem 2.4rem rgba(0, 0, 0, 0.12);
  --shadow-img: 0 1rem 1.5rem 5px  rgba(0,0,0,0.15);

  --shadow-item: 0 0.2rem 1rem 2px rgba(0,0,0,0.1);
  --color-black-100: #1E2022ff;

  --image-grayscale: 0;
  --image-opacity: 100%;
}

&.dark-mode{
--color-grey-0: #111721;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;

--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-black-100: #1E2022ff;
--color-red-100: #C3322Fff;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--color-opacity-100: rgba(255, 255, 255, 0.3);

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 1rem 2.4rem rgba(0, 0, 0, 0.4);

--shadow-img: 0 1rem 1.5rem 5px rgba(0,0,0,0.4);

--shadow-item: 0 1rem 2rem rgba(0,0,0,0.1);

--image-grayscale: 10%;
--image-opacity: 90%;
}



 /* Indigo */
 --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-200: #bfdbfe;
  --color-brand-300: #93c5fd;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;
  --color-brand-800: #1e40af;
  --color-brand-900: #1e3a8a;

  --color-pink-400: #e879f9;
  --color-pink-700: #7e22ce;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-orange-400: #fb923c;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
 
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
  overflow-x: hidden;
  
  @media only screen and (max-width:75em){ 
    font-size: 56.25%;
  }
  @media only screen and (max-width:62.5em){ 
    font-size: 50%;
  }

}

body {
  font-family: 'NotoSans', sans-serif;
  color: var(--color-grey-200);
  transition: color 0.3s, background-color 0.4s;
  transition-delay: 0.25s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  font-weight: 400;
  scroll-behavior: smooth;
  overflow-x: hidden;
  background-color: #151515ff;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

a,button,img{
  display: inline-block;
}


*:disabled {
  cursor: not-allowed;
}

li{

  list-style: none;
} 

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}


button:has(svg) {
  line-height: 0;
}

/* li:has(svg) {
  line-height: 0;
} */



a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p {

  font-weight: 500;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/


`;

export default GlobalStyles;
