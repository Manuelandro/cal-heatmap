const dayTemplate = ({ DateHelper }, { domain, verticalOrientation }) => {
  const ROWS_COUNT = 7;
  const domainType = domain.type;
  const { dynamicDimension } = domain;

  return {
    name: 'day',
    level: 30,
    rowsCount() {
      return domainType === 'week' ? 1 : ROWS_COUNT;
    },
    columnsCount(ts) {
      switch (domainType) {
        case 'month':
          return Math.ceil(
            dynamicDimension && !verticalOrientation ?
              DateHelper.getMonthWeekNumber(
                DateHelper.date(ts).endOf('month'),
              ) :
              6, // In rare case, when the first week contains less than 3 days
          );
        case 'year':
          return Math.ceil(
            dynamicDimension ?
              DateHelper.date(ts).endOf('year').dayOfYear() / ROWS_COUNT :
              54,
          );
        case 'week':
        default:
          return ROWS_COUNT;
      }
    },
    mapping: (startTimestamp, endTimestamp, defaultValues) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      DateHelper.intervals(
        'day',
        startTimestamp,
        DateHelper.date(endTimestamp),
      ).map((ts) => {
        const date = DateHelper.date(ts);
        const endWeekNumber = DateHelper.date(ts).endOf('year').week();
        let x = 0;

        switch (domainType) {
          case 'month':
            x = DateHelper.getMonthWeekNumber(ts) - 1;
            break;
          case 'year':
            if (endWeekNumber === 1 && date.week() === endWeekNumber) {
              x = DateHelper.date(ts).subtract(1, 'week').week() + 1;
            }

            x = date.week() - 1;
            break;
          case 'week':
            x = date.weekday();
            break;
          default:
        }

        return {
          t: ts,
          x,
          y: domainType === 'week' ? 0 : date.weekday(),
          ...defaultValues,
        };
      }),
    format: {
      domainLabel: 'Do MMM',
    },
    extractUnit(ts) {
      return DateHelper.date(ts).startOf('day').valueOf();
    },
  };
};

export default dayTemplate;
