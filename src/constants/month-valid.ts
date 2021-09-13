export function DetectMonthInGroupMonth(groupMonth: number) {
  let months: any = [];
  if(groupMonth === 10) {
    months = [
      {
        id: 1,
        title: "Tháng 1",
      },
      {
        id: 2,
        title: "Tháng 2",
      },
      {
        id: 3,
        title: "Tháng 3",
      }
    ];
  } else if (groupMonth === 20) {
    months = [
      {
        id: 4,
        title: "Tháng 4",
      },
      {
        id: 5,
        title: "Tháng 5",
      },
      {
        id: 6,
        title: "Tháng 6",
      }
    ];
  } else if(groupMonth === 30) {
    months = [
      {
        id: 7,
        title: "Tháng 7",
      },
      {
        id: 8,
        title: "Tháng 8",
      },
      {
        id: 9,
        title: "Tháng 9",
      }
    ];
  } else if(groupMonth === 40) {
    months = [
      {
        id: 10,
        title: "Tháng 10",
      },
      {
        id: 11,
        title: "Tháng 11",
      },
      {
        id: 12,
        title: "Tháng 12",
      }
    ];
  }

  return [{
    id: 0,
    title: "Tất cả",
  }, ...months ]
}

export function DetectGroupMonthByMonth(month: number) {
  if(month >= 1 && month <= 3) {
    return 10;
  } else if(month >= 4 && month <= 6) {
    return 20;
  } else if(month >= 7 && month <= 9) {
    return 30;
  } else {
    return 40;
  }
}