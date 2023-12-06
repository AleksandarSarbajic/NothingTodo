import { createGlobalStyle } from "styled-components";
import { fontFace, nothingFontFace } from "./NotoSansMonoRegular";
import { PickerStyles } from "./DatepickerStyle";
const GlobalStyles = createGlobalStyle`
:root {
 
&, &.light-mode{

  ${fontFace}

  ${nothingFontFace}
 




  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f0f1f3;
  --color-grey-200: #e6e6e6;
  --color-grey-300: #c1c2c3;
  --color-grey-400: #a8adb3;
  --color-grey-500: #c1c7ce;
  --color-grey-550: #8f9193;
  --color-grey-600: #434647;
  --color-grey-650: #585a5c;
  --color-grey-700: #454749;
  --color-grey-750: #2e3133;
 

  --color-blue-50:  #6a7c8a;
  --color-blue-200:#d2e5f4;
  --color-blue-500: #c6e7ff;

  --color-black-50: #232426;
  --color-black-100: #1E2022ff;
  --color-black-200: #1d2022;
  --color-black-300: #191a1b;
  --bg-color: #151515ff;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 1rem 2.4rem rgba(0, 0, 0, 0.12);
  --shadow-img: 0 1rem 1.5rem 5px  rgba(0,0,0,0.15);

  --shadow-item: 0 0.2rem 1rem 2px rgba(0,0,0,0.1);

  --image-grayscale: 0;
  --image-opacity: 100%;
}

&.dark-mode{


--color-black-100: #1E2022ff;
--bg-color:#151515ff;

--backdrop-color: rgba(0, 0, 0, 0.3);
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 1rem 2.4rem rgba(0, 0, 0, 0.4);

--shadow-img: 0 1rem 1.5rem 5px rgba(0,0,0,0.4);

--shadow-item: 0 1rem 2rem rgba(0,0,0,0.1);

--image-grayscale: 10%;
--image-opacity: 90%;
}





  --border-radius-tiny: 3px;
  --border-radius-sm: 8px;
  --border-radius-md: 1.4rem;
  --border-radius-md--2: 1.5rem;
  --border-radius-lg: 9px;


  --color-red-50: #c94744;
  --color-red-100: #C3322Fff;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
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
  font-family: 'Noto Sans Mono', sans-serif;
  color: var(--color-grey-100);
  transition: color 0.3s, background-color 0.4s;
  transition-delay: 0.25s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  font-weight: 400;
  scroll-behavior: smooth;
  overflow-x: hidden;
  background-color: var(--bg-color);
}
input,
a,
button,
textarea,
label,
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
  background-color: var(--color-black-100);
  color: var(--color-grey-650);
  cursor: not-allowed;
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
  hyphens:auto;
}



img {
  max-width: 100%;
  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

${PickerStyles}

`;

export default GlobalStyles;
