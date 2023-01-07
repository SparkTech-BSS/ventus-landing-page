import { addDays, format } from "date-fns";

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
      elem[i]?.addEventListener(type, callback);
    }
  } else {
    elem?.addEventListener(type, callback)!;
  }
};

export const removeEventOnElem = function (
  elem: any,
  type: any,
  callback: any
) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i]?.removeEventListener(type, callback);
    }
  } else {
    elem?.removeEventListener(type, callback)!;
  }
};

export function getFirstAndLastLetter(name: string) {
  let arrFullName = name?.split(" ");

  if (!arrFullName) return "";

  let firstLetter = name?.charAt(0)?.toUpperCase();

  let lastLetter = arrFullName[arrFullName?.length - 1]
    ?.charAt(0)
    ?.toUpperCase();

  return `${firstLetter}${lastLetter}`;
}

export function getFirstAndLastName(name: string) {
  let nameSplit = name?.split(" ");

  if (!nameSplit) return "";

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

export function getHourFormatToAPI(value: string): string {
  return value?.split(":")[0];
}

function getMonthTypeOne(index: number): string {
  const month = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return month[index];
}

function getMonthByIndex(index: number): string {
  const month = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "outubro",
    "Dezembro",
  ];
  return month[index];
}

export function getObjectDate(date: string | any) {
  const weeks_days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: convertedToDateObject.getMonth() + 1,
    fullYear: convertedToDateObject.getFullYear(),
  };

  return dateObject;
}

export function getDateFullFormat(date: string | any) {
  const weeks_days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: convertedToDateObject.getMonth() + 1,
    fullYear: convertedToDateObject.getFullYear(),
  };

  return `${dateObject?.week_day} de ${dateObject?.day}-${dateObject?.month}-${dateObject?.fullYear}`;
}

export function getShortDateFormat(date: string) {
  const weeks_days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  if (!date) return "";

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: getMonthTypeOne(convertedToDateObject.getMonth()),
    year: convertedToDateObject.getFullYear(),
  };

  return `${dateObject.week_day}, ${dateObject.month} ${dateObject.day}`;
}

export function getTicketDetailDate(date: string) {
  const weeks_days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  if (!date) return "";

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: getMonthTypeOne(convertedToDateObject.getMonth()),
    year: convertedToDateObject.getFullYear(),
  };

  return `${dateObject?.week_day}, ${dateObject?.month} ${dateObject?.day} - ${dateObject?.year}`;
}

export function getTicketEventDetailDate(date: string): any {
  const weeks_days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  if (!date) return {};

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: getMonthTypeOne(convertedToDateObject.getMonth()),
    year: convertedToDateObject.getFullYear(),
  };

  return dateObject;
}

export function getAllDateObject(date: string) {
  const weeks_days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  // if (!date) return {};

  const convertedToDateObject = new Date(date);

  const dateObject = {
    week_day: weeks_days[convertedToDateObject.getDay()],
    day:
      convertedToDateObject.getDate().toString().length > 1
        ? convertedToDateObject.getDate()
        : `0${convertedToDateObject.getDate()}`,
    month: getMonthTypeOne(convertedToDateObject.getMonth()),
    year: convertedToDateObject.getFullYear(),
  };

  return dateObject;
}

export function getStartDateAndEdnDateForUniqueDate(date: string | Date) {
  const convertedDate = new Date(date);

  return {
    month: getMonthTypeOne(convertedDate.getMonth()),
    day:
      convertedDate.getDate().toString().length > 1
        ? convertedDate.getDate()
        : `0${convertedDate.getDate()}`,
  };
}

export function getStartDateAndEndDate(dates: any) {
  let startIndex = 0,
    endIndex = dates?.length - 1;

  if (!dates?.length) return {};

  const convertedFirstDateObject = new Date(dates[startIndex]);

  const convertedLastDateObject = new Date(dates[endIndex]);

  return {
    startMonth: getMonthTypeOne(convertedFirstDateObject.getMonth()),
    startDay:
      convertedFirstDateObject.getDate().toString().length > 1
        ? convertedFirstDateObject.getDate()
        : `0${convertedFirstDateObject.getDate()}`,
    endMonth: getMonthTypeOne(convertedLastDateObject.getMonth()),
    endDay:
      convertedLastDateObject.getDate().toString().length > 1
        ? convertedLastDateObject.getDate()
        : `0${convertedLastDateObject.getDate()}`,
  };
}

export function accumulateTicketNumber(object: any) {
  return object?.ticketsReservation?.reduce(
    (total: number, currentValue: any) =>
      total + currentValue?.totalTicketReserved,
    0
  );
}

export function getCapitalizeFirstLetter(value: string) {
  if (!value) return "";
  const lower = value.toLocaleLowerCase();
  return value.charAt(0).toUpperCase() + lower.slice(1);
}

export function checkInRegistrationProcessIfValueExist(
  value: string,
  objectProps: any,
  array: Array<any>
) {
  for (let i = 0; i < array?.length; i++) {
    if (array[i]?.[objectProps] === value) return true;
  }
  return false;
}

export const formatFileSize = function (file: any) {
  const bytes = file ? file?.size : 0;
  const sufixes = ["B", "kB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};

export function getProvincesDate(
  ProvinceData: Array<{ id: number; name: string }>
) {
  return ProvinceData.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });
}

export function convertTwoDatesToMilliseconds(
  dateOne: string | Date,
  dateTwo: string | Date
) {
  const dateOneConverted = new Date(dateOne);
  const dateTwoConverted = new Date(dateTwo);

  return {
    dateOne: dateOneConverted.setHours(0, 0, 0, 0),
    dateTwo: dateTwoConverted.setHours(0, 0, 0, 0),
  };
}

// export function isValidPhoto(fileName: string) {
//   let allowed_extensions = new Array("jpg", "png", "svg", "JPG", "PNG");
//   let file_extension = fileName!.split(".")!.pop()!.toLowerCase();

//   for (let i = 0; i <= allowed_extensions.length; i++) {
//     if (allowed_extensions[i] == file_extension) {
//       return true; // valid file extension
//     }
//   }

//   return false;
// }

export function isValidPhoto(fileName: string): boolean {
  let allowed_extensions = new Array("jpg", "png", "svg", "JPG", "PNG");

  for (let iterator in allowed_extensions) {
    if (fileName.includes(iterator)) return true;
  }

  return false;
}

export function getDates(
  startDate: string | Date | any,
  stopDate: string | Date | any
) {
  let dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(new Date(currentDate), 1);
  }

  return dateArray;
}

export function checkIfTArrayIsEqual(
  firstArray: Array<any | string>,
  secondArray: Array<any | string>
): boolean {
  if (firstArray.length !== secondArray.length) return false;

  for (let counter = 0; counter < firstArray.length; counter++) {
    const firstFormattedDate = format(
      new Date(firstArray[counter]),
      "MM/dd/yyyy"
    );

    const lastFormattedDate = format(
      new Date(secondArray[counter]),
      "MM/dd/yyyy"
    );

    if (firstFormattedDate !== lastFormattedDate) return false;
  }

  return true;
}

export function isFileImage(file: File | any) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
}

export function isUndefined(data: any) {
  return typeof data == "undefined";
}

export function checkIfArrayElementsIsNotEmpty(
  arrayToCheck: Array<any | string>
) {
  for (let counter = 0; counter < arrayToCheck.length; counter++) {
    if (isUndefined(arrayToCheck[counter])) return false;

    if (!arrayToCheck[counter].length) return false;
  }

  return true;
}

/**
 * Check if date is equal
 * return: -1 - 0 - 1
 */
export function compareDate(
  firstDateToCompare: string | Date,
  secondDateToCompare: string | Date
) {
  if (new Date(firstDateToCompare) > new Date(secondDateToCompare)) return -1;
  else if (new Date(firstDateToCompare) < new Date(secondDateToCompare))
    return 1;
  return 0;
}

export function getEventVisibilityClassName(status: boolean) {
  return status
    ? { className: "public", value: "Público" }
    : { className: "private", value: "Privado" };
}

type StatusValues = "pending" | "approved" | "refused";

export function getStatusExtendingName(status: StatusValues) {
  const statusObject = {
    pending: "Pendente",
    approved: "Aprovado",
    refused: "Recusado",
  };

  return statusObject[status];
}

export function getStatusClassName(status: string) {
  return status === "pending"
    ? { className: "inactive", value: "Pendente" }
    : status === "approved"
    ? { className: "active", value: "Público" }
    : { className: "refused", value: "Recusado" };
}
