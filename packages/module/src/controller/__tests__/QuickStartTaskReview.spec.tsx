import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { Alert } from '@patternfly/react-core';
import { getQuickStartByName } from '../../utils/quick-start-utils';
import { QuickStartTaskStatus } from '../../utils/quick-start-types';
import QuickStartTaskReview from '../QuickStartTaskReview';
import QuickStartMarkdownView from '../../QuickStartMarkdownView';
import { allQuickStarts } from '../../data/quick-start-test-data';

type QuickStartTaskReviewProps = React.ComponentProps<typeof QuickStartTaskReview>;
let wrapper: ShallowWrapper<QuickStartTaskReviewProps>;
const props: QuickStartTaskReviewProps = {
  review: getQuickStartByName('explore-serverless', allQuickStarts).spec.tasks[0].review,
  taskStatus: QuickStartTaskStatus.REVIEW,
  onTaskReview: jest.fn(),
};

describe('QuickStartTaskReview', () => {
  it('should render alert with info variant when task status is review', () => {
    wrapper = shallow(<QuickStartTaskReview {...props} />);
    expect(wrapper.find(Alert).props().variant).toBe('info');
  });

  it('should render alert with success variant when task status is success', () => {
    props.taskStatus = QuickStartTaskStatus.SUCCESS;
    wrapper = shallow(<QuickStartTaskReview {...props} />);
    expect(wrapper.find(Alert).props().variant).toBe('success');
  });

  it('should render alert with danger variant when task status is failed', () => {
    props.taskStatus = QuickStartTaskStatus.FAILED;
    wrapper = shallow(<QuickStartTaskReview {...props} />);
    expect(wrapper.find(Alert).props().variant).toBe('danger');
  });

  it('should render task help in markdown when task status is failed', () => {
    wrapper = shallow(<QuickStartTaskReview {...props} />);
    expect(
      wrapper
        .find(QuickStartMarkdownView)
        .at(1)
        .props().content,
    ).toEqual(props.review.failedTaskHelp);
  });
});
