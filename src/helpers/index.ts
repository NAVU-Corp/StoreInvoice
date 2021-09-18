type TypeReadMore = {
  string: string;
  maxLength: number;
};

export const readMore = (props: TypeReadMore): string => {
  const { maxLength, string } = props;

  if (maxLength < string.length) {
    return string.slice(0, maxLength) + "...";
  }
  return string;
};

export const formatDate = (date: any) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const ReplaceSpaceInSpace = (input: string) => {
  if(!input) {
    return "";
  }

  return input.replace(/\u00a0/g, " ");
}