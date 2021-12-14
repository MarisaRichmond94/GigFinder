import './index.scss';

import { ReactElement, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { debounce } from 'throttle-debounce';

import GigButton from 'components/gig_button';
import UncontrolledSearchableGigInput from 'components/gig_input/searchable/uncontrolled';
import GigTextAreaInput from 'components/gig_input/text_area';
import { useApplications } from 'providers/applications';
import MoodRating from 'routes/create/components/application_modal/body/feedback_panel/mood_rating';
import StarRating from 'routes/create/components/application_modal/body/feedback_panel/star_rating';
import { Application, Feedback } from 'types';

type FeedbackPanelProps = {
  application: Application,
}

const FeedbackPanel = (props: FeedbackPanelProps): ReactElement => {
  // context providers variables and functions
  const { negativeTraits, positiveTraits, updateApplicationFeedback } = useApplications();
  // destructured prop variables
  let { feedback } = props.application;
  if (!feedback) feedback = {};
  const {
    negativeTraits: selectedNegativeTraits,
    positiveTraits: selectedPositiveTraits,
  } = feedback;
  const { mood, technicalFit, culturalFit, additionalNotes } = feedback;
  // local state variables and functions
  const [localNotes, setLocalNotes] = useState(additionalNotes || '');
  const [updateAdditionalNotes] = useState(
    () => debounce(500, false, (currentFeedback: Feedback, updatedAdditionalNotes: string) => {
      updateApplicationFeedback({ ...currentFeedback, additionalNotes: updatedAdditionalNotes });
    }),
  );
  console.log({technicalFit, culturalFit})

  const updateMood = (updatedMood: number): void => {
    if (updatedMood !== mood) {
      updateApplicationFeedback({ ...feedback, mood: updatedMood });
    }
  }

  const updateTraits = (type: 'positive' | 'negative', trait: string): void => {
    const key = `${type}Traits`;
    const updatedTraitsList = feedback[key]?.find(x => x === trait)
      ? feedback[key].filter(x => x !== trait)
      : [...feedback[key], trait];
    updateApplicationFeedback({ ...feedback, [key]: updatedTraitsList });
  };

  const updateRating = (type: 'cultural' | 'technical', rating: number): void => {
    const key = `${type}Fit`;
    updateApplicationFeedback({ ...feedback, [key]: rating });
  };

  const updateLocalNotes = (updatedLocalNotes: string): void => {
    setLocalNotes(updatedLocalNotes);
    updateAdditionalNotes(feedback, updatedLocalNotes);
  };

  const populateTraits = (type: 'positive' | 'negative'): ReactElement[] => {
    const traits = type === 'positive' ? selectedPositiveTraits : selectedNegativeTraits;
    return traits.map((trait, index) => {
      return (
        <GigButton
          classNames='trait-button'
          id={`${trait}-trait-button`}
          key={`${trait}-trait-button`}
          onClick={() => updateTraits(type, trait)}
          textBlock={
            <div className='trait-item' key={`${trait.replace(' ', '-')}-${index}`}>
              {trait}&nbsp;&nbsp;
              <FaTimes />
            </div>
          }
        />
      )
    });
  };

  return (
    <div id='application-feedback-panel'>
      <div className='application-feedback-flex-container'>
        <div className='bold paragraph-text'>Mood:</div>
        <MoodRating mood={mood} updateMood={updateMood} />
      </div>
      <div className='application-feedback-flex-container' id='positive-traits-input-container'>
        <div className='bold paragraph-text'>Positive Traits:</div>
        <UncontrolledSearchableGigInput
          classNames='paragraph-text off-white'
          id='positive-traits-searchable-dropdown'
          options={positiveTraits}
          placeholder='search positive traits'
          selectedOptions={selectedPositiveTraits}
          onOptionSelect={(option: string) => updateTraits('positive', option)}
        />
      </div>
      <div className='traits-container' id='positive-traits-container'>
        {populateTraits('positive')}
      </div>
      <div className='application-feedback-flex-container' id='negative-traits-input-container'>
        <div className='bold paragraph-text'>Negative Traits:</div>
        <UncontrolledSearchableGigInput
          classNames='paragraph-text off-white'
          id='negative-traits-searchable-dropdown'
          options={negativeTraits}
          placeholder='search negative traits'
          selectedOptions={selectedNegativeTraits}
          onOptionSelect={(option: string) => updateTraits('negative', option)}
        />
      </div>
      <div className='traits-container' id='negative-traits-container'>
        {populateTraits('negative')}
      </div>
      <div className='application-feedback-flex-container'>
        <div className='bold paragraph-text'>Technical Fit:</div>
        <StarRating rating={technicalFit} type='technical' updateRating={updateRating} />
      </div>
      <div className='application-feedback-flex-container'>
        <div className='bold paragraph-text'>Cultural Fit:</div>
        <StarRating rating={culturalFit} type='cultural' updateRating={updateRating} />
      </div>
      <div className='application-feedback-container'>
        <div className='bold paragraph-text'>Additional Notes:</div>
        <GigTextAreaInput
          classNames='paragraph-text off-white'
          formValue={localNotes}
          id='additional-notes-text-area'
          placeholder='Anything else notable about the candidate you want to remember'
          setFormValue={updateLocalNotes}
        />
      </div>
    </div>
  );
};

export default FeedbackPanel;
