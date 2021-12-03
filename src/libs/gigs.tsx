import { ReactElement } from 'react';

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
        if (requirement !== '') return undefined;
        return (
          <li className='sub-header-text' key={`requirement-${index}`}>
            {requirement}
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
              {bulletpoint}
            </li>
          )
        )
      }
    </ul>
  );
};

export {
  getBenefits,
  getFormattedViews,
  getRequirements,
  getSalary,
  populateJobRequirements,
};
