import { ReactElement } from 'react';

const calculateDurationSincePosted = (createdAt: string): string => {
  const diffInMilliseconds = Date.now() - Date.parse(createdAt);
  let seconds = Math.floor(diffInMilliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(days / 365);

  seconds %= 60;
  months %= 12;
  days %= 30;
  hours %= 24;
  minutes %= 60;

  if (years > 0) return `${years} year(s)`;
  else if (months > 0) return `${months} month(s)`;
  else if (days > 0) return `${days} day(s)`;
  else if (hours > 0) return `${hours} hour(s)`;
  else if (minutes > 0) return `${minutes} minute(s)`;
  return `${seconds} seconds`;
}

const getBenefits = (benefits: string[]): ReactElement => {
  if (benefits.length) {
    return (
      <ul id='benefits-list'>
        {benefits.map(benefit => {
          return (
            <li className='sub-header-text' key={`benefit-${benefit}`}>
              {benefit}
            </li>
          )
        })}
      </ul>
    );
  };

  return <div className='details sub-header-text'>Employer chose not to list any benefits</div>;
};

const getFormattedViews = (views: number): string => {
  const viewsString = views.toString();
  const insertIndex = viewsString.length - 3;
  return `${[viewsString.slice(0, insertIndex), ',', viewsString.slice(insertIndex)].join('')}`;
};

const getRequirements = (requirements: string): ReactElement => {
  return (
    <ul id='requirements-list'>
      {requirements.split('.').map((requirement, index) => {
        if (requirement === '') return undefined;
        return (
          <li className='sub-header-text' key={`requirement-${index}`}>
            {requirement.trim()}
          </li>
        )
      })}
    </ul>
  );
};

const getSalary = (salary: string): string => {
  const [dollars, cents] = salary.split('.');
  const insertIndex = dollars.length - 3;
  return `${[dollars.slice(0, insertIndex), ',', dollars.slice(insertIndex)].join('')}.${cents}`;
};

const populateJobRequirements = (id: string, requirements: string): ReactElement => {
  const bulletpoints = requirements.split('.');
  bulletpoints.pop();

  return (
    <ul className='job-requirements-list'>
      {
        bulletpoints.map(
          (bulletpoint, index) => (
            <li key={`${id}-requirement-${index}`}>
              {bulletpoint.trim()}
            </li>
          )
        )
      }
    </ul>
  );
};

export {
  calculateDurationSincePosted,
  getBenefits,
  getFormattedViews,
  getRequirements,
  getSalary,
  populateJobRequirements,
};
