import React from "react";

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => {
  return (
    <button
      {...props}
      className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentSlide === 0}
      disabled={currentSlide === 0}
      type="button"
    />
  )
};

export const SlickArrowRight = ({ mobileCount, currentSlide, slideCount, ...props }: any) => {
  let num = mobileCount || 4;
  if (slideCount === 2) num = 1;
  return (
    <button
      {...props}
      className={'slick-next slick-arrow' + (currentSlide === slideCount - num ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - num ? true : false}
      disabled={currentSlide === slideCount - num ? true : false}
      type="button"
    />
  );
};

export const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  swipe: false,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  touchMove: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 690,
      settings: {
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight mobileCount={1} />,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        initialSlide: 0,
        dots: false,
        currentSlide: 0,
      },
    },
  ],
};

export const settingsWithOneElement = {
  arrows: true,
  dots: false,
  infinite: true,
  swipe: false,
  fade: true,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  touchMove: false
};
