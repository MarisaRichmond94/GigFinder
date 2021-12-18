import './index.scss';

import { ReactElement, useState } from 'react';

import GigCheckboxInput from 'components/gig_input/checkbox';
import GigTextAreaInput from 'components/gig_input/text_area';
import GigTextInput from 'components/gig_input/text';
import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import { useReviewForm } from 'providers/review_form';
import StarRating from 'routes/components/star_rating';
import { ReviewFormFieldOptions } from 'types';

const ReviewForm = (): ReactElement => {
  const { city, headline, isCurrentEmployee, rating, summary, title } = useReviewForm();
  const { locationOptions, titleOptions, updateField } = useReviewForm();

  const [localTitle, setLocalTitle] = useState(title || '');
  const [localCity, setLocalCity] = useState(city || '');

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-review-panel'>
      <GigTextInput
        classNames='off-white'
        formValue={headline}
        id='review-form-headline-input'
        placeholder='Headline to highlight the key point of your review'
        setFormValue={
          (updatedHeadline: string) => updateField(ReviewFormFieldOptions.headline, updatedHeadline)
        }
      />
      <div className='review-form-flex-container'>
        <ControlledSearchableGigInput
          classNames='off-white'
          formValue={localTitle}
          id='review-form-title-input'
          options={titleOptions}
          placeholder='What title did you hold at this company?'
          onChange={(updatedLocalTitle: string) => setLocalTitle(updatedLocalTitle)}
          onOptionSelect={
            (selectedTitle: string) => {
              updateField(ReviewFormFieldOptions.title, selectedTitle);
              setLocalTitle(selectedTitle);
            }
          }
        />
        <GigCheckboxInput
          classNames='sub-header-text'
          id='review-form-is-current-employee-input'
          isActive={isCurrentEmployee}
          text='Are you actively employed with this company?'
          toggleIsActive={
            () => updateField(ReviewFormFieldOptions.isCurrentEmployee, !isCurrentEmployee)
          }
        />
      </div>
      <div className='review-form-flex-container'>
        <ControlledSearchableGigInput
          classNames='off-white'
          formValue={localCity}
          id='review-form-city-input'
          options={locationOptions}
          placeholder='Where in California did you work for this company?'
          onChange={(updatedLocalCity: string) => setLocalCity(updatedLocalCity)}
          onOptionSelect={
            (selectedCity: string) => {
              updateField(ReviewFormFieldOptions.city, selectedCity);
              setLocalCity(selectedCity);
            }
          }
        />
        <StarRating
          rating={rating}
          updateRating={
            (updatedRating: number) => updateField(ReviewFormFieldOptions.rating, updatedRating)
          }
        />
      </div>
      <GigTextAreaInput
        classNames='off-white'
        formValue={summary}
        id='review-form-summary-input'
        placeholder='Summary of your opinions about this company'
        setFormValue={
          (updatedSummary: string) => updateField(ReviewFormFieldOptions.summary, updatedSummary)
        }
      />
    </div>
  );
}

export default ReviewForm;
