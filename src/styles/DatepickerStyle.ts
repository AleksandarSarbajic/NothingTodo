import { css } from "styled-components";

export const PickerStyles = css`
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    cursor: pointer;
    background-color: var(--color-grey-100);
    color: var(--bg-color);
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: var(--calendar-color);
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    color: var(--color-grey-100);
    overflow: hidden;
  }

  ul.react-datepicker__time-list::-webkit-scrollbar {
    display: none;
  }
  ul.react-datepicker__time-list {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: var(--color-black-300);
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box,
  .react-datepicker__time,
  .react-datepicker__header--time,
  .react-datepicker__header--time--only,
  ul.react-datepicker__time-list {
    width: 15rem;
  }
  .react-datepicker-time__header {
    font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: var(--color-grey-100);
  }
  .react-datepicker__header--time {
    background-color: var(--calendar-color);
    border-bottom: 1px solid var(--calendar-color);
  }

  .react-datepicker {
    font-size: 1.8rem;
    font-weight: 500;
    font-family: inherit;
    background-color: transparent;
    border-radius: 1rem;
    border: none;
  }
  .react-datepicker__portal .react-datepicker__day {
    color: var(--color-grey-200);
    padding: 0.5rem;
    margin: 1rem 0.5rem;
    width: 3.9rem;
    height: 3.9rem;
    border-radius: 50%;
    @media (max-width: 400px), (max-height: 550px) {
      color: var(--color-grey-200);
      padding: 0.5rem;
      margin: 1rem 0.5rem;
      width: 3.9rem;
      height: 3.9rem;
      border-radius: 50%;
      line-height: 3rem;
    }
  }
  .react-datepicker__day--disabled,
  .react-datepicker__month-text--disabled,
  .react-datepicker__quarter-text--disabled,
  .react-datepicker__year-text--disabled {
    cursor: not-allowed;
    color: var(--calendar-disabled) !important;
    @media (max-width: 400px), (max-height: 550px) {
      cursor: not-allowed;
      color: var(--calendar-disabled) !important;
    }
  }

  .react-datepicker__portal .react-datepicker__month-container {
    width: 40rem;
    min-height: 35rem;
    background-color: var(--calendar-color);
    border-radius: 2rem;
  }

  .react-datepicker__month {
  }

  .react-datepicker__week {
  }

  .react-datepicker__portal .react-datepicker__day-names {
    margin-bottom: 0;
  }
  .react-datepicker__portal .react-datepicker__day-name {
    width: 3.9rem;
    margin: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--color-grey-650);
    font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
  }

  .react-datepicker__portal .react-datepicker__current-month {
    font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
    font-size: 1.8rem;
    color: var(--color-grey-200);
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  .react-datepicker__portal .react-datepicker__header {
    background-color: var(--calendar-color);

    padding: 2rem 0 1rem 0;
    border-top-left-radius: 5rem;
    border-top-right-radius: 5rem;
    border-bottom: none;
  }
  .react-datepicker__navigation--next {
    right: 2.4rem;
  }
  .react-datepicker__navigation--previous {
    left: 2.4rem;
  }
  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    width: 3.9rem;
    height: 3.9rem;
    top: 2rem;
  }
  .react-datepicker__portal .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 50%;
    background-color: var(--color-grey-100);
    color: var(--bg-color);
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: var(--color-grey-100);

    color: var(--bg-color) !important;
  }
  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    background-color: var(--color-grey-100);
    color: var(--bg-color) !important;
  }

  .react-datepicker__day--disabled:hover,
  .react-datepicker__month-text--disabled:hover,
  .react-datepicker__quarter-text--disabled:hover,
  .react-datepicker__year-text--disabled:hover {
    cursor: not-allowed;
    color: var(--color-grey-200) !important;
    color: var(--color-grey-750) !important;
    background-color: transparent !important;
  }
`;
