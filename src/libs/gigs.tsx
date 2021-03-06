import { loremIpsum } from 'lorem-ipsum';
import { ReactElement } from 'react';

import employers from 'mock/employers.json';
import titles from 'mock/titles.json';
import getRandomValueFromList from 'utils/getRandomValueFromList';

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

const generateRandomBackground = () => {
  return {
    passedBackgroundCheck: Math.random() < 0.5 ? true : false,
    hasReleventCredentials: Math.random() < 0.5 ? true : false,
    meetsMinimumRequirements: Math.random() < 0.5 ? true : false,
  }
};

const generateRandomExperience = () => {
  const highlights = loremIpsum({
    count: 3,
    format: 'plain',
    random: Math.random,
    sentenceLowerBound: 3,
    sentenceUpperBound: 5,
    units: 'sentences',
  });

  return {
    title: getRandomValueFromList(titles),
    employer: getRandomValueFromList(employers),
    highlights,
  }
};

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
  if (viewsString.length > 3) {
    const insertIndex = viewsString.length - 3;
    return `${[viewsString.slice(0, insertIndex), ',', viewsString.slice(insertIndex)].join('')}`;
  }
  return viewsString;
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
  generateRandomBackground,
  generateRandomExperience,
  getBenefits,
  getFormattedViews,
  getRequirements,
  getSalary,
  populateJobRequirements,
};
