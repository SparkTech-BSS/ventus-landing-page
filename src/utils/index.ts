export const pageAnimation = {
    hidden: {
      opacity: 0,
      y: 300,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  export const goDown = {
    hidden: {
      y: -300,
      // opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 1
      },
    },
  }

  export const goUp = {
    hidden: {
      y: '100%',
      // opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 3.3
      },
    },
  }
  
  export const titleAnimation = {
    hidden: {
      y: 300,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 2
      },
    },
  };


  export const btnGroupHeroAnimation = {
    hidden: {
      y: 600,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 2
      },
    },
  }

  export const textHeroAnimation = {
    hidden: {
      y: 900,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 2
      },
    },
  }
  
  export const fade = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };
  
  export const photoAnimation = {
    hidden: {
      scale: 1.5,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.75,
      },
    },
  };
  
  export const lineAnimation = {
    hidden: {
      width: "0%",
    },
    show: {
      width: "100%",
      transition: { duration: 1 },
    },
  };
  
  export const slider = {
    hidden: {
      x: "-360%",
      skew: "45deg",
    },
    show: {
      x: "100%",
      skew: "0deg",
      transition: { ease: "easeOut", duration: 1 },
    },
  };
  
  export const sliderContainer = {
    hidden: {
      opacity: 1,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };
  
  export const scrollReveal = {
    hidden: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  export const sliderMovie = {
    hidden: {
      x: "-50%",
      opacity: 0,
      transition: { duration: 0.75 },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.75 },
    },
  };