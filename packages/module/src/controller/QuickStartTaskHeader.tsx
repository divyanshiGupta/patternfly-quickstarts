import * as React from 'react';
import { QuickStartContext, QuickStartContextValues } from '../utils/quick-start-context';
import { QuickStartTaskStatus } from '../utils/quick-start-types';
import { Title, WizardNavItem } from '@patternfly/react-core';
import { markdownConvert } from '../ConsoleInternal/components/markdown-view';
import { removeParagraphWrap } from '../QuickStartMarkdownView';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import cx from 'classnames';

import './QuickStartTaskHeader.scss';

type QuickStartTaskHeaderProps = {
  title: string;
  taskIndex: number;
  subtitle?: string;
  taskStatus?: QuickStartTaskStatus;
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  isActiveTask?: boolean;
  onTaskSelect: (index: number) => void;
};

const TaskIcon: React.FC<{ taskIndex: number; taskStatus: QuickStartTaskStatus; }> = ({
  taskIndex,
  taskStatus,
}) => {
  const { getResource } = React.useContext<QuickStartContextValues>(QuickStartContext);
  switch (taskStatus) {
    case QuickStartTaskStatus.SUCCESS:
      return (
        <span className="co-icon-and-text__icon">
          <CheckCircleIcon size="md" className="co-quick-start-task-header__task-icon-success" />
        </span>
      );
    case QuickStartTaskStatus.FAILED:
      return (
        <span className="co-icon-and-text__icon">
          <ExclamationCircleIcon
            size="md"
            className="co-quick-start-task-header__task-icon-failed"
          />
        </span>
      );
    default:
      return (
        <span className="co-icon-and-text__icon co-quick-start-task-header__task-icon-init">
          {getResource('{{taskIndex, number}}', taskIndex).replace('{{taskIndex, number}}', taskIndex)}
        </span>
      );
  }
};

const QuickStartTaskHeader: React.FC<QuickStartTaskHeaderProps> = ({
  title,
  taskIndex,
  subtitle,
  taskStatus,
  size,
  isActiveTask,
  onTaskSelect,
}) => {
  const classNames = cx('co-quick-start-task-header__title', {
    'co-quick-start-task-header__title-success': taskStatus === QuickStartTaskStatus.SUCCESS,
    'co-quick-start-task-header__title-failed': taskStatus === QuickStartTaskStatus.FAILED,
  });

  const content = (
    <span className="co-quick-start-task-header">
      <Title headingLevel="h3" size={size} className={classNames}>
        <TaskIcon taskIndex={taskIndex} taskStatus={taskStatus} />
        <span dangerouslySetInnerHTML={{ __html: removeParagraphWrap(markdownConvert(title)) }} />
        {isActiveTask && subtitle && (
          <>
            {' '}
            <span
              className="co-quick-start-task-header__subtitle text-secondary"
              data-test-id="quick-start-task-subtitle"
            >
              {subtitle}
            </span>
          </>
        )}
      </Title>
    </span>
  );

  return (
    <div className="co-quick-start-task-header">
      <WizardNavItem
        content={content}
        step={taskIndex}
        onNavItemClick={() => onTaskSelect(taskIndex - 1)}
        navItemComponent="button"
      />
    </div>
  );
};

export default QuickStartTaskHeader;
