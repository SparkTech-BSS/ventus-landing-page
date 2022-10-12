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

export const fadeIn = {
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

export const goDown = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 2,
    },
  },
};

export const goUp = {
  hidden: {
    y: "100%",
    // opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 4,
    },
  },
};

export const titleAnimation = {
  hidden: {
    y: 300,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      // delay: 2
    },
  },
};

export const btnGroupHeroAnimation = {
  hidden: {
    y: 600,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      // delay: 2
    },
  },
};

export const textHeroAnimation = {
  hidden: {
    y: 900,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      // delay: 2
    },
  },
};

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

export const addEventOnElem = function (elem: any, type: any, callback: any) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

export const removeEventOnElem = function (
  elem: any,
  type: any,
  callback: any
) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].removeEventListener(type, callback);
    }
  } else {
    elem.removeEventListener(type, callback);
  }
};

export function getFirstAndLastLetter(name: string) {
  let arrFullName = name.split(" ");

  let firstLetter = name.charAt(0).toUpperCase();

  let lastLetter = arrFullName[arrFullName.length - 1].charAt(0).toUpperCase();

  return `${firstLetter}${lastLetter}`;
}


export function getFirstAndLastName(name: string) {
  let nameSplit = name.split(" ");

  let firstName = nameSplit[0];
  let lastName = nameSplit[nameSplit.length - 1];

  return `${firstName} ${lastName}`;
}

export const MAP_INFO = {
  latitude: -8.913780239768586,
  longitude: 13.230998780986711,
  zoom: 11,
  url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15770.721047526959!2d13.250215239550778!3d-8.816078099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f1808cedc2a1%3A0x29023f5354a9096f!2sCoca%20Cola%20Rangel%2C%20Luanda!5e0!3m2!1spt-PT!2sao!4v1653088117618!5m2!1spt-PT!2sao",
  style: {
    border: 0,
    borderRadius: "0rem",
  },
  width: "100%",
  height: "100%",
};
