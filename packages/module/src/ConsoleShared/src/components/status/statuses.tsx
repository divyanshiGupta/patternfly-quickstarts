import * as React from 'react';
import {
  BlueInfoCircleIcon,
  GreenCheckCircleIcon,
  RedExclamationCircleIcon,
  YellowExclamationTriangleIcon,
} from './icons';
import { HourglassHalfIcon, InProgressIcon } from '@patternfly/react-icons';
import { StatusComponentProps } from './types';
import GenericStatus from './GenericStatus';

export const ErrorStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={RedExclamationCircleIcon} title={props.title || 'Error'} />
);
ErrorStatus.displayName = 'ErrorStatus';

export const InfoStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={BlueInfoCircleIcon} title={props.title || 'Information'} />
);
InfoStatus.displayName = 'InfoStatus';

export const PendingStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={HourglassHalfIcon} title={props.title || 'Pending'} />
);
PendingStatus.displayName = 'PendingStatus';

export const ProgressStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={InProgressIcon} title={props.title || 'In progress'} />
);
ProgressStatus.displayName = 'ProgressStatus';

export const SuccessStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={GreenCheckCircleIcon} title={props.title || 'Healthy'} />
);
SuccessStatus.displayName = 'SuccessStatus';

export const WarningStatus: React.FC<StatusComponentProps> = (props) => (
  <GenericStatus {...props} Icon={YellowExclamationTriangleIcon} title={props.title || 'Warning'} />
);
WarningStatus.displayName = 'WarningStatus';
